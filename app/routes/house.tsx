import { NavLink, Outlet } from "remix";
import type { LinksFunction } from "remix";

import chamberStyles from '~/styles/chamber.css';
import tabsStyles from "@reach/tabs/styles.css";

export const links: LinksFunction = () => {
    return [
        { rel: 'stylesheet', href: tabsStyles },
        { rel: 'stylesheet', href: chamberStyles },
    ]
}

export default function HouseIndexPage() {
    return (
        <div className="page-container" data-chamber="house">
            <div className="page-full-width chamber-banner">
                <h1 className="chamber-banner--header">House of Representatives</h1>
            </div>
            <div className="page-content chamber-container">
                <nav className="side-navigation">
                    <ul className="side-navigation--list">
                        <li className="side-navigation--list__item">
                            <NavLink to="floor">Floor proceedings</NavLink>
                        </li>
                        <li className="side-navigation--list__item">
                            <NavLink to="votes">Votes</NavLink>
                        </li>
                        <li className="side-navigation--list__item">
                            <NavLink to="bills">Bills</NavLink>
                        </li>
                        <li className="side-navigation--list__item">
                            <NavLink to="committees">Committees</NavLink>
                        </li>
                    </ul>
                </nav>
                <Outlet />
            </div>
        </div>
    )
}
