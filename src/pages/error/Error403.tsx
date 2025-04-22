import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error403: React.FC = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    };

    return (
        <div className="error-403">
            <h1>403</h1>
            <p>Oops! You do not have permission to access this page.</p>
            <p>Please contact the administrator if you believe this is an error.</p>
            <p>Or you can go back to the homepage.</p>
            <button onClick={goHome}>Go to Homepage</button>
        </div>
    );
};

export default Error403;