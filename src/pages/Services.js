import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you are using React Router v6

function Services() {
    const [activeService, setActiveService] = useState('mobile');
    const navigate = useNavigate(); // Initialize navigate hook

    // Placeholder project data - replace with your actual data
    const projects = {
        mobile: [
            { id: 1, name: 'PRE Developments', image: 'media/Portfolio/Mobile/PRE.png' },
            { id: 2, name: 'JDAR Developments', image: 'media/Portfolio/Mobile/JDAR.png' },
            { id: 3, name: 'al ahly sabour Developments', image: 'media/Portfolio/Mobile/ahly.png' },
            { id: 4, name: 'Buzz Mobility', image: 'media/Portfolio/Mobile/Buzz.png' },
            { id: 5, name: 'Orange', image: 'media/Portfolio/Mobile/orange.png' },
            { id: 6, name: 'Vinde', image: 'media/Portfolio/Mobile/vinde.png' },
        ],
        websites: [
            { id: 5, name: 'Website Project 1', image: 'placeholder.png' },
            { id: 6, name: 'Website Project 2', image: 'placeholder.png' },
            // Add more website projects here
        ],
        smart_systems: [
            { id: 7, name: 'Smart System Project 1', image: 'placeholder.png' },
            { id: 8, name: 'Smart System Project 2', image: 'placeholder.png' },
            // Add more smart system projects here
        ],
    };

    const handleProjectClick = (projectId) => {
        // Navigate to the project details page
        navigate(`/projects/${projectId}`);
    };

    const renderContent = () => {
        switch (activeService) {
            case 'mobile':
                return (
                    <>
                        <div className="services-intro">
                            <img src="media/Services/Mobile/Robot Hand left.png" alt="Robot arm left" className="services-intro-image left-image" />
                            <div className="services-intro-content">
                                <h2>Transform Your Vision into Reality with Cutting-Edge Mobile App Development!</h2>
                                <p>
                                    In today's fast-paced digital world, having a powerful mobile application is
                                    essential to stay ahead. Whether you're a startup or an established business,
                                    our expert developers craft sleek, high-performance apps that elevate your
                                    brand and engage your audience. From innovative UI/UX design to seamless
                                    functionality, we bring your ideas to life with precision and expertise.
                                </p>
                                <p>Don't just adapt—<strong>innovate!</strong> Let's build something extraordinary together.</p>
                                <p><a href="#">Contact us today and take your mobile experience to the next level!</a></p>
                            </div>
                            <img src="media/Services/Mobile/Robot Hand right.png" alt="Robot arm right" className="services-intro-image right-image" />
                        </div>
                        <div className="service-content">
                            <h2>Why You Need a Mobile App</h2>
                            <p>Having a mobile app is a game-changer for businesses, entrepreneurs, and creators. It puts your brand directly into the hands of users, making it easier to engage, convert, and grow. Here's why you should invest in a mobile application:</p>
                            <ol>
                                <li>
                                    <strong>Enhance Accessibility & Convenience</strong>
                                    <ul>
                                        <li>Your app is available 24/7, offering users instant access to your services or content.</li>
                                        <li>Mobile apps provide a seamless experience, eliminating the need to visit websites or wait for desktop access.</li>
                                        <li>With push notifications, you can keep users informed in real time, increasing engagement.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Build Customer Loyalty</strong>
                                    <ul>
                                        <li>Mobile apps offer a personalized experience, making users feel valued.</li>
                                        <li>In-app loyalty programs, rewards, and exclusive offers help retain customers.</li>
                                        <li>Direct communication through notifications fosters a strong brand-user relationship.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Boost Brand Recognition & Awareness</strong>
                                    <ul>
                                        <li>Having your own app makes your brand appear more professional and trustworthy.</li>
                                        <li>Users are more likely to remember and engage with businesses that have a mobile presence.</li>
                                        <li>An app icon on their screen serves as a daily reminder of your business.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Improve User Experience & Engagement</strong>
                                    <ul>
                                        <li>Apps provide a smoother and faster experience than websites, reducing load times and friction.</li>
                                        <li>Features like offline access allow users to interact with your app even without an internet connection.</li>
                                        <li>Customizable interfaces and interactive elements make the app more engaging.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Increase Revenue & Monetization Opportunities</strong>
                                    <ul>
                                        <li>Sell products or services directly through your app with seamless checkout processes.</li>
                                        <li>Offer subscriptions, in-app purchases, or exclusive content for paying users.</li>
                                        <li>Generate revenue through ads or sponsorships within your application.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Gain Valuable User Insights</strong>
                                    <ul>
                                        <li>Track user behavior, preferences, and interactions to improve your offerings.</li>
                                        <li>Collect valuable data for targeted marketing campaigns and personalized content.</li>
                                        <li>Use analytics to understand what features are most popular and optimize accordingly.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Improve Business Operations & Efficiency</strong>
                                    <ul>
                                        <li>Automate tasks, processes, and customer support through Al-powered chatbots or self-service tools.</li>
                                        <li>Enable easier communication and transactions for both users and employees.</li>
                                        <li>Streamline services such as appointment booking, order tracking, or account management.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Stand Out from Competitors</strong>
                                    <ul>
                                        <li>Many businesses still rely solely on websites—having a mobile app gives you an advantage.</li>
                                        <li>Offer unique features tailored to mobile users that competitors may not have.</li>
                                        <li>Stay ahead in the digital landscape by being accessible via smartphones.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Seamless Integration with Other Platforms</strong>
                                    <ul>
                                        <li>Connect your app with social media platforms for easy sharing and engagement.</li>
                                        <li>Sync with e-commerce stores, payment gateways, and external tools for smooth transactions.</li>
                                        <li>Enhance brand visibility by integrating with wearable devices or IoT technologies.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Future-Proof Your Business</strong>
                                    <ul>
                                        <li>The mobile market continues to grow—having an app ensures you stay relevant.</li>
                                        <li>Adapt to technological advancements by updating features and functionality over time.</li>
                                        <li>Secure a long-term digital presence instead of relying solely on social media or third-party platforms.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Final Thoughts</strong>
                                    <p>A mobile app is not just an extension of your brand—it's a tool that enhances user experience, boosts engagement, and drives growth. Whether you're a startup, an established business, or an individual creator, having an app can take your success to the next level.</p>
                                </li>
                            </ol>
                        </div>
                        <div className="projects-section">
                            <h2>Check out our work!</h2>
                            <div className="projects-slideshow mobile-projects">
                                {projects.mobile.map(project => (
                                    <div key={project.id} className="project-item" onClick={() => handleProjectClick(project.id)}>
                                        <img src={project.image} alt={project.name} />
                                        <p>{project.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                );
            case 'websites':
                return (
                    <>
                        <div className="service-content">
                            <h2>Websites</h2>
                            <p>Content for Websites goes here...</p>
                        </div>
                        <div className="projects-section">
                            <h2>Check out our work!</h2>
                            <div className="projects-slideshow websites-projects">
                                {projects.websites.map(project => (
                                    <div key={project.id} className="project-item" onClick={() => handleProjectClick(project.id)}>
                                        <img src={project.image} alt={project.name} />
                                        <p>{project.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                );
            case 'smart_systems':
                return (
                    <>
                        <div className="service-content">
                            <h2>Smart Systems</h2>
                            <p>Content for Smart Systems goes here...</p>
                        </div>
                        <div className="projects-section">
                            <h2>Check out our work!</h2>
                            <div className="projects-slideshow smart-systems-projects">
                                {projects.smart_systems.map(project => (
                                    <div key={project.id} className="project-item" onClick={() => handleProjectClick(project.id)}>
                                        <img src={project.image} alt={project.name} />
                                        <p>{project.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    const renderBanner = () => {
        switch (activeService) {
            case 'mobile':
                return (
                    <div className="services-banner mobile-banner">
                        <div className='banner-content'>
                            <h1>You have a problem, <br />We <b>Build</b> a <b>Solution</b></h1>
                            <p>Innovate, Integrate, Inspire: Your Software Solutions Partner.</p>
                            <button className="btn">Let's Talk!</button>
                        </div>
                    </div>
                );
            case 'websites':
                return (
                    <div className="services-banner websites-banner">
                        <h1>Websites Banner Title</h1>
                        <p>Websites banner subtitle.</p>
                        <button className="btn">Get a Website</button>
                    </div>
                );
            case 'smart_systems':
                return (
                    <div className="services-banner smart-systems-banner">
                        <h1>Smart Systems Banner Title</h1>
                        <p>Smart Systems banner subtitle.</p>
                        <button className="btn">Learn About Smart Systems</button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="services-page">
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
                <button
                    className={`btn ${activeService === 'smart_systems' ? 'active' : ''}`}
                    onClick={() => setActiveService('smart_systems')}
                >
                    Smart Systems
                </button>
            </div>
            {renderContent()}
        </div>
    );
}

export default Services;