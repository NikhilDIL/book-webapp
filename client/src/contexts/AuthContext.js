import React, { createContext, useReducer } from 'react';
import { authReducer } from '../reducers/authReducer';
import setAuthToken from '../setAuthToken';
import axios from 'axios';

export const AuthContext = createContext();

const AuthState = (props) => {
    const [state, dispatch] = useReducer(authReducer, {
        token: localStorage.getItem('token'),
        isAuthenticated: false,
        user: null,
        error: null,
        loading: true
    });

    const verifyPassword = async data => {
        try {
            await axios.post('/api/auth', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return true;
        } catch (err) {
            return false;
        }
    }

    const changeEmail = async data => {
        await axios.put(`/api/auth/${state.user._id}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const changePassword = async data => {
        try {
            const res = await axios.put(`/api/auth/${state.user._id}`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            dispatch({ type: 'CHANGE_PASSWORD', payload: res.data});
        } catch (err) {
            dispatch({
                type: 'CHANGE_PASS_FAIL',
                payload: err.response.data.msg
            });
        } 
    }

    const loginUser = async data => {
        try {
            const res = await axios.post('/api/auth', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            dispatch({type: 'LOGIN_SUCCESS', payload: res.data});
            loadUser();
        } catch (err) {
            dispatch({
                type: 'LOGIN_FAILURE',
                payload: err.response.data.msg
            });
        }
    }

    const logoutUser = () => dispatch({type: 'LOGOUT'});

    const registerUser = async data => {
        try {
            const res = await axios.post('/api/users', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            dispatch({
                type: 'REGISTER_SUCCESS',
                payload: res.data
            });
            loadUser();
        } catch (err) {
            dispatch({
                type: 'REGISTER_FAILURE',
                payload: err.response.data.msg
            });
        }
    }

    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get('/api/auth');
            dispatch({type: 'LOAD_USER', payload: res.data});
        } catch (err) {
            dispatch({type: 'AUTH_ERROR'})
        }
    }

    return (
        <AuthContext.Provider value={{ state, registerUser, loadUser, loginUser, logoutUser, changePassword, changeEmail, verifyPassword }}>
          {props.children}
        </AuthContext.Provider>
    );
}

export default AuthState;