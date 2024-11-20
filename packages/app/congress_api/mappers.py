from .api.bill import get_bill_actions
from .api.bill import get_bill_amendments
from .api.bill import get_bill_committees
from .api.bill import get_bill_cosponsors
from .api.bill import get_bill_subjects
from .api.bill import get_bill_summaries
from .api.bill import get_bill_related_bills
from .api.bill import get_bill_text_versions
from .api.bill import get_bill_titles
from .api.client import ApiClient
from .models import Bill
from .util import get_nested

def build_bill_actions(client: ApiClient, bill: Bill, bill_data: dict):
    action_data = get_bill_actions(client, bill.congress, bill.type, bill.number)
    actions = [_build_bill_action(action, bill) for action in action_data]
    return actions

def _build_bill_action(action: dict, bill: Bill):
    from congress_api.models import BillAction

    return BillAction.objects.get_or_create(
        bill=bill,
        action_code=action.get("actionCode", ''),
        action_date=action["actionDate"],
        action_time=action.get("actionTime", None),
        source_system=get_nested(action, "sourceSystem.name"),
        source_system_code=get_nested(action, "sourceSystem.code"),
        text=action["text"],
        type=action["type"],
        committee=action.get("committees", [])[0].get("systemCode", '') if action.get("committees") else '',
    )

def build_bill_amendments(client: ApiClient, bill: Bill, bill_data: dict):
    from congress_api.models import BillAmendment

    amendment_data = get_bill_amendments(client, bill.congress, bill.type, bill.number)
    amendments = []
    for amendment in amendment_data:
        a = BillAmendment.objects.get_or_create(
            bill=bill,
            congress=amendment['congress'],
            number=amendment['number'],
            type=amendment['type'],
            update_date=amendment['updateDate'],
        )
        amendments.append(a)

    return amendments

def build_bill_committees(client: ApiClient, bill: Bill, bill_data: dict):
    from congress_api.models import BillCommittee

    committee_data = get_bill_committees(client, bill.congress, bill.type, bill.number)
    committees = []
    for committee in committee_data:
        c = BillCommittee.objects.get_or_create(
            bill=bill,
            system_code=committee['systemCode'],
            chamber=committee['chamber'],
            name=committee['name'],
            type=committee['type'],
        )
        committees.append(c)

    return committees

def build_bill_cosponsors(client: ApiClient, bill: Bill, bill_data: dict):
    from congress_api.models import BillCosponsor

    cosponsor_data = get_bill_cosponsors(client, bill.congress, bill.type, bill.number)
    cosponsors = []
    for cosponsor in cosponsor_data:
        c = BillCosponsor.objects.get_or_create(
            bill=bill,
            bioguide_id=cosponsor['bioguideId'],
            first_name=cosponsor['firstName'],
            last_name=cosponsor['lastName'],
            full_name=cosponsor['fullName'],
            party=cosponsor['party'],
            state=cosponsor['state'],
            district=cosponsor.get('district', ''),
            is_original_cosponsor=cosponsor['isOriginalCosponsor'],
            sponsorship_date=cosponsor['sponsorshipDate'],
        )
        cosponsors.append(c)

    return cosponsors

def build_bill_sponsors(client: ApiClient, bill: Bill, bill_data: dict):
    from congress_api.models import BillSponsor

    sponsors = []
    for sponsor in bill_data['sponsors']:
        s = BillSponsor.objects.get_or_create(
            bill=bill,
            bioguide_id=sponsor['bioguideId'],
            first_name=sponsor['firstName'],
            middle_name=sponsor.get('middleName', ''),
            last_name=sponsor['lastName'],
            full_name=sponsor['fullName'],
            party=sponsor['party'],
            state=sponsor['state'],
            district=sponsor.get('district', ''),
            is_by_request=(False if sponsor['isByRequest'] == 'N' else True),
        )
        sponsors.append(s)

    return sponsors

def build_bill_subjects(client: ApiClient, bill: Bill, bill_data: dict):
    from congress_api.models import BillSubject

    subject_data = get_bill_subjects(client, bill.congress, bill.type, bill.number)
    subjects = []
    for subject in subject_data['legislativeSubjects']:
        s = BillSubject.objects.get_or_create(
            bill=bill,
            name=subject['name'],
            update_date=subject['updateDate'],
        )
        subjects.append(s)

    return subjects

def build_bill_summaries(client: ApiClient, bill: Bill, bill_data: dict):
    from congress_api.models import BillSummary

    summary_data = get_bill_summaries(client, bill.congress, bill.type, bill.number)
    summaries = []
    for summary in summary_data:
        s = BillSummary.objects.get_or_create(
            bill=bill,
            action_date=summary['actionDate'],
            description=summary.get('description', ''),
            text=summary['text'],
            update_date=summary['updateDate'],
            version_code=summary['versionCode'],
        )
        summaries.append(s)

    return summaries

def build_bill_related_bills(client: ApiClient, bill: Bill, bill_data: dict):
    from congress_api.models import BillRelatedBill

    related_bill_data = get_bill_related_bills(client, bill.congress, bill.type, bill.number)
    related_bills = []
    for related_bill in related_bill_data:
        r = BillRelatedBill.objects.get_or_create(
            bill=bill,
            congress=related_bill['congress'],
            number=related_bill['number'],
            type=related_bill['type'],
            title=related_bill['title'],
        )
        related_bills.append(r)

    return related_bills

def build_bill_text_versions(client: ApiClient, bill: Bill, bill_data: dict):
    from congress_api.models import BillTextVersion

    text_version_data = get_bill_text_versions(client, bill.congress, bill.type, bill.number)
    text_versions = []
    for text_version in text_version_data:
        formats = text_version.get('formats', {})
        text_url = next((item for item in formats if item['url'].endswith('.htm')), None)
        pdf_url = next((item for item in formats if item['url'].endswith('.pdf')), None)
        xml_url = next((item for item in formats if item['url'].endswith('.xml')), None)

        t = BillTextVersion.objects.get_or_create(
            bill=bill,
            type=text_version['type'],
            version_datetime=text_version['date'],
            text_url=text_url,
            pdf_url=pdf_url,
            xml_url=xml_url,
        )
        text_versions.append(t)

    return text_versions

def build_bill_titles(client: ApiClient, bill: Bill, bill_data: dict):
    from congress_api.models import BillTitle

    title_data = get_bill_titles(client, bill.congress, bill.type, bill.number)
    titles = []
    for title in title_data:
        t = BillTitle.objects.get_or_create(
            bill=bill,
            title=title['title'],
            text_version_code=title.get('billTextVersionCode', ''),
            text_version_name=title.get('billTextVersionName', ''),
            type=title['titleType'],
            type_code=title['titleTypeCode'],
            update_date=title['updateDate'],
        )
        titles.append(t)

    return titles

FIELD_BUILDER_MAP = {
    "actions": build_bill_actions,
    "amendments": build_bill_amendments,
    "committees": build_bill_committees,
    "cosponsors": build_bill_cosponsors,
    "sponsors": build_bill_sponsors,
    "subjects": build_bill_subjects,
    "summaries": build_bill_summaries,
    "related_bills": build_bill_related_bills,
    "text_versions": build_bill_text_versions,
    "titles": build_bill_titles,
}
