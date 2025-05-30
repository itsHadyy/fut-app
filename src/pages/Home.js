import {Link} from "react-router-dom";
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
        </div>
    );
}

export default Home;