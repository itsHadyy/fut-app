import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './AdminStyles.css'; // Import admin specific styles

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Redirect to admin dashboard after successful login
            navigate('/admin');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="admin-auth-container">
            <h1>Admin Login</h1>
            <form onSubmit={handleLogin} className="admin-auth-form">
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
                <button type="submit" className="auth-btn">Login</button>
            </form>
            <p>Don't have an account? <a href="/admin/signup">Register here</a></p>
        </div>
    );
}

export default AdminLogin; 