import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProjectDetails() {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    // This would typically come from Firestore
    const projects = {
        mobile: [
            {
                id: 1,
                banner: '../public/media/Portfolio/Mobile/pre/Banner.png',
                name: 'PRE Developments',
                intro: 'FutApp is proud to introduce PRE Community, a cutting-edge community management application developed for PRE Developments. Designed to enhance security, convenience, and communication, PRE Community empowers residents with seamless gate access, visitor management, service bookings, and bill payments—all in one app.',
                category: 'Community Application',
                description: 'The Community Mobile Application is your one-stop solution for seamless living in your residential compound. This app connects residents to essential services, events, and each other. Enjoy features like facility booking, maintenance requests, community announcements, and exclusive deals from nearby businesses—all at your fingertips. Stay informed, engaged, and effortlessly manage your daily needs within the community.',
                image: 'media/Portfolio/Mobile/PRE.png',
                features: [
                    'Community News Feed – Stay updated with announcements, events, and security alerts posted by developers.',
                    'QR-Code Gate Access – Hassle-free entry for residents using their unique digital pass.',
                    'Visitor Management – Send digital invitations to guests for a smooth check-in process.',
                    'Service Appointments – Book trusted professionals for plumbing, carpentry, electrical work, and more.',
                    'Bill Payments – Pay water, electricity, and gas bills securely from the app.'
                ],
                technologies: ['React Native', 'Firebase', 'Node.js'],
                platforms: ['Android', 'iOS']
            },
            // ... other mobile projects
        ],
        websites: [
            {
                id: 6,
                banner: 'media/Portfolio/Websites/arab-dairy/banner.png',
                name: 'Arab Dairy Website',
                category: 'Shopping, Pharmaceuticals',
                description: "The Community Mobile Application is your one-stop solution for seamless living in your residential compound. This app connects residents to essential services, events, and each other. Enjoy features like facility booking, maintenance requests, community announcements, and exclusive deals from nearby businesses—all at your fingertips. Stay informed, engaged, and effortlessly manage your daily needs within the community.",
                image: 'media/Portfolio/Websites/Arab Dairy.png',
                features: [
                    'Product Catalog',
                    'Online Ordering',
                    'Secure Payments',
                    'Order Tracking',
                    'Customer Support'
                ],
                technologies: ['React', 'Node.js', 'MongoDB'],
                platforms: ['Web']
            },
        ]
    };

    useEffect(() => {
        // Simulate fetching data from Firestore
        const fetchProject = async () => {
            try {
                // In the future, this will be replaced with actual Firestore query
                const foundProject = [...projects.mobile, ...projects.websites].find(p => p.id === parseInt(projectId));
                setProject(foundProject);
            } catch (error) {
                console.error('Error fetching project:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectId]);

    if (loading) {
        return (
            <div className="loading">
                <h1>Loading...</h1>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="project-not-found">
                <h1>Project Not Found</h1>
                <button onClick={() => navigate('/portfolio')} className="btn">Back to Portfolio</button>
            </div>
        );
    }

    return (
        <div className="project-details">
            <div
                className="services-banner"
                style={{
                    backgroundImage: `url(${project.banner})`
                }}
            >
                <div className='banner-content'>
                    <h1>{project.name}</h1>
                    <p>{project.intro}</p>
                    <button className="btn">Let's Talk!</button>
                </div>
            </div>

            <div className="project-content">
                <div className="project-image">
                    <img src={project.image} alt={project.name} />
                </div>

                <div className="project-info">
                    <div className="description">
                        <h2>About the Project</h2>
                        <p>{project.description}</p>
                    </div>

                    {project.features && (
                        <div className="features">
                            <h2>Key Features</h2>
                            <ul>
                                {project.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {project.technologies && (
                        <div className="technologies">
                            <h2>Technologies Used</h2>
                            <div className="tech-tags">
                                {project.technologies.map((tech, index) => (
                                    <span key={index} className="tech-tag">{tech}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {project.platforms && (
                        <div className="platforms">
                            <h2>Available Platforms</h2>
                            <div className="platform-tags">
                                {project.platforms.map((platform, index) => (
                                    <span key={index} className="platform-tag">{platform}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProjectDetails; 