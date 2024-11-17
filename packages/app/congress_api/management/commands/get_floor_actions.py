from datetime import date

from django.core.management.base import BaseCommand

from congress_api.floor.house import get_house_actions
from congress_api.floor.house import parse_house_actions

class Command(BaseCommand):
    help = "Get recent floor actions"

    def handle(self, *args, **options):
        data = get_house_actions(date(2024, 11, 15))
        actions = parse_house_actions(data)
        print(f"Found {len(actions)} actions")
