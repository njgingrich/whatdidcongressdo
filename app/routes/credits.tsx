export default function CreditsPage() {
    return (
        <div className="page-container">
            <section className="page-topper page-full-width">
                <img src="images/capitol_night.jpg" className="lead-img" />
            </section>
            <section className="section-about">
                <div className="about-card">
                    <h1 className="about-card--title">Credit & Attribution</h1>
                    <p className="about-card--text">
                        This site is possible due to public data from multiple sources.
                    </p>

                    <h2>Source & Data</h2>
                    <dl>
                        <dt>Website Source</dt>
                        <dd>
                            The source for this website is available on GitHub, and is built
                            with Remix and React.
                        </dd>
                        <dt>Data Sources</dt>
                        <dd>
                            All data is sourced from the ProPublica Congress API, under the
                            Creative Commons Attribution-NonCommercial-NoDerivs 3.0 license.
                        </dd>
                    </dl>

                    <h2>Images</h2>
                    <dl>
                        <dt>Home Page</dt>
                        <dd>Images credited to Architect of the Capitol.</dd>
                        <dt>Credits Page</dt>
                        <dd>Images credited to Architect of the Capitol.</dd>
                    </dl>
                    <h2>Icons</h2>
                    <dl>
                        <dt>Home page - Calendar</dt>
                        <dd>Calendar Sync by Musket from NounProject.com</dd>
                        <dt>Home page - People with sign</dt>
                        <dd>Democracy by Fahmi from NounProject.com</dd>
                        <dt>Home page - Public Data</dt>
                        <dd>Api by H Alberto Gongora from NounProject.com</dd>
                        <dt>Share icons</dt>
                        <dd>Share icons were sourced from shareicons.org, which is licensed under CC0.</dd>
                        <dt>Share icons - email</dt>
                        <dd>The email icon was sourced from heroicons.com under the MIT license.</dd>
                    </dl>
                </div>
            </section>
        </div>
    )
}