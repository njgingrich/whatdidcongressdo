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
    
    def sponsor(self):
        if self.sponsors.count() == 0:
            return None
        return self.sponsors.first()
    
    @property
    def subtitle(self):
        return f"{self.type} {self.number}"
    
    @property
    def time(self):
        return f"Introduced {self.introduced_date.strftime("%B %d, %Y")} - Updated {self.update_date.strftime("%B %d, %Y")}"
    
    @property
    def last_action(self):
        return self.actions.last().text
    
    @property
    def cosponsors_description(self):
        if self.cosponsors.count() == 0:
            return "No cosponsors"
        elif self.cosponsors.count() == 1:
            return "1 cosponsor"
        else:
            return f"{self.cosponsors.count()} cosponsors"

    @property
    def congress_url(self):
        return f"https://www.congress.gov/bill/{self.congress}th-congress/{self.origin_chamber}-bill/{self.number}"

    @property
    def govtrack_url(self):
        return f"https://www.govtrack.us/congress/bills/{self.congress}/{self.type.lower()}{self.number}"


class BillAction(ApiResultModel):
    bill = models.ForeignKey(Bill, on_delete=models.CASCADE, related_name='actions')
    action_code = models.CharField(max_length=255, blank=True)
    action_date = models.DateField()
    action_time = models.TimeField(null=True, blank=True)
    source_system = models.CharField(max_length=255)
    source_system_code = models.IntegerField(null=True, blank=True)
    text = models.TextField()
    type = models.CharField(max_length=255)
    committee = models.CharField(max_length=255, blank=True) # committee system code

    def __str__(self):
        return f"{self.bill} - {self.type} ({self.action_date})"

class BillAmendment(ApiResultModel):
    bill = models.ForeignKey(Bill, on_delete=models.CASCADE, related_name='amendments')
    congress = models.IntegerField()
    number = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    update_date = models.DateTimeField()

class BillCommittee(ApiResultModel):
    bill = models.ForeignKey(Bill, on_delete=models.CASCADE, related_name='committees')
    system_code = models.CharField(max_length=255)
    chamber = models.CharField(max_length=255)
    name = models.TextField()
    type = models.CharField(max_length=255)

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

    @property
    def avatar_url(self):
        return f"https://www.congress.gov/img/member/{self.bioguide_id.lower()}_200.jpg"

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

class BillSponsor(TimeStampedModel):
    bill = models.ForeignKey(Bill, on_delete=models.CASCADE, related_name='sponsors')
    bioguide_id = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    middle_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255)
    full_name = models.CharField(max_length=255)
    party = models.CharField(max_length=2)
    state = models.CharField(max_length=2)
    district = models.CharField(max_length=2, blank=True)
    is_by_request = models.BooleanField()

    @property
    def avatar_url(self):
        return f"https://www.congress.gov/img/member/{self.bioguide_id.lower()}_200.jpg"
    
    @property
    def name(self):
       return f"{self.first_name} {self.last_name}"
    
    def title(self):
        position = "Sen."
        if "rep" in self.full_name.lower():
            position = "Rep."
        
        return f"{position} {self.name} ({self.party}-{self.state})"

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
