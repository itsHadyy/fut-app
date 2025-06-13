import { Link, useLocation } from "react-router-dom";
import logo from '../logo.png';
import logoWhite from '../logo-white.png';
import { useEffect, useState } from 'react';

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
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

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className={isScrolled ? 'blurred' : ''}>

            <div className="nav-links">
                <ul className={isOpen ? 'open' : ''}>
                    <li>
                        <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={() => setIsOpen(false)}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={() => setIsOpen(false)}>
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link to="/portfolio" className={location.pathname.startsWith('/portfolio') || location.pathname.startsWith('/projects') ? 'active' : ''} onClick={() => setIsOpen(false)}>
                            Portfolio
                        </Link>
                    </li>
                    <li>
                        <Link to="/products" className={location.pathname.startsWith('/products') ? 'active' : ''} onClick={() => setIsOpen(false)}>
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link to="/services" className={location.pathname === '/services' ? 'active' : ''} onClick={() => setIsOpen(false)}>
                            Services
                        </Link>
                    </li>
                </ul>
            </div>

            <div>
                <img src={logo} alt="FutApp Logo" />
            </div>

            <div>
                <Link to='/contact' onClick={() => setIsOpen(false)}>
                    <button className="btn">Contact Us <img src="/media/assets/arrow.png" alt="arrow" /></button>
                </Link>
            </div>

            <div className={`menu-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </header>
    )
}

export default Navbar;