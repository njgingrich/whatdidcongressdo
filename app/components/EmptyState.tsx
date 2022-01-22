type TypeProps = {
    message: string;
}

export default function EmptyState({ message }: TypeProps) {
    return (
        <section className="empty-state">
            <p className="empty-state--message">{message}</p>
        </section>
    );
}
