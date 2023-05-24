from django.core.management import call_command
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = "This command create superuser and some users from fixture."

    def handle(self, *args, **options):
        call_command("loaddata", "001_users.json")