import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        });

        // Clean up the listener on component unmount
        return () => unsubscribe();
    }, []);

    if (isAuthenticated === null) {
        // Optionally, show a loading spinner while checking auth state
        return <div>Loading...</div>; 
    }

    return isAuthenticated ? children : <Navigate to="/admin/login" />;
}

export default ProtectedRoute; 