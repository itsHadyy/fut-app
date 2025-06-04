function Contact() {
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

                <form className="contact-form">
                    <input type="email" placeholder="E-mail" />
                    <input type="text" placeholder="Phone Number" />
                    <div>
                        <label>Request</label>
                        <table>
                            <tr>
                                <td>
                                    <input type="radio" className="radio"value="Mobile Application" name="request" />
                                </td>
                                <td>Mobile Application</td>
                            </tr>
                        </table>
                        <table>
                            <tr>
                                <td>
                                    <input type="radio" className="radio"value="Website Development" name="request" />
                                </td>
                                <td>Website Development</td>
                            </tr>
                        </table>
                        <table>
                            <tr>
                                <td>
                                    <input type="radio" className="radio"value="Smart Systems" name="request" />
                                </td>
                                <td>Smart System</td>
                            </tr>
                        </table>
                    </div>
                    <textarea placeholder="Notes" onResize={false}></textarea>
                    <button className="send-message-btn">Connect</button>
                </form>
            </div>
        </>
    )
}

export default Contact;