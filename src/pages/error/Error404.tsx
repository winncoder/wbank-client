import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error404: React.FC = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    };

    return (
        <div className="error-404">
            <h1>404</h1>
            <p>Oops! The page you are looking for does not exist.</p>
            <button onClick={goHome}>Go to Homepage</button>
        </div>
    );
};

export default Error404;