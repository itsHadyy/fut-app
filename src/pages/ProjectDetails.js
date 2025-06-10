import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';

const ProjectDetails = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    const getContrastTextColor = (hexcolor) => {
        if (!hexcolor) return 'black';

        const color = hexcolor.startsWith('#') ? hexcolor.slice(1) : hexcolor;

        const r = parseInt(color.substring(0, 2), 16);
        const g = parseInt(color.substring(2, 4), 16);
        const b = parseInt(color.substring(4, 6), 16);

        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

        return (yiq > 186) ? 'black' : 'white';
    };

    const highlightText = (text) => {
        if (!text) return '';

        const wordsToHighlight = [
            'FutApp',
            'Project Board',
            'Brand',
            'Design',
            'Development',
            'UI/UX',
            'Mobile App',
            'Web App',
            'Platform'
        ];

        const pattern = new RegExp(`\\b(${wordsToHighlight.join('|')})\\b`, 'gi');

        const parts = text.split(pattern);
        const result = [];

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (wordsToHighlight.some(word => word.toLowerCase() === part.toLowerCase())) {
                result.push(<strong key={i}>{part}</strong>);
            } else {
                result.push(part);
            }
        }

        return result;
    };

    useEffect(() => {
        const fetchProject = async () => {
            try {
                if (!projectId) {
                    throw new Error('No project ID provided');
                }

                const projectRef = doc(db, "projects", projectId);
                const docSnap = await getDoc(projectRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    // Convert color fields to array format
                    const colors = [
                        data.primaryColor,
                        data.secondaryColor,
                        data.accentColor
                    ].filter(color => color); // Only include non-empty colors

                    setProject({
                        id: docSnap.id,
                        ...data,
                        colors: colors.length > 0 ? colors : ['#4D92CE', '#2D2E75'],
                        features: data.features || [],
                        platforms: data.platforms || [],
                        phases: data.phases || [],
                        productImages: data.productImages || []
                    });
                } else {
                    throw new Error('Project not found');
                }
            } catch (error) {
                console.error('Error fetching project:', error);
                navigate('/404');
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectId, navigate]);

    if (loading) {
        return (
            <div className="loading">
                <h1>Loading...</h1>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="not-found">
                <h1>Project Not Found</h1>
                <button className="btn" onClick={() => navigate('/portfolio')}>
                    Back to Portfolio
                </button>
            </div>
        );
    }

    return (
        <div className="project-details">
            <div className="project-banner">
                <img src={project.banner} alt={project.name} />
            </div>

            <div className='project-details02'>
                <h1>{project.name}</h1>
                <p>{highlightText(project.intro)}</p>

                <div>
                    <h2>
                        Key Features
                    </h2>

                    <ul>
                        {project.features.map((feature, index) => (
                            <li key={index}>
                                <strong>{feature.title} - </strong>
                                {feature.description}
                            </li>
                        ))}
                    </ul>

                    {project.platforms && project.platforms.length > 0 && (
                        <div className="btn-container">
                            {project.platforms.map((platform, index) => (
                                <span key={index} className="btn">{platform}</span>
                            ))}
                        </div>
                    )}

                    {project.primaryColor && project.secondaryColor && project.accentColor && (
                        <section>
                            <div className="color-palette-container">
                                <div className="color-grid">
                                    <h2 className="color-palette-title">Colors</h2>
                                    <div className="color-block" style={{ backgroundColor: project.primaryColor }}>
                                        <span style={{ color: getContrastTextColor(project.primaryColor) }}>{project.primaryColor}</span>
                                    </div>
                                    <div className="color-block" style={{ backgroundColor: project.secondaryColor }}>
                                        <span style={{ color: getContrastTextColor(project.secondaryColor) }}>{project.secondaryColor}</span>
                                    </div>
                                    <div className="color-block" style={{ backgroundColor: project.accentColor }}>
                                        <span style={{ color: getContrastTextColor(project.accentColor) }}>{project.accentColor}</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </div>

                <h2>Prototype</h2>
                {project.prototype && (
                    <div className="prototype-container">
                        <div dangerouslySetInnerHTML={{ __html: project.prototype }} />
                    </div>
                )}

                <h2>
                    {project.type === 'mobile' ? 'Creating a mobile application involves several key phases:' : 'Creating a website involves several key phases:'}
                </h2>

                <div className='phases'>
                    <ol>
                        {project.type === 'mobile' ? (
                            <>
                                <li>
                                    Concept & Planning
                                    <span> - Defining the app's purpose, features, and target audience. Gathering requirements and sketching out initial ideas.</span>
                                </li>
                                <li>
                                    UI/UX Design
                                    <span> - Designing an intuitive and visually appealing interface that ensures a seamless user experience for owners, visitors, and service providers.</span>
                                </li>
                                <li>
                                    Development & Testing
                                    <span> - Writing the code, integrating features like gate pass management, community news updates, reservations, and complaints. Conducting thorough testing to ensure functionality, security, and reliability.</span>
                                </li>
                                <li>
                                    Deployment & Publishing
                                    <span> - Preparing the application for release on the relevant platforms (iOS, Android, web). Setting up backend services, analytics, and security measures. Publishing the app and promoting it to the users.</span>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    Discovery & Planning
                                    <span> - Understanding your business needs, target audience, and goals. Creating a detailed project roadmap and content strategy.</span>
                                </li>
                                <li>
                                    Design & Wireframing
                                    <span> - Creating visual designs and wireframes that align with your brand identity. Developing a responsive layout that works across all devices.</span>
                                </li>
                                <li>
                                    Development & Integration
                                    <span> - Building the website using modern technologies. Implementing features, content management systems, and third-party integrations.</span>
                                </li>
                                <li>
                                    Testing & Launch
                                    <span> - Conducting thorough testing for functionality, performance, and security. Deploying the website and ensuring everything runs smoothly.</span>
                                </li>
                            </>
                        )}
                    </ol>
                </div>

                {project.productImages && project.productImages.length > 0 && (
                    <div className={`product-images ${project.type === 'website' ? 'website-img' : ''}`}>
                        <h2>Product Images</h2>
                        {project.productImages.map((image, index) => (
                            <img key={index} src={image} alt={`Product ${index + 1}`} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProjectDetails; 