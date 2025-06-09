import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';

function ProjectDetails() {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { projectId } = useParams();
    const navigate = useNavigate();

    // Function to highlight specific words in text
    const highlightText = (text) => {
        if (!text) return '';

        // Words to highlight (you can modify this array based on your needs)
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

        // Create a regex pattern that matches any of the words
        const pattern = new RegExp(`\\b(${wordsToHighlight.join('|')})\\b`, 'gi');

        // Split the text into parts and wrap matching words in <strong> tags
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
                    setProject({ id: docSnap.id, ...docSnap.data() });
                } else {
                    throw new Error('Project not found');
                }
            } catch (error) {
                console.error('Error fetching project:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectId]);

    if (loading) {
        return (
            <div className="loading">
                <h1>Loading Project Details...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error">
                <h1>Error Loading Project</h1>
                <p>{error}</p>
                <button onClick={() => navigate('/portfolio')}>
                    Back to Portfolio
                </button>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="not-found">
                <h1>Project Not Found</h1>
                <button onClick={() => navigate('/portfolio')}>
                    Back to Portfolio
                </button>
            </div>
        );
    }

    return (
        <div className="project-details">
            <div className='project-banner'>
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

                    {/* Main Content */}
                    <main>
                        {/* Project Overview */}
                        <section>
                            <h2>Overview</h2>
                            <p>{project.intro}</p>
                        </section>

                        {/* Project Image */}
                        <section>
                            <img
                                src={project.image}
                                alt={project.name}
                            />
                        </section>

                        {/* Project Description */}
                        <section>
                            <h2>About the Project</h2>
                            <p>{project.description}</p>
                        </section>

                        {/* Color Palette */}
                        {project.primaryColor && project.secondaryColor && project.accentColor && (
                            <section>
                                <h2>Color Palette</h2>
                                <div className="color-palette">
                                    <div style={{ backgroundColor: project.primaryColor }}>
                                        <span>{project.primaryColor}</span>
                                    </div>
                                    <div style={{ backgroundColor: project.secondaryColor }}>
                                        <span>{project.secondaryColor}</span>
                                    </div>
                                    <div style={{ backgroundColor: project.accentColor }}>
                                        <span>{project.accentColor}</span>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Key Features */}
                        {project.features && project.features.length > 0 && (
                            <section>
                                <h2>Key Features</h2>
                                <ul>
                                    {project.features.map((feature, index) => (
                                        <li key={index}>
                                            <strong>{feature.title}</strong>
                                            <p>{feature.description}</p>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Technologies */}
                        {project.technologies && project.technologies.length > 0 && (
                            <section>
                                <h2>Technologies Used</h2>
                                <div className="tech-list">
                                    {project.technologies.map((tech, index) => (
                                        <span key={index}>{tech}</span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Platforms */}
                        {project.platforms && project.platforms.length > 0 && (
                            <section>
                                <h2>Available Platforms</h2>
                                <div className="platform-list">
                                    {project.platforms.map((platform, index) => (
                                        <span key={index}>{platform}</span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Project Gallery */}
                        {project.projectImages && project.projectImages.length > 0 && (
                            <section>
                                <h2>Project Gallery</h2>
                                <div className="gallery">
                                    {project.projectImages.map((imgUrl, index) => (
                                        <div key={index}>
                                            <img
                                                src={imgUrl}
                                                alt={`${project.name} - Image ${index + 1}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetails; 