import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebaseConfig'; // Import db

function ProjectDetails() {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                if (!projectId) {
                    setProject(null);
                    setLoading(false);
                    return;
                }
                const projectRef = doc(db, "projects", projectId);
                const docSnap = await getDoc(projectRef);

                if (docSnap.exists()) {
                    setProject({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.log("No such document!");
                    setProject(null); // Project not found
                }
            } catch (error) {
                console.error('Error fetching project:', error);
                setProject(null); // Set project to null on error
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

    if (!project) {
        return (
            <div className="project-not-found">
                <h1>Project Not Found</h1>
                <button onClick={() => navigate('/portfolio')} className="btn">
                    <span>←</span> Back to Portfolio
                </button>
            </div>
        );
    }

    return (
        <div className="project-details">
            {project.banner && (
                <div className="project-banner">
                    <img src={project.banner} alt={`${project.name} Banner`} />
                </div>
            )}
            <div className="project-header">
                <button onClick={() => navigate('/portfolio')} className="back-btn">
                    <span>←</span> Back to Portfolio
                </button>
                <h1>{project.name}</h1>
                <span className="category">{project.category}</span>
            </div>

            <div className="project-content">
                {project.intro && (
                    <div className="project-intro">
                        <p>{project.intro}</p>
                    </div>
                )}
                <div className="project-image">
                    <img src={project.image} alt={project.name} />
                </div>

                <div className="project-info">
                    <div className="description">
                        <h2>About the Project</h2>
                        <p>{project.description}</p>
                    </div>

                    {project.primaryColor && project.secondaryColor && project.accentColor && (
                        <div className="project-colors">
                            <h2>Colors</h2>
                            <div className="color-palette">
                                <div className="color-box" style={{ backgroundColor: project.primaryColor }}>
                                    <span>{project.primaryColor}</span>
                                </div>
                                <div className="color-box" style={{ backgroundColor: project.secondaryColor }}>
                                    <span>{project.secondaryColor}</span>
                                </div>
                                <div className="color-box" style={{ backgroundColor: project.accentColor }}>
                                    <span>{project.accentColor}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {project.features && project.features.length > 0 && (
                        <div className="features">
                            <h2>Key Features</h2>
                            <ul>
                                {project.features.map((feature, index) => (
                                    <li key={index}>
                                        <strong>{feature.title}</strong>: {feature.description}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {project.technologies && project.technologies.length > 0 && (
                        <div className="technologies">
                            <h2>Technologies Used</h2>
                            <div className="tech-tags">
                                {project.technologies.map((tech, index) => (
                                    <span key={index} className="tech-tag">{tech}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {project.platforms && project.platforms.length > 0 && (
                        <div className="platforms">
                            <h2>Available Platforms</h2>
                            <div className="platform-tags">
                                {project.platforms.map((platform, index) => (
                                    <span key={index} className="platform-tag">{platform}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {project.projectImages && project.projectImages.length > 0 && (
                        <div className="project-gallery">
                            <h2>More Images</h2>
                            <div className="gallery-grid">
                                {project.projectImages.map((imgUrl, index) => (
                                    <div key={index} className="gallery-item">
                                        <img src={imgUrl} alt={`${project.name} - Image ${index + 1}`} />
                                    </div>
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