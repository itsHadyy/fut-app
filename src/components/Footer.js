import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Footer() {
    const location = useLocation();
    const isContactPage = location.pathname === '/contact';
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch('http://localhost:8080/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: 'Message sent successfully!' });
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus({ type: 'error', message: data.message || 'Failed to send message' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
        }

        setLoading(false);
    };

    return (
        <div className="footer-container">
            {!isContactPage && (
                <h2>Get started with a new way of customer relation</h2>
            )}
            <footer>
                {!isContactPage && (
                    <div className="footer-top">
                        <div className="contact-form-container">
                            {status.message && (
                                <div className={`${status.type}-message`}>
                                    {status.message}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="E-mail"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <textarea
                                    name="message"
                                    placeholder="Type your message..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                                <button 
                                    className="send-message-btn"
                                    disabled={loading}
                                >
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
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
                        <li>
                            <label className="switch">
                                <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
                                <span className="slider round"></span>
                            </label>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    )
}

export default Footer