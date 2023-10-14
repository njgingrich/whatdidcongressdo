import format from "date-fns/format";
import ActionCard from "~/components/ActionCard";
import { TypeBill } from "~/api/v2/schemas/bill";

type TypeProps = {
    bill: TypeBill;
}

export default function BillCard({ bill }: TypeProps) {
    const introducedDate = `Introduced ${format(new Date(bill.introducedDate), "PPP")}`;
    const updatedDate = `Updated ${format(new Date(bill.latestAction.actionDate), "PPP")}`
    const sponsorName = `${bill.sponsors[0].fullName} (${bill.sponsors[0].party}-${bill.sponsors[0].state})`
    const cosponsorCount = bill.cosponsors?.data.cosponsors.length ?? 0;
    const cosponsorText = cosponsorCount > 0
        ? `${cosponsorCount} cosponsor${cosponsorCount > 1 ? 's' : ''}`
        : 'No cosponsors';

    return (
        <ActionCard cardType="bill">
            <span className="action-card--time">
                {`${introducedDate} - ${updatedDate}`}
            </span>
            <h3 className="action-card--title">{bill.title}</h3>
            <span className="action-card--subtitle">{`${bill.type} ${bill.number}`}</span>
            <p className="action-card--description" dangerouslySetInnerHTML={{__html: bill.latestAction.actionDate }} />
            <div className="action-card--result">
                <span>{bill.latestAction.text}</span>
            </div>

            <div className="action-card--details" data-party={bill.sponsors[0].party}>
                <div className="action-card--details__avatar" />
                <span className="action-card--details__name">{sponsorName}</span>
                <span className="action-card--details__cosponsors">{cosponsorText}</span>
                <div className="action-card--details__committees">
                    {bill.committees?.data?.committees.map(committee => (
                        <div className="action-card--details__committee_code">
                            <span>{committee.systemCode}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="action-card--links">
                <a className="action-card--link" href={''} target="_blank" rel="noopener">
                    Read more
                </a>
                <a className="action-card--link" href={''} target="_blank" rel="noopener">
                    Learn more on GovTrack
                </a>
            </div>
        </ActionCard>
    )
}
