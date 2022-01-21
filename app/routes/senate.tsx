import { Link, Outlet } from "remix";

export default function SenateIndexPage() {
    return (
        <div className="page-container">
            <aside className="page-navigation">
                <ul>
                    <li><Link to="floor">Floor proceedings</Link></li>
                    <li><Link to="votes">Votes</Link></li>
                    <li><Link to="bills">Bills</Link></li>
                    <li><Link to="committees">Committees</Link></li>
                </ul>
            </aside>
            <Outlet />
        </div>
    )
}
