import { NavLink, Outlet } from "remix";
import type { LinksFunction } from "remix";

import houseStyles from '~/styles/house.css';

export const links: LinksFunction = () => {
    return [
        { rel: 'stylesheet', href: houseStyles },
    ]
}

export default function HouseIndexPage() {
    return (
        <div className="page-container">
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
