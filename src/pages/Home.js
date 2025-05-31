import { Link } from "react-router-dom";
import Clients from "../components/Clients";

function Home() {
    return (
        <div>
            <div className="home01">
                <div>
                    <p>At FutApp, we are a dynamic and innovative software development company committed to transforming ideas into reality. Our journey began in 2023, when a group of passionate tech enthusiasts decided to combine their expertise and vision to create solutions that drive digital transformation. From our humble beginnings, we have grown into a dedicated team of skilled developers, designers, and project managers who work tirelessly to deliver top-notch software solutions.</p>
                    <Link to="/">Learn More <img src="media/assets/arrow02.png" alt="arrow" /></Link>
                </div>
                <div className="home-banner">
                    <h1>Innovative Solutions For The Future</h1>
                    <p>Innovate, Integrate, Inspire: Your Software Solutions Partner.</p>
                    <button className="btn">Let's Talk!</button>
                </div>
            </div>

            <Clients />

            <div className="home02">
                <h1>Featured Products</h1>
                <p>Unlock the potential of tomorrow with FutApp's cutting-edge solutions! Our platform offers tailored, ready-to-use tools designed to streamline your processes, enhance productivity, and spark innovation. Whether you're seeking smart integrations, futuristic designs, or advanced technology applications, FutApp empowers you to achieve your goals effortlessly. <br />
                    Experience the future today!</p>
            </div>

            <div className="flex">
                <div>
                    <h2>Community Application</h2>
                    <p>The Community Mobile Application is your one-stop solution for seamless living in your residential compound. This app connects residents to essential services, events, and each other. Enjoy features like facility booking, maintenance requests, community announcements, and exclusive deals from nearby businesses—all at your fingertips. Stay informed, engaged, and effortlessly manage your daily needs within the community.</p>
                    <div className="btn-container">
                        <span className="btn">Android</span>
                        <span className="btn">iOS</span>
                        <span className="btn">Mobile</span>
                    </div>
                    <Link to="/">View Projects <img src="media/assets/arrow02.png" alt="arrow" /></Link>
                </div>

                <div className="flex-img">
                    <img src="media/Home/Frame217.png" alt="Projects" />
                </div>
            </div>

            <div className="home02">
                <Link to="/"><button className="btn">View All Products</button></Link>
            </div>

            <div className="home02">
                <h1>
                    Development Process
                </h1>

                <p>Creating an application or website involves multiple stages, blending creativity, technical expertise, and project management. Here's a general overview of the process:</p>

                <div className="process-container">
                    <div className="row">
                        <div className="card">
                            Concept & Planning
                        </div>
                        <div className="card">
                            Development
                        </div>
                        <div className="card">
                            Launch
                        </div>
                    </div>

                    <div className="row">
                        <div className="card">
                            Design & Visuals
                        </div>
                        <div className="card">
                            Testing
                        </div>
                    </div>
                    <div className="process">
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;