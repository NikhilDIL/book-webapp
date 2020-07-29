import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../css/login.css'

const Login = (props) => {
    const authContext = useContext(AuthContext);
    const { loginUser, loadUser, state: { isAuthenticated } } = authContext;

    useEffect(() => {
        if (localStorage.token) {
            loadUser();
        }

        if (isAuthenticated) {
            props.history.push('/main');
        }
        // eslint-disable-next-line
    }, [isAuthenticated, props.history]);

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
                <h1 className="login-heading pt-5" style={{textAlign:"center"}}>My Book List</h1>
                <div className="mt-5" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <div className="test">
                        <form onSubmit={onSubmit}>
                            <div className="col">
                                <div className="form-group mt-3">
                                    <input 
                                        type="email" 
                                        name="email" 
                                        value={email}
                                        className="form-control" 
                                        placeholder="Email"
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="password" 
                                        name="password" 
                                        value={password}
                                        className="form-control" 
                                        placeholder="Password"
                                        onChange={onChange}
                                    />
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-dark btn-block">Login</button>
                                </div>
                                <Link to="/register" 
                                className="mt-3"
                                style={{display: "flex", justifyContent: "center", textDecoration: "none", color: "white"}}>
                                    Create New Account
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    );
}

export default Login;
