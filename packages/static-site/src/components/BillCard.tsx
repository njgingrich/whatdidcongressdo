import format from "date-fns/format";
import ActionCard from "~/components/ActionCard";
import { TypeBill } from "~/api/v2/schemas/bill";
import { getDate } from "../util";

type TypeProps = {
    bill: TypeBill;
}

export default function BillCard({ bill }: TypeProps) {
    const introducedDate = `Introduced ${format(getDate(new Date(bill.introducedDate)), "PPP")}`;
    const updatedDate = `Updated ${format(getDate(new Date(bill.latestAction.actionDate)), "PPP")}`
    const sponsorName = `Rep. ${bill.sponsors[0].firstName} ${bill.sponsors[0].lastName}`;
    const sponsorTitle = `${sponsorName} (${bill.sponsors[0].party}-${bill.sponsors[0].state})`
    const cosponsorCount = bill.cosponsors?.data.cosponsors.length ?? 0;
    const cosponsorText = cosponsorCount > 0
        ? `${cosponsorCount} cosponsor${cosponsorCount > 1 ? 's' : ''}`
        : 'No cosponsors';

    // const avatarUrl = `https://theunitedstates.io/images/congress/225x275/${bill.sponsors[0].bioguideId}.jpg`;
    const avatarUrl = `https://www.congress.gov/img/member/${bill.sponsors[0].bioguideId.toLocaleLowerCase()}_200.jpg`
    const congressUrl = `https://www.congress.gov/bill/${bill.congress}th-congress/house-bill/${bill.number}`;
    const govTrackUrl = `https://www.govtrack.us/congress/bills/${bill.congress}/${bill.type.toLocaleLowerCase()}${bill.number}`;

    return (
        <ActionCard cardType="bill">
            <span className="action-card--time">
                {`${introducedDate} - ${updatedDate}`}
            </span>
            <h3 className="action-card--title">{bill.title}</h3>
            <span className="action-card--subtitle">{`${bill.type} ${bill.number}`}</span>
            <p className="action-card--description">{bill.latestAction.text}</p>
            {/* <div className="action-card--result">
                <span></span>
            </div> */}

            <div className="action-card--details" data-party={bill.sponsors[0].party}>
                <div className="action-card--details__avatar">
                    <img src={avatarUrl} alt={sponsorName} />
                </div>
                <div className="action-card--details__name">
                    <span className="action-card--details__name-title">{sponsorTitle}</span>
                    <span className="action-card--details__cosponsors">{cosponsorText}</span>
                </div>
                <div className="action-card--details__committees">
                    <span className="action-card--details__committees-title">Committees</span>
                    <div className="action-card--details__committees-list">
                        {bill.committees?.data?.committees.map(committee => (
                            <div className="action-card--details__committee_code">
                                <span>{committee.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="action-card--links">
                <a className="action-card--link" href={congressUrl} target="_blank" rel="noopener">
                    Read more
                </a>
                <a className="action-card--link" href={govTrackUrl} target="_blank" rel="noopener">
                    Learn more on GovTrack
                </a>
            </div>
        </ActionCard>
    )
}
