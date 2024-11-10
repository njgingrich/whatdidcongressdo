import { ReactNode } from "react";

type TypeProps = {
    cardType: 'vote' | 'floor-action' | 'bill' | 'hearing';
    children: ReactNode;
};

export default function ActionCard({ cardType, children, ...props }: TypeProps) {
    return (
        <div className="action-card" data-card-type={cardType} {...props}>
            {children}
        </div>
    )
}
