import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';
import './AdminStyles.css'; // Import admin specific styles

function AdminDashboard() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for modal visibility

    // Basic Project Info
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [intro, setIntro] = useState('');
    
    // Images
    const [homeImage, setHomeImage] = useState('');
    const [bannerImage, setBannerImage] = useState('');
    const [projectImages, setProjectImages] = useState([]);
    const [newProjectImage, setNewProjectImage] = useState('');
    const [imageAlignment, setImageAlignment] = useState('right');
    
    // Technologies and Features
    const [technologies, setTechnologies] = useState([]);
    const [newTechnology, setNewTechnology] = useState('');
    const [features, setFeatures] = useState([]);
    const [newFeatureTitle, setNewFeatureTitle] = useState('');
    const [newFeatureDescription, setNewFeatureDescription] = useState('');
    
    // Colors
    const [primaryColor, setPrimaryColor] = useState('#4D92CE');
    const [secondaryColor, setSecondaryColor] = useState('#2D2E75');
    const [accentColor, setAccentColor] = useState('#8548FB');

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [error, setError] = useState(null); // Add error state

    const [projectsList, setProjectsList] = useState([]); // State to hold the list of projects
    const [listLoading, setListLoading] = useState(true); // Loading state for the list

    // Fetch projects list on component mount and after adding/updating
    const fetchProjects = async () => {
        setListLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "projects"));
            const projectsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProjectsList(projectsArray);
        } catch (error) {
            console.error('Error fetching projects: ', error);
            if (error.code === 'permission-denied') {
                setError('Permission denied. Please make sure you are logged in and have the correct permissions.');
            } else {
                setError('Error loading projects. Please try again later.');
            }
        } finally {
            setListLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []); // Empty dependency array to fetch once on mount

    const handleAddTechnology = () => {
        if (newTechnology.trim() !== '') {
            setTechnologies([...technologies, newTechnology]);
            setNewTechnology('');
        }
    };

    const handleAddFeature = () => {
        if (newFeatureTitle.trim() !== '' && newFeatureDescription.trim() !== '') {
            setFeatures([...features, {
                title: newFeatureTitle,
                description: newFeatureDescription
            }]);
            setNewFeatureTitle('');
            setNewFeatureDescription('');
        }
    };

    const handleAddProjectImage = () => {
        if (newProjectImage.trim() !== '') {
            setProjectImages([...projectImages, {
                url: newProjectImage,
                type: 'phase' // Default type
            }]);
            setNewProjectImage('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage(null);
        setErrorMessage(null);
        setError(null);

        const newProject = {
            name,
            category,
            description,
            intro,
            homeImage,
            bannerImage,
            projectImages,
            imageAlignment,
            technologies,
            features,
            colors: {
                primary: primaryColor,
                secondary: secondaryColor,
                accent: accentColor
            },
            visible: true,
            createdAt: new Date()
        };

        try {
            await addDoc(collection(db, 'projects'), newProject);
            setSuccessMessage('Project added successfully!');
            // Reset form fields
            setName('');
            setCategory('');
            setDescription('');
            setIntro('');
            setHomeImage('');
            setBannerImage('');
            setProjectImages([]);
            setImageAlignment('right');
            setTechnologies([]);
            setFeatures([]);
            setPrimaryColor('#4D92CE');
            setSecondaryColor('#2D2E75');
            setAccentColor('#8548FB');
            setIsAddModalOpen(false);

            fetchProjects();
        } catch (error) {
            console.error('Error adding document: ', error);
            if (error.code === 'permission-denied') {
                setErrorMessage('Permission denied. Please make sure you are logged in and have the correct permissions.');
            } else {
                setErrorMessage('Error adding project. Please try again.');
            }
            setError('Failed to add project. Please check your authentication status.');
        } finally {
            setLoading(false);
        }
    };

    // Handle visibility toggle
    const handleToggleVisibility = async (projectId, currentVisibility) => {
        try {
            const projectRef = doc(db, "projects", projectId);
            await updateDoc(projectRef, {
                visible: !currentVisibility
            });
            setProjectsList(projectsList.map(project => 
                project.id === projectId ? { ...project, visible: !currentVisibility } : project
            ));
        } catch (error) {
            console.error('Error toggling visibility: ', error);
            if (error.code === 'permission-denied') {
                setError('Permission denied. Please make sure you are logged in and have the correct permissions.');
            } else {
                setError('Error updating project visibility. Please try again.');
            }
        }
    };

    return (
        <div className="admin-dashboard-container">
            <h1>Admin Dashboard</h1>

            <button className="add-project-btn" onClick={() => setIsAddModalOpen(true)}>Add New Project</button>

            {/* Add Project Modal */}
            {isAddModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                         <span className="close-button" onClick={() => setIsAddModalOpen(false)}>&times;</span>
                        <form onSubmit={handleSubmit} className="admin-form">
                            <h2>Add New Project</h2>
                            
                            {/* Basic Project Info */}
                            <div className="form-section">
                                <h3>Basic Information</h3>
                                <div className="form-group">
                                    <label>Project Name:</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Category:</label>
                                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Introduction:</label>
                                    <textarea value={intro} onChange={(e) => setIntro(e.target.value)} required></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Description:</label>
                                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                                </div>
                            </div>

                            {/* Images Section */}
                            <div className="form-section">
                                <h3>Images</h3>
                                <div className="form-group">
                                    <label>Home Image URL:</label>
                                    <input type="text" value={homeImage} onChange={(e) => setHomeImage(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Banner Image URL:</label>
                                    <input type="text" value={bannerImage} onChange={(e) => setBannerImage(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Project Images:</label>
                                    <div className="project-images-list">
                                        {projectImages.map((image, index) => (
                                            <div key={index} className="project-image-item">
                                                <img src={image.url} alt={`Project image ${index + 1}`} />
                                                <button type="button" onClick={() => setProjectImages(projectImages.filter((_, i) => i !== index))}>Remove</button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="array-input-group">
                                        <input type="text" value={newProjectImage} onChange={(e) => setNewProjectImage(e.target.value)} placeholder="Add project image URL" />
                                        <button type="button" onClick={handleAddProjectImage}>Add Image</button>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Image Alignment:</label>
                                    <select value={imageAlignment} onChange={(e) => setImageAlignment(e.target.value)}>
                                        <option value="right">Right</option>
                                        <option value="left">Left</option>
                                        <option value="center">Center</option>
                                    </select>
                                </div>
                            </div>

                            {/* Technologies Section */}
                            <div className="form-section">
                                <h3>Technologies</h3>
                                <div className="form-group">
                                    <label>Technologies Used:</label>
                                    <div className="tech-tags">
                                        {technologies.map((tech, index) => (
                                            <span key={index} className="tech-tag">
                                                {tech}
                                                <button type="button" onClick={() => setTechnologies(technologies.filter((_, i) => i !== index))}>×</button>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="array-input-group">
                                        <input type="text" value={newTechnology} onChange={(e) => setNewTechnology(e.target.value)} placeholder="Add technology" />
                                        <button type="button" onClick={handleAddTechnology}>Add</button>
                                    </div>
                                </div>
                            </div>

                            {/* Features Section */}
                            <div className="form-section">
                                <h3>Key Features</h3>
                                <div className="form-group">
                                    <label>Features:</label>
                                    <div className="features-list">
                                        {features.map((feature, index) => (
                                            <div key={index} className="feature-item">
                                                <h4>{feature.title}</h4>
                                                <p>{feature.description}</p>
                                                <button type="button" onClick={() => setFeatures(features.filter((_, i) => i !== index))}>Remove</button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="feature-input-group">
                                        <input type="text" value={newFeatureTitle} onChange={(e) => setNewFeatureTitle(e.target.value)} placeholder="Feature title" />
                                        <textarea value={newFeatureDescription} onChange={(e) => setNewFeatureDescription(e.target.value)} placeholder="Feature description"></textarea>
                                        <button type="button" onClick={handleAddFeature}>Add Feature</button>
                                    </div>
                                </div>
                            </div>

                            {/* Colors Section */}
                            <div className="form-section">
                                <h3>Color Scheme</h3>
                                <div className="color-inputs">
                                    <div className="form-group">
                                        <label>Primary Color:</label>
                                        <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
                                        <input type="text" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Secondary Color:</label>
                                        <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} />
                                        <input type="text" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Accent Color:</label>
                                        <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} />
                                        <input type="text" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="submit-btn" disabled={loading}>{loading ? 'Adding...' : 'Add Project'}</button>
                            {successMessage && <p className="success-message">{successMessage}</p>}
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                             {error && <p className="error-message">{error}</p>}
                        </form>
                    </div>
                </div>
            )}

            <div className="projects-list-admin">
                <h2>Existing Projects</h2>
                {listLoading ? (
                    <p>Loading projects...</p>
                ) : projectsList.length === 0 ? (
                    <p>No projects added yet.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Visible</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projectsList.map(project => (
                                <tr key={project.id}>
                                    <td>{project.name}</td>
                                    <td>{project.category}</td>
                                    <td>
                                        <input 
                                            type="checkbox" 
                                            checked={project.visible || false}
                                            onChange={() => handleToggleVisibility(project.id, project.visible || false)}
                                        />
                                    </td>
                                    <td>
                                        <button className="edit-btn">Edit</button>
                                        <button className="delete-btn">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard; 