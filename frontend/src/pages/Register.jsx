import React from 'react';
import Form from "../components/form"; 
import { Link } from 'react-router-dom';

function Register() {
    return (
        <div>
            <Form route="/api/user/register/" method="register" /> 
            <div className="button-container">
                <p>
                    Already have an account?{' '}
                    <Link to="/login">Login here</Link> 
                </p>
            </div>
        </div>
    );
}

export default Register;