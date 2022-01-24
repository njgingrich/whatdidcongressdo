import { Link } from "remix";

export default function AboutPage() {
    return (
        <div className="page-container">
            <section className="section-about--topper page-topper page-full-width">
                <img src="images/capitol_night.jpg" className="lead-img" />
            </section>
            <section className="section-about">
                <div className="about-card">
                    <h1 className="about-card--title">About this site</h1>
                    <p className="about-card--text">
                        What exactly goes on in a typical day at the Senate or the House of Representatives?
                        I had no idea, but I wanted to find out. It can be hard to trawl through the
                        official websites to get the important information. I built this site to make it easy
                        to get a snapshot of the day in, day out goings-on in Washington, D.C.
                    </p>
                    <p>
                        For credits & attribution, see <Link to="/credits">here</Link>.
                    </p>
                </div>
            </section>
        </div>
    )
}