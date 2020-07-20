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
    const { registerUser, loadUser, state: { isAuthenticated } } =  authContext;

    useEffect(() => {
        loadUser();
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
            <h1 className="pt-5" style={{textAlign:"center", fontSize: "7vw"}}>My Book List</h1>
            <div className="register-box">
                <form className="register-form" onSubmit={onSubmit}>
                    <h1 className="mt-4">CREATE ACCOUNT</h1>
                        <input type="text"
                            placeholder="Username"
                            name="username"
                            value={username} 
                            className="mt-3 mb-4"
                            onChange={onChange}
                        />
                        <input type="email" 
                            placeholder="Email"
                            name="email"
                            value={email} 
                            className="mb-4"
                            onChange={onChange}
                        />
                        <input type="password" 
                            placeholder="Password"
                            name="password"
                            value={password} 
                            className="mb-4"
                            onChange={onChange}
                        />
                        <input type="password" 
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={confirmPassword} 
                            className="mb-4"
                            onChange={onChange}
                        />
                    <div className="register-button">
                        <input type="submit" value="Register" className="btn btn-dark"/>
                    </div>
                    <Link className="link mt-3" to="/">Already Have An Account?</Link>
                </form>
            </div>
        </div>
    );
}

export default Register;
