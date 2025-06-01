import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
    return (
        <div className="footer-container">
            <h2>Get started with a new way of customer relation</h2>
            <footer>
                <div className="footer-top">
                    <div className="contact-form-container">
                        <input type="text" placeholder="Your Name" />
                        <input type="email" placeholder="E-mail" />
                        <textarea placeholder="Type your message..."></textarea>
                        <button className="send-message-btn">Send Message</button>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-info">
                        <p>
                            At Futapp, we are dedicated to innovating cutting-edge digital solutions
                            that transcend boundaries. Our commitment to excellence is reflected in
                            every line of code we craft, shaping a connected world where
                            possibilities are limitless.
                        </p>
                        <div className="follow-us">
                            <span>Follow Us</span>
                            <Link to="#"><FaInstagram /></Link>
                            <Link to="#"><FaFacebook /></Link>
                            <Link to="#"><FaXTwitter /></Link>
                            <Link to="#"><FaLinkedin /></Link>
                        </div>
                        <p className="copyright">Copyright © 2025</p>
                    </div>
                    <ul className="footer-nav">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </div>
            </footer>
        </div>
    )
}

export default Footer