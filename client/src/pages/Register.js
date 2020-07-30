import React, { useState, useContext, useEffect } from 'react';
import Alert from '../components/Alert';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../css/register.css';

const Register = (props) => {
    const authContext = useContext(AuthContext);
    const [registerAlert, setRegisterAlert] = useState({display: false, msg: '', color: ''});
    const [registerInfo, setRegisterInfo] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { username, email, password, confirmPassword } = registerInfo;
    const { registerUser, clearError, state: { isAuthenticated, error } } =  authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/main');
        }
        if (error) {
            setRegisterAlert({display: true, msg: 'Email is already taken', color: 'bg-danger'});
            setTimeout(() => setRegisterAlert({display: false, msg: '', color: ''}), 3000);
            clearError();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const onChange = (e) => {
        setRegisterInfo({...registerInfo, [e.target.name]: e.target.value});
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setRegisterAlert({display: true, msg: 'Passwords do not match', color: 'bg-danger'});
            setTimeout(() => setRegisterAlert({display: false, msg: '', color: ''}), 3000);
            return;
        }
        registerUser({
            username,
            email,
            password
        });
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
                    <div align="center">{registerAlert.display && <Alert msg={registerAlert.msg} color={registerAlert.color}/>}</div>
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
                                        required
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
                                    minLength="6"
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="password" 
                                    name="confirmPassword" 
                                    value={confirmPassword}
                                    className="form-control" 
                                    placeholder="Confirm Password"
                                    onChange={onChange}
                                    required
                                    minLength="6"
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
