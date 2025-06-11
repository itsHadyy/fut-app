import { Link } from "react-router-dom";
import Clients from "../components/Clients";
import React, { useState, useEffect } from 'react';

function Home() {
    const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
    const testimonialItems = React.useRef([]);
    const paginationDots = React.useRef([]);

    // Function to show a specific testimonial
    const showTestimonial = (index) => {
        const testimonialContent = document.querySelector('.testimonial-content');
        if (testimonialContent) {
            const offset = -index * 100;
            testimonialContent.style.transform = `translateX(${offset}%)`;
        }

        // Update active dot
        paginationDots.current.forEach((dot, i) => {
            if (dot) {
                dot.classList.remove('active');
                if (i === index) {
                    dot.classList.add('active');
                }
            }
        });

        setCurrentTestimonialIndex(index);
    };

    useEffect(() => {
        testimonialItems.current = document.querySelectorAll('.testimonial-item');
        paginationDots.current = document.querySelectorAll('.testimonial-pagination .dot');

        // Add event listeners to dots
        paginationDots.current.forEach((dot, index) => {
            if (dot) {
                dot.addEventListener('click', () => {
                    showTestimonial(index);
                });
            }
        });

        // Initial display
        showTestimonial(currentTestimonialIndex);

        // Clean up event listeners
        return () => {
            paginationDots.current.forEach((dot, index) => {
                 if (dot) {
                    dot.removeEventListener('click', () => {
                        showTestimonial(index);
                    });
                }
            });
        };
    }, [currentTestimonialIndex]); // Rerun effect if currentTestimonialIndex changes (though showTestimonial handles it)

    return (
        <div>
            <div className="home01">
                <div>
                    <p>At FutApp, we are a dynamic and innovative software development company committed to transforming ideas into reality. Our journey began in 2023, when a group of passionate tech enthusiasts decided to combine their expertise and vision to create solutions that drive digital transformation. From our humble beginnings, we have grown into a dedicated team of skilled developers, designers, and project managers who work tirelessly to deliver top-notch software solutions.</p>
                    <Link to="/about">Learn More <img src="media/assets/arrow02.png" alt="arrow" /></Link>
                </div>
                <div className="home-banner">
                    <h1>Innovative Solutions For The Future</h1>
                    <p>Innovate, Integrate, Inspire: Your Software Solutions Partner.</p>
                    <Link to="/contact">
                        <button className="btn">Let's Talk!</button>
                    </Link>
                </div>
            </div>

            <Clients />

            <div className="home02">
                <h1>Featured Products</h1>
                <p>Unlock the potential of tomorrow with FutApp's cutting-edge solutions! Our platform offers tailored, ready-to-use tools designed to streamline your processes, enhance productivity, and spark innovation. Whether you're seeking smart integrations, futuristic designs, or advanced technology applications, FutApp empowers you to achieve your goals effortlessly. <br />
                    Experience the future today!</p>
            </div>

            <div className="flex">
                <div>
                    <h2>Community Application</h2>
                    <p>The Community Mobile Application is your one-stop solution for seamless living in your residential compound. This app connects residents to essential services, events, and each other. Enjoy features like facility booking, maintenance requests, community announcements, and exclusive deals from nearby businesses—all at your fingertips. Stay informed, engaged, and effortlessly manage your daily needs within the community.</p>
                    <div className="btn-container">
                        <span className="btn">Android</span>
                        <span className="btn">iOS</span>
                        <span className="btn">Mobile</span>
                    </div>
                    <Link to="/products">View Projects <img src="media/assets/arrow02.png" alt="arrow" /></Link>
                </div>

                <div className="flex-img">
                    <img src="media/Home/Frame217.png" alt="Projects" />
                </div>
            </div>

            <div className="home02">
                <Link to="/products"><button className="btn">View All Products</button></Link>
            </div>

            <div className="home02">
                <h1>
                    Development Process
                </h1>

                <p>Creating an application or website involves multiple stages, blending creativity, technical expertise, and project management. Here's a general overview of the process:</p>

                <div className="process-container">
                    <div className="row">
                        <div className="card">
                            Concept & Planning
                        </div>
                        <div className="card">
                            Development
                        </div>
                        <div className="card">
                            Launch
                        </div>
                    </div>

                    <div className="row">
                        <div className="card">
                            Design & Visuals
                        </div>
                        <div className="card">
                            Testing
                        </div>
                    </div>
                    <div className="process">
                    </div>
                </div>
            </div>

            <h1 className="section-title">Testimonials</h1>
            <div className="testimonials">
                <div className="testimonial-content">
                    {/* Testimonial Item 1 */}
                    <div className="testimonial-item">
                        <div className="testimonial-left">
                            <div className="testimonial-logo">
                                <img src="media/Home/Frame 265.png" alt="Testimonial Logo"/>
                            </div>
                            <div className="testimonial-text">
                                <p className="testimonial-title">CEO</p>
                                <p className="testimonial-name">"Name of person 1"</p>
                                <p className="testimonial-quote">It was a Seamless Experience with FutApp <br /> The Quality and Timeframe was Perfect <br /> Thank you FutApp for this amazing Experience</p>
                                <Link to="/">View Project</Link>
                            </div>
                        </div>
                        <div className="testimonial-right">
                            <img src="media/Home/Frame 264.png" alt="FutApp on phones" />
                            <p className="powered-by">Powered by <img src="media/home/Frame 264.png" alt="FutApp Logo" /></p>
                        </div>
                    </div>

                    {/* Testimonial Item 2 */}
                    <div className="testimonial-item">
                         <div className="testimonial-left">
                            <div className="testimonial-logo">
                                <span className="logo-p">P</span><span className="logo-re">RE</span> <span className="logo-relive">Relive.</span>
                            </div>
                            <div className="testimonial-text">
                                <p className="testimonial-title">Client</p>
                                <p className="testimonial-name">"Name of person 2"</p>
                                <p className="testimonial-quote">FutApp delivered exceptional results. Their team was professional and highly skilled. We are very happy with the final product.</p>
                                <Link to="/">View Project</Link>
                            </div>
                        </div>
                        <div className="testimonial-right">
                            <img src="media/Home/testimonial-phones.png" alt="FutApp on phones" />
                            <p className="powered-by">Powered by <img src="media/assets/futapp-logo-small.png" alt="FutApp Logo" /></p>
                        </div>
                    </div>

                    {/* Testimonial Item 3 */}
                    <div className="testimonial-item">
                         <div className="testimonial-left">
                            <div className="testimonial-logo">
                                <span className="logo-p">P</span><span className="logo-re">RE</span> <span className="logo-relive">Relive.</span>
                            </div>
                            <div className="testimonial-text">
                                <p className="testimonial-title">Partner</p>
                                <p className="testimonial-name">"Name of person 3"</p>
                                <p className="testimonial-quote">Working with FutApp was a great experience. They are innovative and responsive. Highly recommend their services.</p>
                                <Link to="/">View Project</Link>
                            </div>
                        </div>
                        <div className="testimonial-right">
                            <img src="media/Home/testimonial-phones.png" alt="FutApp on phones" />
                            <p className="powered-by">Powered by <img src="media/assets/futapp-logo-small.png" alt="FutApp Logo" /></p>
                        </div>
                    </div>

                </div>
                <div className="testimonial-pagination">
                    <span className="dot active"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>
        </div>
    );
}

export default Home;