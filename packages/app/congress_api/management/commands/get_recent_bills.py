from datetime import date
from os import getenv

from django.apps import apps
from django.core.management.base import BaseCommand
from django.core.management.base import CommandError
from dotenv import load_dotenv

from congress_api.api.bill import get_bill
from congress_api.api.bill import get_bills_from_date
from congress_api.api.client import ApiClient
from congress_api.models import Bill

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
        actions = builder(client, bill)
        print(f"Created {len(actions)} {field} for bill {bill.type} {bill.number}")

    return bill
    
# def update_bill(bill: Bill, bill_data: dict):
#     pass

class Command(BaseCommand):
    help = "Get recent bills from the Congress API"

    def handle(self, *args, **options):
        client = get_client()
        bills = get_bills_from_date(client, date=date(2024, 11, 16))
        
        for bill_data in bills:
            try:
                bill = Bill.objects.get(
                    congress=bill_data['congress'],
                    number=bill_data['number'],
                    type=bill_data['type'],
                ) # todo: can we get by URL?

                print(f"Bill {bill.type} {bill.number} already exists")
                # update_bill(bill, bill_data)
                bill.save()

            except Bill.DoesNotExist:
                bill = create_bill(client, bill_data['congress'], bill_data['type'], bill_data['number'], bill_data['url'])
                print(f"Stored bill {bill.type} {bill.number}")

