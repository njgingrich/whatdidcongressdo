from datetime import date
from datetime import datetime as dt
from datetime import timezone
import pytz
import requests
import xml.etree.ElementTree as ET
from pprint import pprint

from congress_api.models import HouseFloorAction

def get_house_actions(date: date):
    url = f"https://clerk.house.gov/floor/{date.strftime('%Y%m%d')}.xml"
    r = requests.get(url)
    return r.text

def get_bill_ids(description: ET.Element) -> str:
    """
    Extract bill IDs found in an action description string.

    Returns:
        str: A comma-separated list of bill IDs.
    """
    links = description.findall('a')
    return [l.text for l in links]

def extract_text(element: ET.Element) -> str:
    """Recursively extracts all text from an XML element and its children.

    Args:
        element: The XML element to extract text from.

    Returns:
        A string containing all extracted text.
    """

    text = ""
    for child in element:
        text += extract_text(child)
    text += element.tail or ""
    if element.text is not None:
        text = element.text + text

    return text.replace('\n', '')

def parse_house_actions(data) -> HouseFloorAction:
    root = ET.fromstring(data)
    actions_xml = root.find('floor_actions').findall('floor_action')
    actions = []
    tz = pytz.timezone('America/New_York')

    for action in actions_xml:
        unique_id = action.attrib.get('unique-id')
        timestamp_str = action.find('action_time').attrib.get('for-search')
        timestamp = tz.localize(dt.strptime(timestamp_str, "%Y%m%dT%H:%M:%S"))
        update_timestamp = action.attrib.get('update-date-time')
        update_datetime = tz.localize(dt.strptime(update_timestamp, "%Y%m%dT%H:%M"))
        description = extract_text(action.find('action_description'))
        action_id = action.attrib.get('act-id')
        action_item = ''

        if action.find('action_item') is not None:
            action_item = action.find('action_item').text

        try:
            a = HouseFloorAction.objects.get(unique_id=unique_id)
            if (update_datetime > a.update_datetime):
                print(f"Updating existing action {action_id}")
                a.update_datetime = update_datetime
                a.action_id = action_id
                a.timestamp = timestamp
                a.action_item = action_item
                a.bill_ids = get_bill_ids(action.find('action_description'))
                a.description = description
                a.save()

        except HouseFloorAction.DoesNotExist:
            print(f"Creating new action for id {action_id}")
            a = HouseFloorAction.objects.create(
                update_datetime=update_datetime,
                action_id= action_id,
                unique_id=unique_id,
                timestamp=timestamp,
                action_item=action_item,
                bill_ids=get_bill_ids(action.find('action_description')),
                description=description
            )
            pprint(vars(a))
        actions.append(a)

    return actions

