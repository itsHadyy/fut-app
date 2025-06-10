import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
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
        type: 'mobile',
        collection: 'portfolio',
        category: '',
        description: '',
        banner: '',
        intro: '',
        features: [], // Make features optional by starting with empty array
        platforms: [''],
        primaryColor: '',
        secondaryColor: '',
        accentColor: '',
        prototype: '',
        productImages: [''],
        align: 'left',
    });
    const [newFeature, setNewFeature] = useState({ title: '', description: '' });
    const [newTech, setNewTech] = useState('');
    const [newPlatform, setNewPlatform] = useState('');
    const [newProjectImageUrl, setNewProjectImageUrl] = useState(''); 
    const [newPhase, setNewPhase] = useState('');
    const [newColor, setNewColor] = useState('');

    const [previewMode, setPreviewMode] = useState(false);
    const [previewCollection, setPreviewCollection] = useState('portfolio');

    const [validationErrors, setValidationErrors] = useState({});

    const defaultPhases = {
        mobile: [
            'Concept & Planning - Defining the app\'s purpose, features, and target audience. Gathering requirements and sketching out initial ideas.',
            'UI/UX Design - Designing an intuitive and visually appealing interface that ensures a seamless user experience.',
            'Development & Testing - Writing the code, integrating features, and conducting thorough testing to ensure functionality, security, and reliability.',
            'Deployment & Publishing - Preparing the application for release on iOS and Android platforms. Setting up backend services and security measures.'
        ],
        website: [
            'Discovery & Planning - Understanding client needs, defining goals, and creating a project roadmap.',
            'Design & Wireframing - Creating visual designs and interactive prototypes for client approval.',
            'Development - Building the website with responsive design and required functionality.',
            'Testing & Launch - Quality assurance testing and deploying the website to production.'
        ]
    };

    // Update phases when type changes
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            phases: defaultPhases[activeType]
        }));
    }, [activeType]);

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

    const handleAddFeature = () => {
        if (newFeature.title && newFeature.description) {
            setFormData(prev => ({
                ...prev,
                features: [...prev.features, newFeature]
            }));
            setNewFeature({ title: '', description: '' });
        }
    };

    const handleRemoveFeature = (index) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    };

    const handleAddTech = () => {
        if (newTech.trim()) {
            setFormData(prev => ({
                ...prev,
                technologies: [...prev.technologies, newTech.trim()]
            }));
            setNewTech('');
        }
    };

    const handleRemoveTech = (index) => {
        setFormData(prev => ({
            ...prev,
            technologies: prev.technologies.filter((_, i) => i !== index)
        }));
    };

    const handleAddPlatform = () => {
        if (newPlatform) {
            setFormData(prev => ({
                ...prev,
                platforms: [...prev.platforms, newPlatform]
            }));
            setNewPlatform('');
        }
    };

    const handleRemovePlatform = (index) => {
        setFormData(prev => ({
            ...prev,
            platforms: prev.platforms.filter((_, i) => i !== index)
        }));
    };

    const handleAddProjectImage = () => {
        if (newProjectImageUrl.trim()) {
            setFormData(prev => ({
                ...prev,
                projectImages: [...prev.projectImages, newProjectImageUrl.trim()]
            }));
            setNewProjectImageUrl('');
        }
    };

    const handleRemoveProjectImage = (index) => {
        setFormData(prev => ({
            ...prev,
            projectImages: prev.projectImages.filter((_, i) => i !== index)
        }));
    };

    const handleAddPhase = () => {
        if (newPhase) {
            setFormData(prev => ({
                ...prev,
                phases: [...prev.phases, newPhase]
            }));
            setNewPhase('');
        }
    };

    const handleAddProductImage = () => {
        if (newProjectImageUrl.trim()) {
            setFormData(prev => ({
                ...prev,
                productImages: [...prev.productImages, newProjectImageUrl.trim()]
            }));
            setNewProjectImageUrl('');
        }
    };

    const handleAddColor = () => {
        if (newColor && formData.colors.length < 3) {
            setFormData(prev => ({
                ...prev,
                colors: [...prev.colors, newColor]
            }));
            setNewColor('');
        }
    };

    const handleRemoveColor = (index) => {
        if (formData.colors.length > 2) { // Ensure we always have at least 2 colors
            setFormData(prev => ({
                ...prev,
                colors: prev.colors.filter((_, i) => i !== index)
            }));
        }
    };

    const handleRemoveItem = (field, index) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const validateForm = () => {
        const errors = {};
        
        if (!formData.name.trim()) errors.name = 'Project name is required';
        if (!formData.category.trim()) errors.category = 'Project category is required';
        if (!formData.description.trim()) errors.description = 'Project description is required';
        if (!formData.banner.trim()) errors.banner = 'Banner image URL is required';
        if (!formData.intro.trim()) errors.intro = 'Project introduction is required';
        
        // Features are now optional
        if (formData.features.length > 0) {
            formData.features.forEach((feature, index) => {
                if (!feature.title.trim()) {
                    errors[`featureTitle${index}`] = 'Feature title is required if description is provided';
                }
                if (!feature.description.trim()) {
                    errors[`featureDesc${index}`] = 'Feature description is required if title is provided';
                }
            });
        }

        // Validate platforms
        if (!formData.platforms.length || !formData.platforms[0].trim()) {
            errors.platforms = 'At least one platform is required';
        }

        // Validate colors - only primary and secondary are required
        if (!formData.primaryColor.trim()) errors.primaryColor = 'Primary color is required';
        if (!formData.secondaryColor.trim()) errors.secondaryColor = 'Secondary color is required';
        // Accent color is optional

        // Validate prototype
        if (!formData.prototype.trim()) errors.prototype = 'Prototype iframe code is required';

        // Validate product images
        if (!formData.productImages.length || !formData.productImages[0].trim()) {
            errors.productImages = 'At least one product image is required';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleEdit = (project) => {
        setEditingProject(project);
        setFormData({
            name: project.name,
            type: project.type,
            banner: project.banner,
            intro: project.intro,
            features: project.features,
            platforms: project.platforms,
            primaryColor: project.primaryColor,
            secondaryColor: project.secondaryColor,
            accentColor: project.accentColor,
            prototype: project.prototype,
            productImages: project.productImages,
            align: project.align,
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
            return;
        }

        try {
            const projectData = {
                ...formData,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };

            await addDoc(collection(db, 'projects'), projectData);
            
            // Reset form
            setFormData({
                name: '',
                type: 'mobile',
                banner: '',
                intro: '',
                features: [],
                platforms: [''],
                primaryColor: '',
                secondaryColor: '',
                accentColor: '',
                prototype: '',
                productImages: [''],
                align: 'left',
            });
            setValidationErrors({});
            
            // Refresh projects list
            fetchProjects();
        } catch (error) {
            console.error('Error adding project:', error);
            setErrorMessage('Failed to add project. Please try again.');
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
                        <span>{formData.type === 'mobile' ? 'Mobile Application' : 'Website'}</span>
                        <p>{formData.intro || 'Project Introduction'}</p>
                        {formData.banner && (
                            <div className="preview-image">
                                <img src={formData.banner} alt="Preview" />
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
                                Project Category *
                                {validationErrors.category && <span className="error">{validationErrors.category}</span>}
                            </label>
                            <input
                                type="text"
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                                placeholder="Enter project category (e.g., community app)"
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                Project Description *
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
                        <h3>Project Type & Display</h3>
                        <div className="form-group">
                            <label>Project Type</label>
                            <div className="radio-group">
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        value="mobile"
                                        checked={formData.type === 'mobile'}
                                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                                    />
                                    <span className="radio-text">Mobile Application</span>
                                </label>
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        value="website"
                                        checked={formData.type === 'website'}
                                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                                    />
                                    <span className="radio-text">Website</span>
                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Display Location</label>
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
                            <label>Project Alignment on {formData.collection === 'portfolio' ? 'Portfolio' : 'Products'} Page</label>
                            <div className="radio-group">
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="alignment"
                                        value="left"
                                        checked={formData.align === 'left'}
                                        onChange={(e) => setFormData({...formData, align: e.target.value})}
                                    />
                                    <span className="radio-text">Left</span>
                                </label>
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="alignment"
                                        value="right"
                                        checked={formData.align === 'right'}
                                        onChange={(e) => setFormData({...formData, align: e.target.value})}
                                    />
                                    <span className="radio-text">Right</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>Media & Content</h3>
                        <div className="form-group">
                            <label>
                                Banner Image URL *
                                {validationErrors.banner && <span className="error">{validationErrors.banner}</span>}
                            </label>
                            <input
                                type="text"
                                value={formData.banner}
                                onChange={(e) => setFormData({...formData, banner: e.target.value})}
                                placeholder="Enter banner image URL"
                            />
                            {formData.banner && (
                                <div className="image-preview">
                                    <img src={formData.banner} alt="Banner preview" />
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label>
                                Project Introduction *
                                {validationErrors.intro && <span className="error">{validationErrors.intro}</span>}
                            </label>
                            <textarea
                                value={formData.intro}
                                onChange={(e) => setFormData({...formData, intro: e.target.value})}
                                placeholder="Enter project introduction"
                            />
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>Features (Optional)</h3>
                        <p className="section-description">Add key features of your project. This section is optional.</p>
                        {formData.features.map((feature, index) => (
                            <div key={index} className="feature-group">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        value={feature.title}
                                        onChange={(e) => {
                                            const newFeatures = [...formData.features];
                                            newFeatures[index].title = e.target.value;
                                            setFormData({...formData, features: newFeatures});
                                        }}
                                        placeholder="Feature title"
                                    />
                                    <textarea
                                        value={feature.description}
                                        onChange={(e) => {
                                            const newFeatures = [...formData.features];
                                            newFeatures[index].description = e.target.value;
                                            setFormData({...formData, features: newFeatures});
                                        }}
                                        placeholder="Feature description"
                                    />
                                    <button
                                        type="button"
                                        className="remove-btn"
                                        onClick={() => {
                                            const newFeatures = formData.features.filter((_, i) => i !== index);
                                            setFormData({...formData, features: newFeatures});
                                        }}
                                    >
                                        Remove Feature
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="add-btn"
                            onClick={() => setFormData({
                                ...formData,
                                features: [...formData.features, { title: '', description: '' }]
                            })}
                        >
                            Add Feature
                        </button>
                    </div>

                    <div className="form-section">
                        <h3>Platforms *</h3>
                        {validationErrors.platforms && <span className="error">{validationErrors.platforms}</span>}
                        {formData.platforms.map((platform, index) => (
                            <div key={index} className="form-group">
                                <div className="array-input-group">
                                    <input
                                        type="text"
                                        value={platform}
                                        onChange={(e) => {
                                            const newPlatforms = [...formData.platforms];
                                            newPlatforms[index] = e.target.value;
                                            setFormData({...formData, platforms: newPlatforms});
                                        }}
                                        placeholder="Enter platform"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newPlatforms = formData.platforms.filter((_, i) => i !== index);
                                            setFormData({...formData, platforms: newPlatforms});
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => setFormData({
                                ...formData,
                                platforms: [...formData.platforms, '']
                            })}
                        >
                            Add Platform
                        </button>
                    </div>

                    <div className="form-section">
                        <h3>Colors *</h3>
                        {validationErrors.primaryColor && <span className="error">{validationErrors.primaryColor}</span>}
                        {validationErrors.secondaryColor && <span className="error">{validationErrors.secondaryColor}</span>}
                        {validationErrors.accentColor && <span className="error">{validationErrors.accentColor}</span>}
                        <div className="form-group">
                            <label>Primary Color *</label>
                            <input
                                type="text"
                                value={formData.primaryColor}
                                onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
                                placeholder="#FF0000"
                            />
                            <div className="color-preview" style={{ backgroundColor: formData.primaryColor }}></div>
                        </div>
                        <div className="form-group">
                            <label>Secondary Color *</label>
                            <input
                                type="text"
                                value={formData.secondaryColor}
                                onChange={(e) => setFormData({...formData, secondaryColor: e.target.value})}
                                placeholder="#00FF00"
                            />
                            <div className="color-preview" style={{ backgroundColor: formData.secondaryColor }}></div>
                        </div>
                        <div className="form-group">
                            <label>Accent Color (Optional)</label>
                            <input
                                type="text"
                                value={formData.accentColor}
                                onChange={(e) => setFormData({...formData, accentColor: e.target.value})}
                                placeholder="#0000FF"
                            />
                            <div className="color-preview" style={{ backgroundColor: formData.accentColor }}></div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Prototype Iframe Code *</label>
                        {validationErrors.prototype && <span className="error">{validationErrors.prototype}</span>}
                        <textarea
                            value={formData.prototype}
                            onChange={(e) => setFormData({...formData, prototype: e.target.value})}
                            placeholder="Enter prototype iframe code"
                        />
                    </div>

                    <div className="form-section">
                        <h3>Product Images *</h3>
                        {validationErrors.productImages && <span className="error">{validationErrors.productImages}</span>}
                        {formData.productImages.map((image, index) => (
                            <div key={index} className="form-group">
                                <div className="array-input-group">
                                    <input
                                        type="text"
                                        value={image}
                                        onChange={(e) => {
                                            const newImages = [...formData.productImages];
                                            newImages[index] = e.target.value;
                                            setFormData({...formData, productImages: newImages});
                                        }}
                                        placeholder="Enter image URL"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newImages = formData.productImages.filter((_, i) => i !== index);
                                            setFormData({...formData, productImages: newImages});
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => setFormData({
                                ...formData,
                                productImages: [...formData.productImages, '']
                            })}
                        >
                            Add Image
                        </button>
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
                                type: 'mobile',
                                collection: 'portfolio',
                                category: '',
                                description: '',
                                banner: '',
                                intro: '',
                                features: [],
                                platforms: [''],
                                primaryColor: '',
                                secondaryColor: '',
                                accentColor: '',
                                prototype: '',
                                productImages: [''],
                                align: 'left',
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
                                type: 'mobile',
                                banner: '',
                                intro: '',
                                features: [],
                                platforms: [''],
                                primaryColor: '',
                                secondaryColor: '',
                                accentColor: '',
                                prototype: '',
                                productImages: [''],
                                align: 'left',
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
                                                <img src={project.banner} alt={project.name} className="project-image" />
                                                <div className="project-info">
                                                    <h3>{project.name}</h3>
                                                    <p className="project-category">{project.type === 'mobile' ? 'Mobile Application' : 'Website'}</p>
                                                    <p className="project-description">{project.intro || 'No introduction provided'}</p>
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