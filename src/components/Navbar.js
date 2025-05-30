import { Link } from "react-router-dom";
import logo from '../Logo.svg';

function Navbar() {
    return (
        <header>
            <div>
                <ul>
                    <li>
                        <Link to="/" className="active">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about">
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link to="/portfolio">
                            Portfolio
                        </Link>
                    </li>
                    <li>
                        <Link to="/products">
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link to="/services">
                            Services
                        </Link>
                    </li>
                </ul>
            </div>

            <div>
                <img src={logo} alt="FutApp Logo" />
            </div>

            <div>
                <button className="btn">Contact Us <img src="media/assets/arrow.png" alt="arrow" /></button>
            </div>
        </header>
    )
}

export default Navbar;