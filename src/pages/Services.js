import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you are using React Router v6
import { db } from '../firebaseConfig';
import { collection, getDocs} from 'firebase/firestore';

import { Link } from "react-router-dom";

function Services() {
    const [activeService, setActiveService] = useState('mobile');
    const navigate = useNavigate(); // Initialize navigate hook
    const [projects, setProjects] = useState({
        mobile: [],
        websites: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectsRef = collection(db, 'projects');
                const snapshot = await getDocs(projectsRef);
                const projectsData = {
                    mobile: [],
                    websites: []
                };

                snapshot.forEach((doc) => {
                    const project = { id: doc.id, ...doc.data() };
                    if (project.type === 'mobile') {
                        projectsData.mobile.push({
                            id: doc.id,
                            name: project.name,
                            image: project.image
                        });
                    } else if (project.type === 'website') {
                        projectsData.websites.push({
                            id: doc.id,
                            name: project.name,
                            image: project.image
                        });
                    }
                });

                setProjects(projectsData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching projects:', error);
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleProjectClick = (projectId) => {
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
                                <p><Link to="/contact">Contact us today and take your mobile experience to the next level!</Link></p>
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
                            {loading ? (
                                <div className="loading">
                                    <h1>Loading...</h1>
                                </div>
                            ) : (
                                <div className="projects-slideshow mobile-projects">
                                    {projects.mobile.map(project => (
                                        <div key={project.id} className="project-item" onClick={() => handleProjectClick(project.id)}>
                                            <img src={project.image} alt={project.name} />
                                            <p>{project.name}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                );
            case 'websites':
                return (
                    <>
                        <div className="services-intro">
                            <img src="media/Services/Mobile/Robot Hand left.png" alt="Robot arm left" className="services-intro-image left-image" />
                            <div className="services-intro-content">
                                <h2>Build Stunning, High-Performing Websites That Drive Results!</h2>
                                <p>
                                    Your website is your digital storefront—make it work for you! Our expert developers craft responsive, visually captivating, and high-speed websites tailored to your business needs. Whether it's an e-commerce platform, corporate site, or custom web solution, we bring innovative designs and seamless functionality to life.
                                </p>
                                <p>Let's create an <strong>online experience </strong>that converts visitors into <strong>loyal customers.</strong></p>
                                <p><Link to="/contact">Contact us today and take your web presence to the next level!</Link></p>
                            </div>
                            <img src="media/Services/Mobile/Robot Hand right.png" alt="Robot arm right" className="services-intro-image right-image" />
                        </div>
                        <div className="service-content">
                            <h2>Why You Need a Website</h2>
                            <p>Building your own website is one of the best investments you can make, whether for personal branding, business growth, or creative expression. Here's why:</p>
                            <ol>
                                <li>
                                    <strong>Establish Your Online Presence</strong>
                                    <ul>
                                        <li>Be easily accessible to anyone searching for you or your services.</li>
                                        <li>Stand out in your industry or niche with a unique digital identity.</li>
                                        <li>Gain credibility—people trust brands and individuals who have a professional website.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Full Creative Control</strong>
                                    <ul>
                                        <li>Design your website exactly how you want—no restrictions from third-party platforms.</li>
                                        <li>Customize your branding, colors, layouts, and functionality to match your style.</li>
                                        <li>Publish content without worrying about changing algorithms or platform limitations.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Increase Visibility & Reach</strong>
                                    <ul>
                                        <li>Reach a global audience beyond your local community.</li>
                                        <li>Improve search engine rankings with SEO, making it easier for people to find you.</li>
                                        <li>Share your expertise, services, or products with potential customers worldwide.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Build a Strong Brand & Reputation</strong>
                                    <ul>
                                        <li>Make a lasting impression with a well-designed, professional website.</li>
                                        <li>Share testimonials, case studies, and success stories to boost credibility.</li>
                                        <li>Strengthen your identity and differentiate yourself from competitors.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Drive Business Growth</strong>
                                    <ul>
                                        <li>Generate leads and sales by showcasing your products or services.</li>
                                        <li>Provide customers with essential information, reducing time spent on inquiries.</li>
                                        <li>Sell products directly online with an integrated e-commerce platform.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Connect with Your Audience</strong>
                                    <ul>
                                        <li>Engage visitors with blogs, newsletters, and personalized content.</li>
                                        <li>Build a community and foster relationships with your audience.</li>
                                        <li>Collect feedback through forms and surveys to improve your offerings.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Cost-Effective Marketing</strong>
                                    <ul>
                                        <li>Avoid expensive print or traditional media advertising.</li>
                                        <li>Use digital marketing techniques like SEO, email marketing, and social media integration.</li>
                                        <li>Run targeted campaigns that drive traffic directly to your site.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Monetization Opportunities</strong>
                                    <ul>
                                        <li>Earn money through ads, affiliate marketing, or selling your own products and services.</li>
                                        <li>Offer exclusive content through memberships or subscriptions.</li>
                                        <li>Attract sponsorships and collaborations once you establish a strong online presence.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Future-Proof Your Brand</strong>
                                    <ul>
                                        <li>Stay relevant and competitive in an increasingly digital world.</li>
                                        <li>Adapt and update your site as your needs evolve.</li>
                                        <li>Secure your place in the online space instead of relying on temporary social media platforms.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Final Thoughts</strong>
                                    <p>With all these advantages, having a website is not just a luxury—it's a necessity! Whether you're a business, freelancer, creator, or entrepreneur, your website is your personal space on the internet that helps you grow, connect, and succeed.</p>
                                </li>
                            </ol>
                        </div>
                        <div className="projects-section">
                            <h2>Check out our work!</h2>
                            {loading ? (
                                <div className="loading">
                                    <h1>Loading...</h1>
                                </div>
                            ) : (
                                <div className="projects-slideshow mobile-projects">
                                    {projects.websites.map(project => (
                                        <div key={project.id} className="project-item" onClick={() => handleProjectClick(project.id)}>
                                            <img src={project.image} alt={project.name} />
                                            <p>{project.name}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                );
            case 'smart_systems':
                return (
                    <>
                        <div className="services-intro">
                            <img src="media/Services/Mobile/Robot Hand left.png" alt="Robot arm left" className="services-intro-image left-image" />
                            <div className="services-intro-content">
                                <h2>Empower Your Business with Intelligent Smart Systems!</h2>
                                <p>
                                    Stay ahead of the competition with cutting-edge smart systems designed to automate, optimize, and elevate your operations. From Al-driven solutions to IoT integrations, our advanced technology streamlines workflows, enhances efficiency, and drives innovation. Whether it's smart security, automation, or data-driven intelligence, we craft systems that adapt to your needs.
                                </p>
                                <p>Step into the future today!<br /> <Link to="/contact">Contact us to develop smart solutions that transform your business.</Link></p>
                            </div>
                            <img src="media/Services/Mobile/Robot Hand right.png" alt="Robot arm right" className="services-intro-image right-image" />
                        </div>
                        <div className="service-content">
                            <h2>Why Smart Systems Are Essential</h2>
                            <p>Smart systems use advanced technology to automate processes, improve efficiency, and enhance daily life. Whether for businesses, homes, or industries, these intelligent solutions optimize operations and create a seamless, connected experience.</p>
                            <ol>
                                <li>
                                    <strong>Increased Efficiency & Automation</strong>
                                    <ul>
                                        <li>Smart systems automate repetitive tasks, reducing the need for manual intervention.</li>
                                        <li>Businesses can streamline operations, cut costs, and boost productivity.</li>
                                        <li>Homes benefit from automated lighting, climate control, and security systems.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Enhanced Security & Safety</strong>
                                    <ul>
                                        <li>Al-powered surveillance ensures real-time monitoring and threat detection.</li>
                                        <li>Smart access control systems provide biometric authentication for enhanced security.</li>
                                        <li>Automated alerts notify users of potential hazards or unauthorized access.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Energy Conservation & Sustainability</strong>
                                    <ul>
                                        <li>Smart thermostats and lighting adjust based on occupancy, reducing energy waste.</li>
                                        <li>Businesses optimize energy consumption to lower costs and environmental impact.</li>
                                        <li>Smart grids and renewable energy integration contribute to a sustainable future.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Seamless Connectivity & Integration</strong>
                                    <ul>
                                        <li>Smart systems connect devices across various platforms for a unified experience.</li>
                                        <li>Homes and workplaces benefit from IoT-enabled appliances and automation tools.</li>
                                        <li>Businesses enhance communication and workflow efficiency through integrated solutions.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Improved User Experience & Convenience</strong>
                                    <ul>
                                        <li>Al-driven personal assistants simplify tasks, from scheduling to controlling smart devices.</li>
                                        <li>Hands-free voice commands enhance accessibility and ease of use.</li>
                                        <li>Predictive technology learns user preferences for a tailored experience.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Cost Savings & Operational Optimization</strong>
                                    <ul>
                                        <li>Automated systems reduce labor costs and improve resource management.</li>
                                        <li>Businesses track inventory, monitor equipment health, and optimize logistics in real time.</li>
                                        <li>Smart home automation lowers utility bills through efficient energy usage.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Data-Driven Insights & Decision-Making</strong>
                                    <ul>
                                        <li>Al-powered analytics help businesses make informed decisions with real-time data.</li>
                                        <li>Predictive maintenance ensures longevity and reliability of equipment.</li>
                                        <li>Homes and workplaces benefit from smart monitoring and performance optimization.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Remote Access & Control</strong>
                                    <ul>
                                        <li>Users can manage smart systems from anywhere via mobile apps and cloud platforms.</li>
                                        <li>Businesses gain remote control over security, operations, and facility management.</li>
                                        <li>Homeowners adjust settings, monitor security, and control appliances remotely.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Enhanced Health & Well-being</strong>
                                    <ul>
                                        <li>Smart health systems track fitness, monitor vitals, and provide personalized recommendations.</li>
                                        <li>Al-driven medical diagnostics improve patient care and disease prevention.</li>
                                        <li>Automated wellness features promote healthier lifestyles through personalized insights.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Future-Ready Innovation</strong>
                                    <ul>
                                        <li>Smart systems pave the way for Al-driven advancements in various industries.</li>
                                        <li>Businesses and individuals stay competitive in an increasingly tech-centric world.</li>
                                        <li>Continuous updates and integrations ensure adaptability to evolving needs.</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Final Thoughts</strong>
                                    <p>Smart systems transform the way we work, live, and interact with technology. From homes to businesses, their ability to automate, optimize, and enhance efficiency makes them invaluable for the modern world. Embracing smart technology means stepping into a future of convenience, security, and innovation.</p>
                                </li>
                            </ol>
                        </div>
                        <div className="projects-section">
                            <h2>Check out our work!</h2>
                            <div className="projects-slideshow smart-projects">
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
                            <Link to="/contact">
                                <button className="btn">Let's Talk!</button>
                            </Link>
                        </div>
                    </div>
                );
            case 'websites':
                return (
                    <div className="services-banner websites-banner">
                        <div className='banner-content'>
                            <h1><b>Customize Yours Now!</b></h1>
                            <p>Innovate, Integrate, Inspire: Your Software Solutions Partner.</p>
                            <Link to="/contact">
                                <button className="btn">Let's Talk!</button>
                            </Link>
                        </div>
                    </div>
                );
            case 'smart_systems':
                return (
                    <div className="services-banner smart-systems-banner">
                        <div className='banner-content'>
                            <h1><b>Build</b> Your <br /> Home <b>Smart</b></h1>
                            <p>Innovate, Integrate, Inspire: Your Software Solutions Partner.</p>
                            <Link to="/contact">
                                <button className="btn">Let's Talk!</button>
                            </Link>
                        </div>
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