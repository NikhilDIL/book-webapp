import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../css/login.css'

const Login = () => {
    const authContext = useContext(AuthContext);
    const { loginUser } = authContext;

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const { email, password } = loginInfo;

    const onChange = (e) => 
        setLoginInfo({...loginInfo, [e.target.name]: e.target.value});

    const onSubmit = (e) => {
        e.preventDefault();
        loginUser({
            email,
            password
        });
        setLoginInfo({
            email: '',
            password: ''
        });
    }

    return (
            <div className="login-imgbg">
                <h1 className="pt-5" style={{textAlign:"center", fontSize: "7vw"}}>My Book List</h1>
                <div className="login-box">
                    <form className="container" onSubmit={onSubmit}>
                        <h1 className="mt-4">USER LOGIN</h1>
                        <div className="login-inputs">
                            <input type="email" 
                                placeholder="Email" 
                                name="email" 
                                value={email}
                                className="mt-3 mb-4" 
                                onChange={onChange}
                            />
                            <input type="password"
                                placeholder="Password" 
                                name="password" 
                                value={password}
                                className="mb-4" 
                                onChange={onChange}
                            />
                        </div>
                        <div className="login-button">
                            <input type="submit" value="Login" className="btn btn-dark"/>
                        </div>
                        <Link to="/register" className="link">Create New Account</Link>
                    </form>
                </div>
            </div>
    );
}

export default Login;
