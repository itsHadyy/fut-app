import { Link, useLocation } from "react-router-dom";
import logo from '../logo.png';
import { useEffect, useState } from 'react';

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={isScrolled ? 'blurred' : ''}>
            <div>
                <ul>
                    <li>
                        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link to="/portfolio" className={location.pathname === '/portfolio' ? 'active' : ''}>
                            Portfolio
                        </Link>
                    </li>
                    <li>
                        <Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link to="/services" className={location.pathname === '/services' ? 'active' : ''}>
                            Services
                        </Link>
                    </li>
                </ul>
            </div>

            <div>
                <img src={logo} alt="FutApp Logo" />
            </div>

            <div>
                <Link to='/contact'>
                    <button className="btn">Contact Us <img src="media/assets/arrow.png" alt="arrow" /></button>
                </Link>
            </div>
        </header>
    )
}

export default Navbar;