import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Link } from "react-router-dom";

function Portfolio() {
    const [activeService, setActiveService] = useState('mobile');
    const navigate = useNavigate();

    const projects = {
        mobile: [
            { id: 1, name: 'PRE Developments', image: 'media/Portfolio/Mobile/PRE.png' },
            { id: 2, name: 'JDAR Developments', image: 'media/Portfolio/Mobile/JDAR.png' },
            { id: 3, name: 'al ahly sabour Developments', image: 'media/Portfolio/Mobile/ahly.png' },
            { id: 4, name: 'Buzz Mobility', image: 'media/Portfolio/Mobile/Buzz.png' },
            { id: 5, name: 'Orange', image: 'media/Portfolio/Mobile/orange.png' },
            { id: 6, name: 'Vinde', image: 'media/Portfolio/Mobile/vinde.png' },
        ],
        websites: [
            { id: 7, name: 'Arab Dairy Website', image: 'media/Portfolio/Websites/Arab Dairy.png' },
            { id: 8, name: 'Orange Website', image: 'media/Portfolio/Websites/Orange.png' },
            { id: 9, name: 'Pioneers Webite', image: 'media/Portfolio/Websites/Pioneers.png' },
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
                            <h2>Mobile Application Projects</h2>
                            <div className="projects-list">
                                {projects.mobile.map(project => (
                                    <div key={project.id} className="project-item" onClick={() => handleProjectClick(project.id)}>
                                        <img src={project.image} alt={project.name} />
                                        <p>{project.name}</p>
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
                            <h2>Website Projects</h2>
                            <div className="projects-list">
                                {projects.websites.map(project => (
                                    <div key={project.id} className="project-item" onClick={() => handleProjectClick(project.id)}>
                                        <img src={project.image} alt={project.name} />
                                        <p>{project.name}</p>
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