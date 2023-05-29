export default function HeaderNav() {
    return (
        <nav className="header-nav">
            <ul>
                <li className="header-nav__item header-nav__home--large">
                    <a href="/">What Did Congress Do Today?</a>
                </li>
                <li className="header-nav__item header-nav__home--small">
                    <a href="/">Home</a>
                </li>
                <li className="header-nav__item">
                    <a href="/house">House</a>
                </li>
                <li className="header-nav__item">
                    <a href="/senate">Senate</a>
                </li>
                <li className="header-nav__item">
                    <a href="/about">About</a>
                </li>
            </ul>
        </nav>
    )    
}
