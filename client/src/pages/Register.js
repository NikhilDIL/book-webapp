import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../css/register.css';

const Register = (props) => {
    const authContext = useContext(AuthContext);
    const [registerInfo, setRegisterInfo] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { username, email, password, confirmPassword } = registerInfo;
    const { registerUser, state: { isAuthenticated } } =  authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/main');
        }
        // eslint-disable-next-line
    }, [isAuthenticated, props.history]);

    const onChange = (e) => {
        setRegisterInfo({...registerInfo, [e.target.name]: e.target.value});
    }

    const onSubmit = (e) => {
        e.preventDefault();
        // check if email already exists
        // add password == confirmPassword check
        registerUser({
            username,
            email,
            password
        })
        setRegisterInfo({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    }

    return ( // MODIFY TO ADD USERNAME
        <div className="login-imgbg">
            <h1 className="login-heading pt-5" style={{textAlign:"center"}}>My Book List</h1>
            <div className="mt-4" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <div className="test">
                    <form onSubmit={onSubmit}>
                        <div className="col">
                            <div className="form-group mt-3">
                                    <input 
                                        type="text" 
                                        name="username" 
                                        value={username}
                                        className="form-control" 
                                        placeholder="Username"
                                        onChange={onChange}
                                    />
                            </div>
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
                            <div className="form-group">
                                <input 
                                    type="confirmPassword" 
                                    name="confirmPassword" 
                                    value={confirmPassword}
                                    className="form-control" 
                                    placeholder="Confirm Password"
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <button type="submit" className="btn btn-dark btn-block">Register</button>
                            </div>
                            <Link to="/" 
                            className="mt-3"
                            style={{display: "flex", justifyContent: "center", textDecoration: "none", color: "white"}}>
                                Already Have An Account?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
