import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebaseConfig'; // Import db

function Products() {
    const [activeService, setActiveService] = useState('mobile');
    const navigate = useNavigate(); // Keep navigate although not directly used for Link for consistency
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Query for visible projects
                const q = query(collection(db, "projects"), where("visible", "==", true));
                const querySnapshot = await getDocs(q);
                const projectsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProjects(projectsList);
            } catch (err) {
                console.error('Error fetching projects: ', err);
                setError('Failed to load projects.');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [db]); // db is stable, but added for completeness

    // Filter projects based on activeService
    const filteredProjects = projects.filter(project => {
        if (!project.platforms || project.platforms.length === 0) return false; // Ensure platforms exist

        const lowerCasePlatforms = project.platforms.map(p => p.toLowerCase());

        if (activeService === 'mobile') {
            return lowerCasePlatforms.includes('android') || lowerCasePlatforms.includes('ios') || lowerCasePlatforms.includes('mobile');
        } else if (activeService === 'websites') {
            return lowerCasePlatforms.includes('web') || lowerCasePlatforms.includes('windows') || lowerCasePlatforms.includes('macos') || lowerCasePlatforms.includes('pc');
        }
        return false; // Should not happen with current buttons, but safe default
    });

    const renderContent = () => {
        if (loading) {
            return <div>Loading projects...</div>;
        }

        if (error) {
            return <div>Error: {error}</div>;
        }

        // Show message only if no projects found after filtering
        if (projects.length > 0 && filteredProjects.length === 0) {
            return <div>No projects found for this category.</div>;
        }
        if (projects.length === 0 && !loading) {
            return <div>No projects added yet.</div>; // Message if no projects in DB at all
        }

        return (
            <div className="projects-section">
                <div className="projects-list">
                    {filteredProjects.map(project => (
                        <div key={project.id} className={project.align || 'flex'}>
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

                                <Link to={`/projects/${project.id}`}>View Project <img src="media/assets/arrow02.png" alt="arrow" /></Link>
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

export default Products;