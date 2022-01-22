import format from "date-fns/format";
import ActionCard from "~/components/ActionCard";
import { TypeBill } from "~/types/bills";

type TypeProps = {
    bill: TypeBill;
}

export default function BillCard({ bill }: TypeProps) {
    const introducedDate = `Introduced ${format(new Date(bill.dates.introduced), "PPP")}`;
    const updatedDate = `Updated ${format(new Date(bill.dates.lastActionDate), "PPP")}`
    const sponsorName = `${bill.sponsor.title} ${bill.sponsor.name} (${bill.sponsor.party}-${bill.sponsor.state})`
    const cosponsorText = bill.sponsor.cosponsors > 0
        ? `${bill.sponsor.cosponsors} cosponsor${bill.sponsor.cosponsors > 1 ? 's' : ''}`
        : 'No cosponsors';

    return (
        <ActionCard cardType="bill">
            <span className="action-card--time">
                {`${introducedDate} - ${updatedDate}`}
            </span>
            <h3 className="action-card--title">{bill.title}</h3>
            <span className="action-card--subtitle">{bill.number}</span>
            <p className="action-card--description" dangerouslySetInnerHTML={{__html: bill.details.lastAction }} />
            <div className="action-card--result">
                {/* <span>{bill.details.lastAction}</span> */}
            </div>

            <div className="action-card--details" data-party={bill.sponsor.party}>
                <div className="action-card--details__avatar" />
                <span className="action-card--details__name">{sponsorName}</span>
                <span className="action-card--details__cosponsors">{cosponsorText}</span>
                <div className="action-card--details__committees">
                    {bill.committeeCodes.map(code => (
                        <div className="action-card--details__committee_code">
                            <span>{code}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="action-card--links">
                <a className="action-card--link" href={bill.details.link} target="_blank" rel="noopener">
                    Read more
                </a>
                <a className="action-card--link" href={bill.details.govtrackLink} target="_blank" rel="noopener">
                    Learn more on GovTrack
                </a>
            </div>
        </ActionCard>
    )
}
