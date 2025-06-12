import React, { useState } from 'react';

function Contact() {
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        request: '',
        notes: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch('http://localhost:8080/api/contact-page', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: 'Message sent successfully!' });
                setFormData({ email: '', phone: '', request: '', notes: '' });
            } else {
                setStatus({ type: 'error', message: data.message || 'Failed to send message' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
        }

        setLoading(false);
    };

    return (
        <>
            <div className="services-banner contact-banner">
                <div className='banner-content'>
                    <h1>Here to <br /><strong>Support</strong> you</h1>
                    <p>Innovate, Integrate, Inspire: Your Software Solutions Partner.</p>
                </div>
            </div>

            <div className="contact">
                <h1>Contact Us</h1>
                <h3>We'd love to hear from you!</h3>
                <p>Fill out your request, and our team will reach out within <b>3 working days</b> <br />
                    We're here to assist you!</p>

                {status.message && (
                    <div className={`${status.type}-message`}>
                        {status.message}
                    </div>
                )}

                <form className="contact-form" onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        name="email"
                        placeholder="E-mail" 
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type="text" 
                        name="phone"
                        placeholder="Phone Number" 
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    <div>
                        <label>Request</label>
                        <table>
                            <tr>
                                <td>
                                    <input 
                                        type="radio" 
                                        className="radio"
                                        value="Mobile Application" 
                                        name="request"
                                        checked={formData.request === 'Mobile Application'}
                                        onChange={handleChange}
                                        required
                                    />
                                </td>
                                <td>Mobile Application</td>
                            </tr>
                        </table>
                        <table>
                            <tr>
                                <td>
                                    <input 
                                        type="radio" 
                                        className="radio"
                                        value="Website Development" 
                                        name="request"
                                        checked={formData.request === 'Website Development'}
                                        onChange={handleChange}
                                    />
                                </td>
                                <td>Website Development</td>
                            </tr>
                        </table>
                        <table>
                            <tr>
                                <td>
                                    <input 
                                        type="radio" 
                                        className="radio"
                                        value="Smart Systems" 
                                        name="request"
                                        checked={formData.request === 'Smart Systems'}
                                        onChange={handleChange}
                                    />
                                </td>
                                <td>Smart System</td>
                            </tr>
                        </table>
                    </div>
                    <textarea 
                        name="notes"
                        placeholder="Notes" 
                        value={formData.notes}
                        onChange={handleChange}
                        required
                    ></textarea>
                    <button 
                        className="send-message-btn"
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Connect'}
                    </button>
                </form>
            </div>
        </>
    )
}

export default Contact;