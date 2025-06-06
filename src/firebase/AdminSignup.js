import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './AdminStyles.css'; // Import admin specific styles

function AdminSignup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // Redirect to admin dashboard or login after successful registration
            navigate('/admin'); 
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="admin-auth-container">
            <h1>Admin Registration</h1>
            <form onSubmit={handleSignup} className="admin-auth-form">
                <div className="form-group">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="auth-btn">Register</button>
            </form>
            <p>Already have an account? <a href="/admin/login">Login here</a></p>
        </div>
    );
}

export default AdminSignup; 