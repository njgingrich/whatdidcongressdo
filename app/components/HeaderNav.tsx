import { Link } from 'remix';

export default function HeaderNav() {
    return (
        <nav className="header-nav">
            <ul>
                <li className="header-nav__item header-nav__home--large">
                    <Link to="/">What Did Congress Do Today?</Link>
                </li>
                <li className="header-nav__item header-nav__home--small">
                    <Link to="/">Home</Link>
                </li>
                <li className="header-nav__item">
                    <Link to="house">House</Link>
                </li>
                <li className="header-nav__item">
                    <Link to="senate">Senate</Link>
                </li>
                <li className="header-nav__item">
                    <Link to="about">About</Link>
                </li>
            </ul>
        </nav>
    )    
}
