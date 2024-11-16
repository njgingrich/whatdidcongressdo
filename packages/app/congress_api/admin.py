from django.contrib import admin

from .models import Bill
from .models import BillAction
from .models import BillAmendment
from .models import BillCommittee
from .models import BillCosponsor
from .models import BillSubject
from .models import BillSummary
from .models import BillRelatedBill
from .models import BillTextVersion
from .models import BillTitle

# Register your models here.
admin.site.register(Bill)
admin.site.register(BillAction)
admin.site.register(BillAmendment)
admin.site.register(BillCommittee)
admin.site.register(BillCosponsor)
admin.site.register(BillSubject)
admin.site.register(BillSummary)
admin.site.register(BillRelatedBill)
admin.site.register(BillTextVersion)
admin.site.register(BillTitle)
