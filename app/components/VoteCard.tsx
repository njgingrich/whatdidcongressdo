import format from 'date-fns/format';

import type { TypeParty, TypeVote, TypeVoteObject, TypeVotePosition } from '~/types/votes';
import ActionCard from "~/components/ActionCard";

type TypeProps = {
    vote: TypeVote;
};

const PARTY_KEYS: (TypeParty | 'total')[] = ['republican', 'democratic', 'independent', 'total'];

function getVoteCellMarkup(type: TypeParty | 'total', position: TypeVotePosition, votes: TypeVoteObject) {
    return (
        <td data-col={type} key={type}>
            <div className="action-card--votes__cell">
                <div className="action-card--votes__color" data-party={type} aria-hidden />
                <span className="action-card--votes__count">{votes[type][position]}</span>
            </div>
        </td>
    )
}

function getVoteRowMarkup(header: string, position: TypeVotePosition, votes: TypeVoteObject) {
    return (
        <tr>
            <th data-col="type">{header}</th>
            {PARTY_KEYS.map(key => getVoteCellMarkup(key, position, votes))}
        </tr>
    );
}

export default function VoteCard({ vote }: TypeProps) {
    const timestamp = format(new Date(vote.timestamp), "p");

    return (
        <ActionCard cardType="vote" data-chamber={vote.chamber}>
            <time className="action-card--time">{timestamp}</time>
            <h3 className="action-card--title">{vote.title}</h3>
            {vote.subtitle ?? <span className="action-card--subtitle">{vote.subtitle}</span>}
            <p className="action-card--description" dangerouslySetInnerHTML={{__html: vote.description }} />
            <a className="action-card--link" href={vote.link} target="_blank" rel="noopener">
                Read more
            </a>
            <table className="action-card--votes">
                <thead>
                    <tr>
                        <th aria-label="Vote Type"></th>
                        <th aria-label="Republican Vote Count"></th>
                        <th aria-label="Democratic Vote Count"></th>
                        <th aria-label="Independent Vote Count"></th>
                        <th aria-label="Total Vote Count">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {getVoteRowMarkup('Yes', 'yes', vote.breakdown)}
                    {getVoteRowMarkup('No', 'no', vote.breakdown)}
                    {vote.breakdown.total.present > 0 ? getVoteRowMarkup('Present', 'present', vote.breakdown) : null}
                    {getVoteRowMarkup('N/V', 'not_voting', vote.breakdown)}
                </tbody>
            </table>
            <div className="action-card--result">
                <span>{vote.result}</span>
            </div>
        </ActionCard>
    )
}