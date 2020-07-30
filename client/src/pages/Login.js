import React, { useState, useContext, useEffect } from 'react';
import Alert from '../components/Alert';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../css/login.css'

const Login = (props) => {
    const authContext = useContext(AuthContext);
    const [loginAlert, setLoginAlert] = useState({display: false, msg: '', color: ''});
    const { loginUser, loadUser, clearError, state: { isAuthenticated, error } } = authContext;

    useEffect(() => {
        if (localStorage.token) {
            loadUser();
        }
        if (error) { 
            setLoginAlert({display: true, msg: 'Incorrect email or password', color: 'bg-danger'});
            setTimeout(() => setLoginAlert({display: false, msg: '', color: ''}), 3000);
            clearError();
        }
        if (isAuthenticated) {
            props.history.push('/main');
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const { email, password } = loginInfo;

    const onChange = (e) => 
        setLoginInfo({...loginInfo, [e.target.name]: e.target.value});

    const onSubmit = (e) => {
        e.preventDefault();
        // display alert whenever login is failed
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
                <div className={loginAlert.display ? "mt-2" : "mt-5"} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <div className="test">
                        <div align="center">{loginAlert.display && <Alert msg={loginAlert.msg} color={loginAlert.color}/>}</div>
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
                                        required
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
                                        required
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
