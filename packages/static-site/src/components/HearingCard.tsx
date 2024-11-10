import format from "date-fns/format";
import ActionCard from "~/components/ActionCard";
import { TypeHearing } from "~/types/committees";

type TypeProps = {
    hearing: TypeHearing;
}

export default function HearingCard({ hearing }: TypeProps) {
    const timestamp = format(new Date(hearing.timestamp), "p");
    const date = format(new Date(hearing.timestamp), "PPP");

    return (
        <ActionCard cardType="hearing">
            <span className="action-card--time">
                {`${timestamp} - ${date}`}
            </span>
            <h3 className="action-card--title">{hearing.committee.name}</h3>
            <p className="action-card--description" dangerouslySetInnerHTML={{__html: hearing.description }} />
        </ActionCard>
    )
}