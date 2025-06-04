import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Link } from "react-router-dom";

function Portfolio() {
    const [activeService, setActiveService] = useState('mobile');
    const navigate = useNavigate();

    const projects = {
        mobile: [
            {
                id: 1,
                name: 'PRE Developments',
                category: 'Community Application',
                description: 'The Community Mobile Application is your one-stop solution for seamless living in your residential compound. This app connects residents to essential services, events, and each other. Enjoy features like facility booking, maintenance requests, community announcements, and exclusive deals from nearby businesses—all at your fingertips. Stay informed, engaged, and effortlessly manage your daily needs within the community.',
                image: 'media/Portfolio/Mobile/PRE.png',
                align: 'flex right'
            },
            {
                id: 2,
                name: 'JDAR Developments',
                category: 'Community Application',
                description: 'The Community Mobile Application is your one-stop solution for seamless living in your residential compound. This app connects residents to essential services, events, and each other. Enjoy features like facility booking, maintenance requests, community announcements, and exclusive deals from nearby businesses—all at your fingertips. Stay informed, engaged, and effortlessly manage your daily needs within the community.',
                align: 'flex left',
                image: 'media/Portfolio/Mobile/JDAR.png'
            },
            {
                id: 3,
                name: 'Al Ahly Sabour Developments',
                category: 'Community Application',
                description: 'The Community Mobile Application is your one-stop solution for seamless living in your residential compound. This app connects residents to essential services, events, and each other. Enjoy features like facility booking, maintenance requests, community announcements, and exclusive deals from nearby businesses—all at your fingertips. Stay informed, engaged, and effortlessly manage your daily needs within the community.',
                align: 'flex right',
                image: 'media/Portfolio/Mobile/ahly.png'
            },
            {
                id: 4,
                name: 'Buzz Mobility',
                category: 'Entertainment ',
                description: "Discover the ultimate convenience in urban transportation with Buzz Mobility! Rent electric scooters effortlessly and zip around the compound in style. Whether you're exploring new places, or simply enjoying the open road, Buzz Mobility makes scooter rental a breeze.",
                align: 'flex left',
                image: 'media/Portfolio/Mobile/Buzz.png'
            },
            {
                id: 6,
                name: 'Vinde',
                category: 'Entertainment ',
                description: "Vinde is an exciting application that offers a unique way to enjoy video games. With its variety of games and amazing prizes, it is sure to provide hours of entertainment. Download Vinde now and start your journey to becoming a champion!",
                align: 'flex',
                image: 'media/Portfolio/Mobile/vinde.png'
            },
            {
                id: 5,
                name: 'Orange Pharmacies ',
                category: 'Shopping, Pharmaceuticals ',
                description: "Orange Pharmacies is a user-friendly mobile application designed to make purchasing pharmacy products seamless and convenient. Whether you need prescription medications, wellness essentials, or healthcare supplies, Orange Pharmacies ensures a hassle-free shopping experience.",
                align: 'flex left',
                image: 'media/Portfolio/Mobile/orange.png'
            },

        ],
        websites: [
            {
                id: 6,
                name: 'Arab Dairy Website',
                category: 'Shopping, Pharmaceuticals ',
                description: "The Community Mobile Application is your one-stop solution for seamless living in your residential compound. This app connects residents to essential services, events, and each other. Enjoy features like facility booking, maintenance requests, community announcements, and exclusive deals from nearby businesses—all at your fingertips. Stay informed, engaged, and effortlessly manage your daily needs within the community.",
                align: 'flex',
                image: 'media/Portfolio/Websites/Arab Dairy.png'
            },
            {
                id: 7,
                name: 'Orange Website',
                category: 'Shopping, Pharmaceuticals ',
                description: "The Community Mobile Application is your one-stop solution for seamless living in your residential compound. This app connects residents to essential services, events, and each other. Enjoy features like facility booking, maintenance requests, community announcements, and exclusive deals from nearby businesses—all at your fingertips. Stay informed, engaged, and effortlessly manage your daily needs within the community.",
                align: 'flex left',
                image: 'media/Portfolio/Websites/Orange.png'
            },
            {
                id: 8,
                name: 'Pioneers Webite',
                category: 'Shopping, Pharmaceuticals ',
                description: "The Community Mobile Application is your one-stop solution for seamless living in your residential compound. This app connects residents to essential services, events, and each other. Enjoy features like facility booking, maintenance requests, community announcements, and exclusive deals from nearby businesses—all at your fingertips. Stay informed, engaged, and effortlessly manage your daily needs within the community.",
                align: 'flex',
                image: 'media/Portfolio/Websites/Pioneers.png'
            },
        ],
    };

    const handleProjectClick = (projectId) => {
        navigate(`/projects/${projectId}`);
    };

    const renderContent = () => {
        switch (activeService) {
            case 'mobile':
                return (
                    <>
                        <div className="projects-section">
                            <div className="projects-list">
                                {projects.mobile.map(project => (
                                    <div key={project.id} className={project.align}>
                                        <div>
                                            <h2>{project.name}</h2>
                                            <span>{project.category}</span>
                                            <p>{project.description}</p>

                                            <div className="btn-container">
                                                <span className="btn">Android</span>
                                                <span className="btn">iOS</span>
                                                <span className="btn">Mobile</span>
                                            </div>
                                            <Link to="/">View Projects <img src="media/assets/arrow02.png" alt="arrow" /></Link>
                                        </div>

                                        <div className="flex-img">
                                            <img src={project.image} alt="Projects" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                );
            case 'websites':
                return (
                    <>
                        <div className="projects-section">
                            <div className="projects-list">
                                {projects.websites.map(project => (
                                    <div key={project.id} className={project.align}>
                                        <div>
                                            <h2>{project.name}</h2>
                                            <span>{project.category}</span>
                                            <p>{project.description}</p>

                                            <div className="btn-container">
                                                <span className="btn">Windows</span>
                                                <span className="btn">MacOS</span>
                                                <span className="btn">PC</span>
                                            </div>
                                            <Link to="/">View Projects <img src="media/assets/arrow02.png" alt="arrow" /></Link>
                                        </div>

                                        <div className="flex-img">
                                            <img src={project.image} alt="Projects" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    const renderBanner = () => {
        switch (activeService) {
            case 'mobile':
                return (
                    <div className="services-banner mobile-banner02">
                        <div className='banner-content'>
                            <h1>Work <strong>Smart</strong><br /> Not Hard</h1>
                            <p>Innovate, Integrate, Inspire: Your Software Solutions Partner.</p>
                            <button className="btn">Let's Talk!</button>
                        </div>
                    </div>
                );
            case 'websites':
                return (
                    <div className="services-banner websites-banner02">
                        <div className='banner-content'>
                            <h1>We <strong>Build</strong><br /> Your <strong>Future</strong></h1>
                            <p>Innovate, Integrate, Inspire: Your Software Solutions Partner.</p>
                            <button className="btn">Let's Talk!</button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="portfolio-page">
            {renderBanner()}
            <div className="service-buttons">
                <button
                    className={`btn ${activeService === 'mobile' ? 'active' : ''}`}
                    onClick={() => setActiveService('mobile')}
                >
                    Mobile Applications
                </button>
                <button
                    className={`btn ${activeService === 'websites' ? 'active' : ''}`}
                    onClick={() => setActiveService('websites')}
                >
                    Websites
                </button>
            </div>
            {renderContent()}
        </div>
    );
}

export default Portfolio;