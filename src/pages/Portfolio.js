import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebaseConfig';

function Portfolio() {
    const [activeService, setActiveService] = useState('mobile');
    const [projects, setProjects] = useState({
        mobile: [],
        websites: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Query for visible portfolio projects
                const q = query(
                    collection(db, "projects"),
                    where("collection", "==", "portfolio"),
                    where("visible", "==", true)
                );
                const querySnapshot = await getDocs(q);
                const projectsData = {
                    mobile: [],
                    websites: []
                };

                querySnapshot.forEach((doc) => {
                    const project = { id: doc.id, ...doc.data() };
                    if (project.type === 'mobile') {
                        projectsData.mobile.push(project);
                    } else if (project.type === 'website') {
                        projectsData.websites.push(project);
                    }
                });

                setProjects(projectsData);
            } catch (err) {
                console.error('Error fetching projects: ', err);
                setError('Failed to load projects.');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const renderContent = () => {
        if (loading) {
            return <div className="loading">Loading projects...</div>;
        }

        if (error) {
            return <div className="error">{error}</div>;
        }

        const currentProjects = activeService === 'mobile' ? projects.mobile : projects.websites;

        if (currentProjects.length === 0) {
            return <div className="no-projects">No projects found for this category.</div>;
        }

        return (
            <div className="projects-section">
                <div className="projects-list">
                    {currentProjects.map(project => (
                        <div key={project.id} className={`flex ${project.align === 'right' ? 'right' : 'left'}`}>
                            <div>
                                <h2>{project.name}</h2>
                                <span>{project.category}</span>
                                <p>{project.description}</p>

                                {project.platforms && project.platforms.length > 0 && (
                                    <div className="btn-container">
                                        {project.platforms.map((platform, index) => (
                                            <span key={index} className="btn">{platform}</span>
                                        ))}
                                    </div>
                                )}

                                <Link to={`/projects/${project.id}`}>
                                    View Project <img src="media/assets/arrow02.png" alt="arrow" />
                                </Link>
                            </div>

                            <div className="flex-img">
                                <img src={project.image} alt={project.name} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderBanner = () => {
        switch (activeService) {
            case 'mobile':
                return (
                    <div className="services-banner mobile-banner02">
                        <div className='banner-content'>
                            <h1>Work <strong>Smart</strong><br /> Not Hard</h1>
                            <p>Innovate, Integrate, Inspire: Your Software Solutions Partner.</p>
                            <Link to="/contact">
                                <button className="btn">Let's Talk!</button>
                            </Link>
                        </div>
                    </div>
                );
            case 'websites':
                return (
                    <div className="services-banner websites-banner02">
                        <div className='banner-content'>
                            <h1>We <strong>Build</strong><br /> Your <strong>Future</strong></h1>
                            <p>Innovate, Integrate, Inspire: Your Software Solutions Partner.</p>
                            <Link to="/contact">
                                <button className="btn">Let's Talk!</button>
                            </Link>
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