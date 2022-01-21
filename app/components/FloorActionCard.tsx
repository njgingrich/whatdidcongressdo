import format from "date-fns/format";
import ActionCard from "~/components/ActionCard";
import { TypeFloorAction } from "~/types/floor";

type TypeProps = {
    action: TypeFloorAction;
}

export default function FloorActionCard({ action }: TypeProps) {
    const timestamp = format(new Date(action.timestamp), "p");
    return (
        <ActionCard cardType="floor-action">
            <time className="action-card--time">
                {timestamp}
            </time>
            <p className="action-card--description">
                {action.description}
            </p>
        </ActionCard>
    )
}
