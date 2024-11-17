from datetime import date
from datetime import datetime as dt
import json
from os import getenv
from os import path
from os import makedirs

from django.apps import apps
from django.core.management.base import BaseCommand
from django.core.management.base import CommandParser
from dotenv import load_dotenv

from congress_api.api.client import ApiClient
from congress_api.api.bill import get_bill
from congress_api.api.bill import get_bills
from congress_api.floor.house import get_house_actions

def get_client() -> ApiClient:
    load_dotenv()
    api_key = str(getenv("DATA_GOV_API_KEY"))
    return ApiClient(api_key=api_key)

def save_file(data, fixture, filename, force=False):
    app_config = apps.get_app_config('congress_api')
    app_path = app_config.path

    if fixture == 'api':
        # check if directory exists
        if not path.exists(f"{app_path}/fixtures/api"):
            makedirs(f"{app_path}/fixtures/api")
        with open(f"{app_path}/fixtures/api/{filename}.json", "w") as f:
            f.write(json.dumps(data, indent=2))
        print(f"Saved fixture to fixtures/api/{filename}.json")

    elif fixture == 'house_floor':
        if not path.exists(f"{app_path}/fixtures/house_floor"):
            makedirs(f"{app_path}/fixtures/house_floor")
        with open(f"{app_path}/fixtures/house_floor/{filename}.xml", "w") as f:
            f.write(data)
        print(f"Saved fixture to fixtures/house_floor/{filename}.xml")

def get_api_fixture(**options):
    client = get_client()
    
    if options['type'] is not None and options['number'] is not None:
        print(f"Getting bill {options['type']} {options['number']}")
        endpoint = f"bill/{options['congress']}/{options['type']}/{options['number']}"
        data, status = client.get(endpoint)
        save_file(data, 'api', f"{options['resource']}_{options['congress']}_{options['type']}_{options['number']}")
    else:
        print("Getting bills")
        data, status = client.get(f"{options['resource']}/{options['congress']}")
        save_file(data, 'api', f"{options['resource']}_{options['congress']}")

def get_house_floor_fixture(**options):
    parsed_date = dt.strptime(options['date'], "%Y-%m-%d").date()
    data = get_house_actions(parsed_date)
    save_file(data, 'house_floor', f"house_floor_{parsed_date.strftime('%Y_%m_%d')}")


class Command(BaseCommand):
    help = "Get recent floor actions"

    def add_arguments(self, parser: CommandParser) -> None:
        parser.add_argument('fixture', type=str, choices=['api', 'house_floor'], help="The type of fixture to get. Can be 'api' or 'house_floor'")
        parser.add_argument('--resource', type=str, help="The resource to fetch from the API")
        parser.add_argument('--congress', type=int, help="The Congress number")
        parser.add_argument('--type', type=str, help="The bill type")
        parser.add_argument('--number', type=str, help="The bill number")
        parser.add_argument('--date', type=str, help="The date in YYYY-MM-DD format")

    def handle(self, *args, **options):
        """
        Download fixture data for different responses we capture.

        Args:
            fixture: 

        If called with the 'api' fixture, additional params should be passed
        for the request, e.g.: `python manage.py get_fixture api --resource=bill --congress=118 --type=hr --number=1`

        This will fetch /v3/bill/118/hr/1 from the API and save the response to a file named 'bill_118_hr_1.json'.
        """

        fixture = options.get('fixture')

        if fixture == 'api':
            get_api_fixture(**options)
        elif fixture == 'house_floor':
            get_house_floor_fixture(**options)
