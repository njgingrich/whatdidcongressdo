# Generated by Django 5.1.3 on 2024-11-16 21:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('congress_api', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='BillTitles',
            new_name='BillTitle',
        ),
        migrations.AlterField(
            model_name='billcosponsor',
            name='district',
            field=models.CharField(blank=True, max_length=2),
        ),
        migrations.AlterField(
            model_name='billsummary',
            name='description',
            field=models.TextField(blank=True),
        ),
    ]
