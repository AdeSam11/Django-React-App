import React from 'react'; 
import Form from "../components/form"; 
import { Link } from 'react-router-dom'; 

function Login() {
    return (
        <div>
            <Form route="/api/token/" method="login" /> 
            <div className="button-container">
                <p>
                    Do not have an account?{' '}
                    <Link to="/register">Register here</Link> 
                </p>
            </div>
        </div>
    );
}

export default Login;