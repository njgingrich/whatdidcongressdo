from django.db import models

from conf.models import TimeStampedModel

class ApiResultModel(TimeStampedModel):
    url = models.URLField()

    class Meta:
        abstract = True

class Bill(ApiResultModel):
    congress = models.IntegerField()
    origin_chamber = models.CharField(max_length=10)
    number = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    # The updated_date for the *bill* - not when WE updated it
    update_date = models.DateTimeField()
    introduced_date = models.DateField()
    latest_action_date = models.DateField()
    title = models.TextField()

    # These fields come from the detail URL object, not the bill object returned from the list API
    policy_area = models.CharField(max_length=255, blank=True)

    # Store the full API response for the bill
    data = models.JSONField()

    def __str__(self):
        return f"{self.type} {self.number}"

class BillAction(ApiResultModel):
    bill = models.ForeignKey(Bill, on_delete=models.CASCADE, related_name='actions')
    action_code = models.CharField(max_length=255, blank=True)
    action_date = models.DateField()
    action_time = models.TimeField(null=True, blank=True)
    source_system = models.CharField(max_length=255)
    source_system_code = models.IntegerField(null=True, blank=True)
    text = models.TextField()
    type = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.bill} - {self.type} ({self.action_date})"

class BillAmendment(ApiResultModel):
    bill = models.ForeignKey(Bill, on_delete=models.CASCADE, related_name='amendments')
    congress = models.IntegerField()
    number = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    update_date = models.DateTimeField()

class BillActionCommittee(ApiResultModel):
    bill_action = models.ForeignKey(BillAction, on_delete=models.CASCADE, related_name='committees')
    name = models.CharField(max_length=255)
    system_code = models.CharField(max_length=255)

class BillCommittee(ApiResultModel):
    bill = models.ForeignKey(Bill, on_delete=models.CASCADE, related_name='committees')
    system_code = models.CharField(max_length=255)

class BillCosponsor(ApiResultModel):
    bill = models.ForeignKey(Bill, on_delete=models.CASCADE, related_name='cosponsors')
    bioguide_id = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    full_name = models.CharField(max_length=255)
    party = models.CharField(max_length=2)
    state = models.CharField(max_length=2)
    district = models.CharField(max_length=2, blank=True)
    is_original_cosponsor = models.BooleanField()
    sponsorship_date = models.DateField()

class BillSubject(ApiResultModel):
    bill = models.ForeignKey(Bill, on_delete=models.CASCADE, related_name='subjects')
    name = models.TextField()
    update_date = models.DateTimeField()

class BillSummary(ApiResultModel):
    bill = models.ForeignKey(Bill, on_delete=models.CASCADE, related_name='summaries')
    action_date = models.DateField()
    description = models.TextField(blank=True)
    text = models.TextField()
    update_date = models.DateTimeField()
    version_code = models.CharField(max_length=10)

class BillRelatedBill(ApiResultModel):
    bill = models.ForeignKey(Bill, on_delete=models.CASCADE, related_name='related_bills')
    congress = models.IntegerField()
    number = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    title = models.TextField()

class BillTextVersion(ApiResultModel):
    bill = models.ForeignKey(Bill, on_delete=models.CASCADE, related_name='text_versions')
    type = models.CharField(max_length=255)
    version_datetime = models.DateTimeField(blank=True, null=True)
    text_url = models.URLField(blank=True)
    pdf_url = models.URLField(blank=True)
    xml_url = models.URLField(blank=True)

class BillTitle(ApiResultModel):
    bill = models.ForeignKey(Bill, on_delete=models.CASCADE, related_name='titles')
    title = models.TextField()
    text_version_code = models.CharField(max_length=255)
    text_version_name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    type_code = models.IntegerField()
    update_date = models.DateTimeField()

class HouseFloorAction(TimeStampedModel):
    update_datetime = models.DateTimeField()
    action_id = models.CharField(max_length=255)
    unique_id = models.CharField(max_length=255)
    timestamp = models.DateTimeField()
    action_item = models.CharField(max_length=255, blank=True)
    bill_ids = models.TextField() # CSV of bill IDs parsed from text
    description = models.TextField()

    def __str__(self):
        return f"{self.unique_id} - {self.timestamp}"
