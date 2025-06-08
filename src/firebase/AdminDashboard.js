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

    const [isAddingProject, setIsAddingProject] = useState(false); // State for modal visibility
    const [editingProject, setEditingProject] = useState(null); // State to hold project being edited

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
        image: 'https://via.placeholder.com/400x250?text=Project+Image', // Dummy image
        banner: 'https://via.placeholder.com/1200x400?text=Banner+Image', // Dummy banner
        features: [],
        technologies: [],
        platforms: [],
        type: 'mobile',
        collection: 'portfolio',
        visible: true,
        status: 'draft' // New field to track project status
    });
    const [newFeature, setNewFeature] = useState({ title: '', description: '' });
    const [newPlatform, setNewPlatform] = useState('');

    // Add new state for preview
    const [previewMode, setPreviewMode] = useState(false);
    const [previewCollection, setPreviewCollection] = useState('portfolio');

    // Add validation state
    const [validationErrors, setValidationErrors] = useState({});

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

    const validateForm = () => {
        const errors = {};
        if (!formData.name) errors.name = 'Project name is required';
        if (!formData.category) errors.category = 'Category is required';
        if (!formData.description) errors.description = 'Description is required';
        if (!formData.image) errors.image = 'Main image is required';
        if (formData.features.length === 0) errors.features = 'At least one feature is required';
        if (formData.technologies.length === 0) errors.technologies = 'At least one technology is required';
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleEdit = (project) => {
        setEditingProject(project);
        setFormData({
            name: project.name,
            category: project.category,
            description: project.description,
            image: project.image || 'https://via.placeholder.com/400x250?text=Project+Image', // Fallback to dummy
            banner: project.banner || 'https://via.placeholder.com/1200x400?text=Banner+Image', // Fallback to dummy
            features: project.features || [],
            technologies: project.technologies || [],
            platforms: project.platforms || [],
            type: project.type,
            collection: project.collection,
            visible: project.visible,
            status: project.status || 'draft'
        });
        setIsAddingProject(true);
    };

    const handleToggleVisibility = async (projectId, currentVisibility) => {
        try {
            const projectRef = doc(db, 'projects', projectId);
            await updateDoc(projectRef, { visible: !currentVisibility, status: !currentVisibility ? 'published' : 'draft' });
            setSuccessMessage('Project visibility updated successfully!');
            await fetchProjects();
        } catch (error) {
            console.error('Error toggling visibility:', error);
            setErrorMessage('Failed to update project visibility');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setErrorMessage('Please fill in all required fields');
            return;
        }

        setLoading(true);
        setSuccessMessage(null);
        setErrorMessage(null);
        setError(null);

        try {
            const projectData = {
                ...formData,
                updatedAt: new Date().toISOString()
            };

            if (editingProject) {
                // Update existing project
                const projectRef = doc(db, 'projects', editingProject.id);
                await updateDoc(projectRef, projectData);
                setSuccessMessage('Project updated successfully!');
            } else {
                // Add new project
                projectData.createdAt = new Date().toISOString();
                await addDoc(collection(db, 'projects'), projectData);
                setSuccessMessage('Project added successfully!');
            }
            
            // Reset form and close it
            setFormData({
                name: '',
                category: '',
                description: '',
                image: 'https://via.placeholder.com/400x250?text=Project+Image', // Dummy image
                banner: 'https://via.placeholder.com/1200x400?text=Banner+Image', // Dummy banner
                features: [],
                technologies: [],
                platforms: [],
                type: 'mobile',
                collection: 'portfolio',
                visible: true,
                status: 'draft'
            });
            setIsAddingProject(false); 
            setEditingProject(null); // Clear editing state
            
            // Refresh projects list
            await fetchProjects();
        } catch (error) {
            console.error(editingProject ? 'Error updating project:' : 'Error adding project:', error);
            setErrorMessage(editingProject ? 'Failed to update project' : 'Failed to add project');
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

    // Add preview component
    const renderPreview = () => {
        if (!previewMode) return null;

        return (
            <div className="preview-container">
                <div className="preview-header">
                    <h3>Preview</h3>
                    <div className="preview-tabs">
                        <button 
                            className={previewCollection === 'portfolio' ? 'active' : ''}
                            onClick={() => setPreviewCollection('portfolio')}
                        >
                            Portfolio View
                        </button>
                        <button 
                            className={previewCollection === 'products' ? 'active' : ''}
                            onClick={() => setPreviewCollection('products')}
                        >
                            Products View
                        </button>
                    </div>
                </div>
                <div className="preview-content">
                    <div className="preview-project">
                        <h2>{formData.name || 'Project Name'}</h2>
                        <span>{formData.category || 'Category'}</span>
                        <p>{formData.description || 'Description'}</p>
                        {formData.image && (
                            <div className="preview-image">
                                <img src={formData.image} alt="Preview" />
                            </div>
                        )}
                        {formData.features.length > 0 && (
                            <div className="preview-features">
                                <h4>Features:</h4>
                                <ul>
                                    {formData.features.map((feature, index) => (
                                        <li key={index}>
                                            <strong>{feature.title}</strong>: {feature.description}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    // Modify the form JSX to include new improvements
    const renderForm = () => {
        if (!isAddingProject) return null;

        return (
            <div className="admin-form-container">
                <div className="form-header">
                    <h2>{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
                    <div className="form-actions">
                        <button 
                            className="preview-btn"
                            onClick={() => setPreviewMode(!previewMode)}
                        >
                            {previewMode ? 'Hide Preview' : 'Show Preview'}
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="form-section">
                        <h3>Basic Information</h3>
                        <div className="form-group">
                            <label>
                                Project Name *
                                {validationErrors.name && <span className="error">{validationErrors.name}</span>}
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                placeholder="Enter project name"
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                Category *
                                {validationErrors.category && <span className="error">{validationErrors.category}</span>}
                            </label>
                            <input
                                type="text"
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                                placeholder="Enter project category"
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                Description *
                                {validationErrors.description && <span className="error">{validationErrors.description}</span>}
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                placeholder="Enter project description"
                            />
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>Project Type & Visibility</h3>
                        <div className="form-group">
                            <label>Project Type</label>
                            <div className="radio-group">
                                <label>
                                    <input
                                        type="radio"
                                        value="mobile"
                                        checked={formData.type === 'mobile'}
                                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                                    />
                                    Mobile Application
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="website"
                                        checked={formData.type === 'website'}
                                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                                    />
                                    Website
                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Collection</label>
                            <div className="collection-selector">
                                <div 
                                    className={`collection-option ${formData.collection === 'portfolio' ? 'active' : ''}`}
                                    onClick={() => setFormData({...formData, collection: 'portfolio'})}
                                >
                                    <h4>Portfolio</h4>
                                    <p>Showcase your work in the portfolio section</p>
                                </div>
                                <div 
                                    className={`collection-option ${formData.collection === 'products' ? 'active' : ''}`}
                                    onClick={() => setFormData({...formData, collection: 'products'})}
                                >
                                    <h4>Products</h4>
                                    <p>List your product in the products section</p>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Visibility</label>
                            <div className="visibility-toggle">
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={formData.visible}
                                        onChange={(e) => setFormData({...formData, visible: e.target.checked})}
                                    />
                                    <span className="slider"></span>
                                </label>
                                <span>{formData.visible ? 'Published' : 'Draft'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>Media</h3>
                        <div className="form-group">
                            <label>Banner Image URL</label>
                            <input
                                type="url"
                                value={formData.banner}
                                onChange={(e) => setFormData({ ...formData, banner: e.target.value })}
                                placeholder="https://example.com/banner.jpg"
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                Project Image URL *
                                {validationErrors.image && <span className="error">{validationErrors.image}</span>}
                            </label>
                            <input
                                type="url"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                placeholder="https://example.com/project.jpg"
                            />
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>Features *</h3>
                        {validationErrors.features && <span className="error">{validationErrors.features}</span>}
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
                        <h3>Technologies *</h3>
                        {validationErrors.technologies && <span className="error">{validationErrors.technologies}</span>}
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
                            {loading ? 'Saving...' : editingProject ? 'Update Project' : 'Save Project'}
                        </button>
                        <button type="button" className="cancel-btn" onClick={() => {
                            setIsAddingProject(false);
                            setEditingProject(null);
                            setFormData({
                                name: '',
                                category: '',
                                description: '',
                                image: 'https://via.placeholder.com/400x250?text=Project+Image', // Dummy image
                                banner: 'https://via.placeholder.com/1200x400?text=Banner+Image', // Dummy banner
                                features: [],
                                technologies: [],
                                platforms: [],
                                type: 'mobile',
                                collection: 'portfolio',
                                visible: true,
                                status: 'draft'
                            });
                        }}>
                            Cancel
                        </button>
                    </div>
                </form>

                {renderPreview()}
            </div>
        );
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>

            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            {isAddingProject ? (
                renderForm()
            ) : (
                <>
                    <div className="dashboard-controls">
                        <button className="add-btn" onClick={() => {
                            setFormData({
                                name: '',
                                category: '',
                                description: '',
                                image: 'https://via.placeholder.com/400x250?text=Project+Image', // Dummy image
                                banner: 'https://via.placeholder.com/1200x400?text=Banner+Image', // Dummy banner
                                features: [],
                                technologies: [],
                                platforms: [],
                                type: 'mobile', 
                                collection: 'portfolio', 
                                visible: true,
                                status: 'draft'
                            });
                            setIsAddingProject(true);
                            setEditingProject(null);
                        }}>
                            Add New Project
                        </button>

                        <div className="filter-sections">
                            <h3>View Projects By:</h3>
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
                        </div>
                    </div>

                    <div className="project-list-section">
                        {listLoading ? (
                            <div className="loading">Loading projects...</div>
                        ) : errorMessage ? (
                            <div className="error-message">{errorMessage}</div>
                        ) : (
                            <>
                                <h2 className="section-title">
                                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} - {activeType === 'mobile' ? 'Mobile Applications' : 'Websites'}
                                </h2>
                                {projectsList.length > 0 ? (
                                    <div className="projects-grid">
                                        {projectsList.map((project) => (
                                            <div key={project.id} className="project-card">
                                                <img src={project.image} alt={project.name} className="project-image" />
                                                <div className="project-info">
                                                    <h3>{project.name}</h3>
                                                    <p className="project-category">{project.category}</p>
                                                    <p className="project-description">{project.description}</p>
                                                    <div className="project-actions">
                                                        <button onClick={() => handleEdit(project)} className="edit-btn">Edit</button>
                                                        <button onClick={() => handleDelete(project.id)} className="delete-btn">Delete</button>
                                                        <button
                                                            onClick={() => handleToggleVisibility(project.id, project.visible)}
                                                            className={`visibility-btn ${project.visible ? 'visible' : 'hidden'}`}
                                                        >
                                                            {project.visible ? 'Hide' : 'Show'}
                                                        </button>
                                                        <span className={`project-status ${project.status}`}>{project.status}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="no-projects">No projects found for this category.</div>
                                )}
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default AdminDashboard; 