import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import './AdminStyles.css'; // Import admin specific styles

function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('portfolio'); // 'portfolio' or 'products'
    const [activeType, setActiveType] = useState('mobile'); // 'mobile' or 'websites'
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [intro, setIntro] = useState('');
    
    // Images
    const [homeImage, setHomeImage] = useState('');
    const [bannerImage, setBannerImage] = useState('');
    const [projectImages, setProjectImages] = useState([]);
    const [newImageUrl, setNewImageUrl] = useState('');
    const [imageAlignment, setImageAlignment] = useState('right');
    
    // Technologies and Features
    const [technologies, setTechnologies] = useState([]);
    const [newTech, setNewTech] = useState('');
    const [features, setFeatures] = useState([]);
    const [newFeatureTitle, setNewFeatureTitle] = useState('');
    const [newFeatureDesc, setNewFeatureDesc] = useState('');
    
    // Colors
    const [primaryColor, setPrimaryColor] = useState('#4D92CE');
    const [secondaryColor, setSecondaryColor] = useState('#2D2E75');
    const [accentColor, setAccentColor] = useState('#8548FB');

    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [error, setError] = useState(null); // Add error state

    const [projectsList, setProjectsList] = useState([]); // State to hold the list of projects
    const [listLoading, setListLoading] = useState(false); // Loading state for the list

    const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for modal visibility

    // Input states for dynamic fields
    const [newProjectImage, setNewProjectImage] = useState('');
    const [newTechnology, setNewTechnology] = useState('');
    const [newFeatureDescription, setNewFeatureDescription] = useState('');

    const [projects, setProjects] = useState({
        portfolio: { mobile: [], websites: [] },
        products: { mobile: [], websites: [] }
    });
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        description: '',
        image: '',
        banner: '',
        features: [],
        technologies: [],
        platforms: [],
        type: 'mobile',
        collection: 'portfolio',
        visible: true
    });
    const [newFeature, setNewFeature] = useState({ title: '', description: '' });
    const [newPlatform, setNewPlatform] = useState('');

    const fetchProjects = useCallback(async () => {
        setListLoading(true);
        try {
            const projectsRef = collection(db, 'projects');
            const snapshot = await getDocs(projectsRef);
            const projectsData = {
                portfolio: { mobile: [], websites: [] },
                products: { mobile: [], websites: [] }
            };

            snapshot.forEach((doc) => {
                const project = { id: doc.id, ...doc.data() };
                const collection = project.collection || 'portfolio';
                const type = project.type || 'mobile';
                projectsData[collection][type === 'mobile' ? 'mobile' : 'websites'].push(project);
            });

            setProjects(projectsData);
            setProjectsList(projectsData[activeTab][activeType]);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching projects:', error);
            setErrorMessage('Failed to fetch projects');
            setLoading(false);
        } finally {
            setListLoading(false);
        }
    }, [activeTab, activeType]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const handleAddTechnology = () => {
        if (newTech.trim()) {
            setTechnologies([...technologies, newTech.trim()]);
            setNewTech('');
        }
    };

    const handleRemoveTechnology = (index) => {
        setTechnologies(technologies.filter((_, i) => i !== index));
    };

    const handleAddFeature = () => {
        if (newFeatureTitle.trim() && newFeatureDesc.trim()) {
            setFeatures([...features, {
                title: newFeatureTitle.trim(),
                description: newFeatureDesc.trim()
            }]);
            setNewFeatureTitle('');
            setNewFeatureDesc('');
        }
    };

    const handleRemoveFeature = (index) => {
        setFeatures(features.filter((_, i) => i !== index));
    };

    const handleAddProjectImage = () => {
        if (newImageUrl.trim()) {
            setProjectImages([...projectImages, newImageUrl.trim()]);
            setNewImageUrl('');
        }
    };

    const handleRemoveProjectImage = (index) => {
        setProjectImages(projectImages.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage(null);
        setErrorMessage(null);
        setError(null);

        try {
            const projectData = {
                ...formData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            const docRef = await addDoc(collection(db, 'projects'), projectData);
            setSuccessMessage('Project added successfully!');
            
            // Reset form
            setFormData({
                name: '',
                category: '',
                description: '',
                image: '',
                banner: '',
                features: [],
                technologies: [],
                platforms: [],
                type: 'mobile',
                collection: 'portfolio',
                visible: true
            });
            setShowForm(false);
            
            // Refresh projects list
            await fetchProjects();
        } catch (error) {
            console.error('Error adding project:', error);
            setErrorMessage('Failed to add project');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (projectId) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await deleteDoc(doc(db, 'projects', projectId));
                setSuccessMessage('Project deleted successfully!');
                await fetchProjects();
            } catch (error) {
                console.error('Error deleting project:', error);
                setErrorMessage('Failed to delete project');
            }
        }
    };

    const addFeature = () => {
        if (newFeature.title && newFeature.description) {
            setFormData({
                ...formData,
                features: [...formData.features, newFeature]
            });
            setNewFeature({ title: '', description: '' });
        }
    };

    const removeFeature = (index) => {
        setFormData({
            ...formData,
            features: formData.features.filter((_, i) => i !== index)
        });
    };

    const addTech = () => {
        if (newTech) {
            setFormData({
                ...formData,
                technologies: [...formData.technologies, newTech]
            });
            setNewTech('');
        }
    };

    const removeTech = (index) => {
        setFormData({
            ...formData,
            technologies: formData.technologies.filter((_, i) => i !== index)
        });
    };

    const addPlatform = () => {
        if (newPlatform) {
            setFormData({
                ...formData,
                platforms: [...formData.platforms, newPlatform]
            });
            setNewPlatform('');
        }
    };

    const removePlatform = (index) => {
        setFormData({
            ...formData,
            platforms: formData.platforms.filter((_, i) => i !== index)
        });
    };

    const resetForm = () => {
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
        setNewImageUrl('');
        setNewTech('');
        setNewFeatureTitle('');
        setNewFeatureDesc('');
    };

    // Handle visibility toggle
    const handleToggleVisibility = async (projectId, currentVisibility) => {
        try {
            await updateDoc(doc(db, 'projects', projectId), {
                visible: !currentVisibility,
                updatedAt: new Date().toISOString()
            });
            setSuccessMessage('Project visibility updated successfully!');
            await fetchProjects();
        } catch (error) {
            console.error('Error updating project visibility:', error);
            setErrorMessage('Failed to update project visibility');
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>

            <div className="tab-buttons">
                <button 
                    className={activeTab === 'portfolio' ? 'active' : ''} 
                    onClick={() => setActiveTab('portfolio')}
                >
                    Portfolio
                </button>
                <button 
                    className={activeTab === 'products' ? 'active' : ''} 
                    onClick={() => setActiveTab('products')}
                >
                    Products
                </button>
            </div>

            <div className="type-buttons">
                <button 
                    className={activeType === 'mobile' ? 'active' : ''} 
                    onClick={() => setActiveType('mobile')}
                >
                    Mobile Applications
                </button>
                <button 
                    className={activeType === 'websites' ? 'active' : ''} 
                    onClick={() => setActiveType('websites')}
                >
                    Websites
                </button>
            </div>

            <button className="add-btn" onClick={() => {
                setFormData(prev => ({ ...prev, collection: activeTab, type: activeType }));
                setShowForm(true);
            }}>
                Add New {activeTab === 'portfolio' ? 'Portfolio' : 'Product'} Project
            </button>

            {showForm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Add New {activeTab === 'portfolio' ? 'Portfolio' : 'Product'} Project</h2>
                            <button className="close-btn" onClick={() => setShowForm(false)}>×</button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-section">
                                <h3>Basic Information</h3>
                                <div className="form-group">
                                    <label>Project Type</label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        required
                                    >
                                        <option value="mobile">Mobile Application</option>
                                        <option value="website">Website</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Visibility</label>
                                    <select
                                        value={formData.visible}
                                        onChange={(e) => setFormData({ ...formData, visible: e.target.value === 'true' })}
                                        required
                                    >
                                        <option value="true">Visible</option>
                                        <option value="false">Hidden</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Project Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <input
                                        type="text"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-section">
                                <h3>Media</h3>
                                <div className="form-group">
                                    <label>Banner Image URL</label>
                                    <input
                                        type="text"
                                        value={formData.banner}
                                        onChange={(e) => setFormData({ ...formData, banner: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Project Image URL</label>
                                    <input
                                        type="text"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-section">
                                <h3>Features</h3>
                                <div className="feature-input-group">
                                    <input
                                        type="text"
                                        placeholder="Feature Title"
                                        value={newFeature.title}
                                        onChange={(e) => setNewFeature({ ...newFeature, title: e.target.value })}
                                    />
                                    <textarea
                                        placeholder="Feature Description"
                                        value={newFeature.description}
                                        onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
                                    />
                                    <button type="button" onClick={addFeature}>Add Feature</button>
                                </div>
                                <div className="features-list">
                                    {formData.features.map((feature, index) => (
                                        <div key={index} className="feature-item">
                                            <h4>{feature.title}</h4>
                                            <p>{feature.description}</p>
                                            <button type="button" onClick={() => removeFeature(index)}>Remove</button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="form-section">
                                <h3>Technologies</h3>
                                <div className="array-input-group">
                                    <input
                                        type="text"
                                        placeholder="Add Technology"
                                        value={newTech}
                                        onChange={(e) => setNewTech(e.target.value)}
                                    />
                                    <button type="button" onClick={addTech}>Add</button>
                                </div>
                                <div className="tech-tags">
                                    {formData.technologies.map((tech, index) => (
                                        <span key={index} className="tech-tag">
                                            {tech}
                                            <button type="button" onClick={() => removeTech(index)}>×</button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="form-section">
                                <h3>Platforms</h3>
                                <div className="array-input-group">
                                    <input
                                        type="text"
                                        placeholder="Add Platform"
                                        value={newPlatform}
                                        onChange={(e) => setNewPlatform(e.target.value)}
                                    />
                                    <button type="button" onClick={addPlatform}>Add</button>
                                </div>
                                <div className="tech-tags">
                                    {formData.platforms.map((platform, index) => (
                                        <span key={index} className="tech-tag">
                                            {platform}
                                            <button type="button" onClick={() => removePlatform(index)}>×</button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="submit-btn" disabled={loading}>
                                    Add Project
                                </button>
                                <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {error && <div className="error-message">{error}</div>}

            <div className="projects-list">
                <h2>{activeTab === 'portfolio' ? 'Portfolio' : 'Products'} - {activeType === 'mobile' ? 'Mobile Applications' : 'Websites'}</h2>
                {listLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="projects-grid">
                        {projectsList.map(project => (
                            <div key={project.id} className="project-card">
                                <img src={project.image} alt={project.name} />
                                <h3>{project.name}</h3>
                                <p>{project.category}</p>
                                <div className="project-actions">
                                    <button onClick={() => handleToggleVisibility(project.id, project.visible)}>
                                        {project.visible ? 'Hide' : 'Show'}
                                    </button>
                                    <button onClick={() => handleDelete(project.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard; 