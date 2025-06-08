import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import './AdminStyles.css'; // Import admin specific styles

function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('portfolio'); // 'portfolio' or 'products'
    const [activeType, setActiveType] = useState('mobile'); // 'mobile' or 'websites'

    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const [projectsList, setProjectsList] = useState([]); // State to hold the list of projects
    const [listLoading, setListLoading] = useState(false); // Loading state for the list

    const [isAddingProject, setIsAddingProject] = useState(false); // State for modal visibility
    const [editingProject, setEditingProject] = useState(null); // State to hold project being edited

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        description: '',
        intro: '', 
        image: 'https://via.placeholder.com/400x250?text=Project+Image', 
        banner: 'https://via.placeholder.com/1200x400?text=Banner+Image', 
        projectImages: [], 
        primaryColor: '#4D92CE', 
        secondaryColor: '#2D2E75', 
        accentColor: '#8548FB', 
        features: [],
        technologies: [],
        platforms: [],
        type: 'mobile',
        collection: 'portfolio',
        visible: true,
        status: 'draft', 
        align: 'left' 
    });
    const [newFeature, setNewFeature] = useState({ title: '', description: '' });
    const [newTech, setNewTech] = useState('');
    const [newPlatform, setNewPlatform] = useState('');
    const [newProjectImageUrl, setNewProjectImageUrl] = useState(''); 

    const [previewMode, setPreviewMode] = useState(false);
    const [previewCollection, setPreviewCollection] = useState('portfolio');

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

    const addFeature = () => {
        if (newFeature.title.trim() && newFeature.description.trim()) {
            setFormData(prev => ({
                ...prev,
                features: [...prev.features, newFeature]
            }));
            setNewFeature({ title: '', description: '' });
        }
    };

    const removeFeature = (index) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    };

    const addTech = () => {
        if (newTech.trim()) {
            setFormData(prev => ({
                ...prev,
                technologies: [...prev.technologies, newTech.trim()]
            }));
            setNewTech('');
        }
    };

    const removeTech = (index) => {
        setFormData(prev => ({
            ...prev,
            technologies: prev.technologies.filter((_, i) => i !== index)
        }));
    };

    const addPlatform = () => {
        if (newPlatform.trim()) {
            setFormData(prev => ({
                ...prev,
                platforms: [...prev.platforms, newPlatform.trim()]
            }));
            setNewPlatform('');
        }
    };

    const removePlatform = (index) => {
        setFormData(prev => ({
            ...prev,
            platforms: prev.platforms.filter((_, i) => i !== index)
        }));
    };

    const addProjectImage = () => {
        if (newProjectImageUrl.trim()) {
            setFormData(prev => ({
                ...prev,
                projectImages: [...prev.projectImages, newProjectImageUrl.trim()]
            }));
            setNewProjectImageUrl('');
        }
    };

    const removeProjectImage = (index) => {
        setFormData(prev => ({
            ...prev,
            projectImages: prev.projectImages.filter((_, i) => i !== index)
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name) errors.name = 'Project name is required';
        if (!formData.category) errors.category = 'Category is required';
        if (!formData.description) errors.description = 'Description is required';
        if (!formData.image) errors.image = 'Main image is required';
        if (!formData.intro) errors.intro = 'Introduction is required'; 
        if (!formData.primaryColor) errors.primaryColor = 'Primary Color is required'; 
        if (!formData.secondaryColor) errors.secondaryColor = 'Secondary Color is required'; 
        if (!formData.accentColor) errors.accentColor = 'Accent Color is required'; 
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
            intro: project.intro || '', 
            image: project.image || 'https://via.placeholder.com/400x250?text=Project+Image', 
            banner: project.banner || 'https://via.placeholder.com/1200x400?text=Banner+Image', 
            projectImages: project.projectImages || [], 
            primaryColor: project.primaryColor || '#4D92CE', 
            secondaryColor: project.secondaryColor || '#2D2E75', 
            accentColor: project.accentColor || '#8548FB', 
            features: project.features || [],
            technologies: project.technologies || [],
            platforms: project.platforms || [],
            type: project.type,
            collection: project.collection,
            visible: project.visible,
            status: project.status || 'draft',
            align: project.align || 'left' 
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

        try {
            const projectData = {
                ...formData,
                updatedAt: new Date().toISOString()
            };

            if (editingProject) {
                const projectRef = doc(db, 'projects', editingProject.id);
                await updateDoc(projectRef, projectData);
                setSuccessMessage('Project updated successfully!');
            } else {
                projectData.createdAt = new Date().toISOString();
                await addDoc(collection(db, 'projects'), projectData);
                setSuccessMessage('Project added successfully!');
            }
            
            setFormData({
                name: '',
                category: '',
                description: '',
                intro: '', 
                image: 'https://via.placeholder.com/400x250?text=Project+Image', 
                banner: 'https://via.placeholder.com/1200x400?text=Banner+Image', 
                projectImages: [], 
                primaryColor: '#4D92CE', 
                secondaryColor: '#2D2E75', 
                accentColor: '#8548FB', 
                features: [],
                technologies: [],
                platforms: [],
                type: 'mobile',
                collection: 'portfolio',
                visible: true,
                status: 'draft',
                align: 'left' 
            });
            setIsAddingProject(false); 
            setEditingProject(null); 
            
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

                        <div className="form-group">
                            <label>
                                Introduction *
                                {validationErrors.intro && <span className="error">{validationErrors.intro}</span>}
                            </label>
                            <textarea
                                value={formData.intro}
                                onChange={(e) => setFormData({...formData, intro: e.target.value})}
                                placeholder="Enter a brief introduction for the project"
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
                            <label>Alignment on Project List Page</label>
                            <div className="radio-group">
                                <label>
                                    <input
                                        type="radio"
                                        name="alignment"
                                        value="left"
                                        checked={formData.align === 'left'}
                                        onClick={() => {
                                            console.log('Left clicked, current align:', formData.align);
                                            setFormData(prev => {
                                                console.log('Setting align to left');
                                                return {...prev, align: 'left'};
                                            });
                                        }}
                                    />
                                    Left
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="alignment"
                                        value="right"
                                        checked={formData.align === 'right'}
                                        onClick={() => {
                                            console.log('Right clicked, current align:', formData.align);
                                            setFormData(prev => {
                                                console.log('Setting align to right');
                                                return {...prev, align: 'right'};
                                            });
                                        }}
                                    />
                                    Right
                                </label>
                            </div>
                            <div style={{marginTop: '10px', color: '#666'}}>
                                Current alignment: {formData.align}
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
                                Main Project Image URL *
                                {validationErrors.image && <span className="error">{validationErrors.image}</span>}
                            </label>
                            <input
                                type="url"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                placeholder="https://example.com/project.jpg"
                            />
                        </div>

                        <div className="form-group">
                            <label>Additional Project Images</label>
                            <div className="array-input-group">
                                <input
                                    type="url"
                                    placeholder="Add image URL"
                                    value={newProjectImageUrl}
                                    onChange={(e) => setNewProjectImageUrl(e.target.value)}
                                />
                                <button type="button" onClick={addProjectImage}>Add</button>
                            </div>
                            <div className="tech-tags"> 
                                {formData.projectImages.map((imgUrl, index) => (
                                    <span key={index} className="tech-tag">
                                        {imgUrl.substring(0, 30)}...
                                        <button type="button" onClick={() => removeProjectImage(index)}>×</button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>Colors *</h3>
                        {validationErrors.primaryColor && <span className="error">{validationErrors.primaryColor}</span>}
                        {validationErrors.secondaryColor && <span className="error">{validationErrors.secondaryColor}</span>}
                        {validationErrors.accentColor && <span className="error">{validationErrors.accentColor}</span>}
                        <div className="form-group">
                            <label>Primary Color</label>
                            <input
                                type="color"
                                value={formData.primaryColor}
                                onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
                            />
                            <span>{formData.primaryColor}</span>
                        </div>
                        <div className="form-group">
                            <label>Secondary Color</label>
                            <input
                                type="color"
                                value={formData.secondaryColor}
                                onChange={(e) => setFormData({...formData, secondaryColor: e.target.value})}
                            />
                            <span>{formData.secondaryColor}</span>
                        </div>
                        <div className="form-group">
                            <label>Accent Color</label>
                            <input
                                type="color"
                                value={formData.accentColor}
                                onChange={(e) => setFormData({...formData, accentColor: e.target.value})}
                            />
                            <span>{formData.accentColor}</span>
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
                                intro: '', 
                                image: 'https://via.placeholder.com/400x250?text=Project+Image', 
                                banner: 'https://via.placeholder.com/1200x400?text=Banner+Image', 
                                projectImages: [], 
                                primaryColor: '#4D92CE', 
                                secondaryColor: '#2D2E75', 
                                accentColor: '#8548FB', 
                                features: [],
                                technologies: [],
                                platforms: [],
                                type: 'mobile',
                                collection: 'portfolio',
                                visible: true,
                                status: 'draft',
                                align: 'left' 
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
                                intro: '', 
                                image: 'https://via.placeholder.com/400x250?text=Project+Image', 
                                banner: 'https://via.placeholder.com/1200x400?text=Banner+Image', 
                                projectImages: [], 
                                primaryColor: '#4D92CE', 
                                secondaryColor: '#2D2E75', 
                                accentColor: '#8548FB', 
                                features: [],
                                technologies: [],
                                platforms: [],
                                type: 'mobile', 
                                collection: 'portfolio', 
                                visible: true,
                                status: 'draft',
                                align: 'left' 
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