from datetime import date
from datetime import datetime as dt
from datetime import timezone
from typing import Optional

from .client import ApiClient
from .constants import CONGRESS

def get_bills(client, **kwargs):
    """
    Retrieve bills from the Congress API.

    Args:
        client (ApiClient): The API client used to make requests.

    Returns:
        Response: The response object from the API call containing the bills data.
    """
    endpoint = f"bill/{CONGRESS}"
    return client.get(endpoint, **kwargs)

def get_bills_from_date(client: ApiClient, date: date):
    """
    Retrieve bills from the Congress API from a specific date.

    Args:
        client (ApiClient): The API client used to make requests.
        date (date): The date to retrieve bills from.

    Returns:
        Response: The response object from the API call containing the bills data.
    """
    datetime = dt.combine(date, dt.min.time(), tzinfo=timezone.utc)

    params = {
        "fromDateTime": datetime.strftime("%Y-%m-%dT%H:%M:%SZ"),
        "sort": "updateDate+desc",
        "offset": 0,
        "limit": 50,
    }

    bills = []
    while True:
        data, code = get_bills(client, params=params)
        bills.extend(data['bills'])

        if len(data['bills']) < params['limit']:
            break

        for bill in data['bills']:
            update_date = datetime.strptime(bill['updateDate'], "%Y-%m-%d").date()

            if update_date < date:
                return bills

        params['offset'] += params['limit']
    return bills


def get_bill(client: ApiClient, congress: int, type: str, number: str):
    """
    Retrieve a bill from the Congress API.

    Args:
        client (ApiClient): The API client used to make requests.
        congress (int): The Congress number.
        type (str): The bill type.
        number (str): The bill number.

    Returns:
        Response: The response object from the API call containing the bill data.
    """
    endpoint = f"bill/{congress}/{type}/{number}"
    data, status = client.get(endpoint)
    return data['bill']

def _get_bill_field(client: ApiClient, congress: int, type: str, number: str, field: str, resultField: Optional[str] = None):
    """
    Retrieve a bill's <field> data from the Congress API.

    Args:
        client (ApiClient): The API client used to make requests.
        congress (int): The Congress number.
        type (str): The bill type.
        number (str): The bill number.
        field (str): The field to retrieve

    Returns:
        Response: The response object from the API call containing the bill field data.
    """
    endpoint = f"bill/{congress}/{type}/{number}/{field}"
    data, status = client.get(endpoint)
    return data[resultField or field]

def get_bill_actions(client: ApiClient, congress: int, type: str, number: str):
    return _get_bill_field(client, congress, type, number, "actions")

def get_bill_amendments(client: ApiClient, congress: int, type: str, number: str):
    return _get_bill_field(client, congress, type, number, "amendments")

def get_bill_committees(client: ApiClient, congress: int, type: str, number: str):
    return _get_bill_field(client, congress, type, number, "committees")

def get_bill_cosponsors(client: ApiClient, congress: int, type: str, number: str):
    return _get_bill_field(client, congress, type, number, "cosponsors")

def get_bill_subjects(client: ApiClient, congress: int, type: str, number: str):
    return _get_bill_field(client, congress, type, number, "subjects")

def get_bill_summaries(client: ApiClient, congress: int, type: str, number: str):
    return _get_bill_field(client, congress, type, number, "summaries")

def get_bill_related_bills(client: ApiClient, congress: int, type: str, number: str):
    return _get_bill_field(client, congress, type, number, "relatedBills")

def get_bill_text_versions(client: ApiClient, congress: int, type: str, number: str):
    return _get_bill_field(client, congress, type, number, "text", "textVersions")

def get_bill_titles(client: ApiClient, congress: int, type: str, number: str):
    return _get_bill_field(client, congress, type, number, "titles")
