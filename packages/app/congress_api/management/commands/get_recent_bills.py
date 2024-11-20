from datetime import date
from datetime import datetime as dt
from datetime import timezone as tz
from os import getenv

from django.apps import apps
from django.core.management.base import BaseCommand
from django.core.management.base import CommandError
from dotenv import load_dotenv

from congress_api.api.bill import get_bill
from congress_api.api.bill import get_bills_from_date
from congress_api.api.client import ApiClient
from congress_api.models import Bill
from congress_api.util import localize_datetime

from congress_api.mappers import FIELD_BUILDER_MAP

def get_client() -> ApiClient:
    load_dotenv()
    api_key = str(getenv("DATA_GOV_API_KEY"))
    return ApiClient(api_key=api_key)


def create_bill(client: ApiClient, congress: int, type: str, number: str, url: str):
    # First, get the bill detail from the API
    bill_data = get_bill(client, congress, type, number)

    # create a Bill object with the data
    policy_area = bill_data.get('policyArea', {}).get('name', '')

    bill = Bill.objects.create(
        congress=bill_data['congress'],
        origin_chamber=bill_data['originChamber'],
        number=bill_data['number'],
        type=bill_data['type'],
        update_date=bill_data['updateDate'],
        introduced_date=bill_data['introducedDate'],
        latest_action_date=bill_data['latestAction']['actionDate'],
        title=bill_data['title'],
        policy_area=policy_area,
        data=bill_data,
        url=url,
    )

    # Then for each of the following fields, get the additional data and create objects out of it
    for field, builder in FIELD_BUILDER_MAP.items():
        if bill_data.get(field) is not None:
            built = builder(client, bill, bill_data)
            print(f"Created {len(built)} {field} for bill {bill.type} {bill.number}")
        else:
            print(f"No {field} for bill {bill.type} {bill.number}")

    return bill

def update_bill(client: ApiClient, bill: Bill):
    bill_data = get_bill(client, bill.congress, bill.type, bill.number)
    update_timestamp = dt.strptime(bill_data['updateDate'], "%Y-%m-%dT%H:%M:%SZ").astimezone(tz.utc)

    if update_timestamp > bill.update_date:
        print(f"Updating bill {bill.type} {bill.number} ({update_timestamp} > {bill.update_date})")
        bill.update_date = bill_data['updateDate']
        bill.introduced_date = bill_data['introducedDate']
        bill.latest_action_date = bill_data['latestAction']['actionDate']
        bill.title = bill_data['title']
        bill.data = bill_data
        bill.save()

        for field, builder in FIELD_BUILDER_MAP.items():
            actions = builder(client, bill, bill_data)
            print(f"Got {len(actions)} {field} for bill {bill.type} {bill.number}")

class Command(BaseCommand):
    help = "Get recent bills from the Congress API"

    def add_arguments(self, parser):
        parser.add_argument(
            '--date',
            type=str,
            help="The date to get bills from - YYYY-MM-DD",
        )

    def handle(self, *args, **options):
        client = get_client()
        from_date = dt.strptime(options.get('date'), '%Y-%m-%d').date() if options.get('date') else date.today()
        bills = get_bills_from_date(client, date=from_date)
        
        for bill_data in bills:
            try:
                bill = Bill.objects.get(
                    congress=bill_data['congress'],
                    number=bill_data['number'],
                    type=bill_data['type'],
                ) # todo: can we get by URL?

                print(f"Bill {bill.type} {bill.number} already exists")
                update_bill(client, bill)
                bill.save()

            except Bill.DoesNotExist:
                bill = create_bill(client, bill_data['congress'], bill_data['type'], bill_data['number'], bill_data['url'])
                print(f"Stored bill {bill.type} {bill.number}")

