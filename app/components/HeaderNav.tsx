import { Link } from 'remix';

export default function HeaderNav() {
    return (
        <nav className="header-nav">
            <ul>
                <li>
                    <Link to="house">House</Link>
                </li>
                <li>
                    <Link to="senate">Senate</Link>
                </li>
                <li>
                    <Link to="/">What Did Congress Do Today?</Link>
                </li>
                <li>
                    <Link to="about">About</Link>
                </li>
            </ul>
        </nav>
    )    
}
