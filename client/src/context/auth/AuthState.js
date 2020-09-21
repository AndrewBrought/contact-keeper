import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from "../../utils/setAuthToken";
import {
 REGISTER_SUCCESS,
 REGISTER_FAIL,
 USER_LOADED,
 AUTH_ERROR,
 LOGIN_SUCCESS,
 LOGIN_FAIL,
 LOGOUT,
 CLEAR_ERRORS
} from '../types';

const AuthState = props => {
    const initialState = {
       token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load User - this will take care of checking which user is logged in, it will hit the auth endpoint and get the user data
    const loadUser = async () => {
    //    @todo - load token into global headers
        if(localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const res = await axios.get('/api/auth');

            dispatch({
                type: USER_LOADED,
                payload: res.data // this is the user data
            });//this route will check your token and see if you're a valid user
        } catch (err) {
            dispatch({ type: AUTH_ERROR });
        }
    };


    // Register User - does just that, sign the user up, get the token back
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            //we can shortcut the url because we added the proxy value of localhost:5000 in our package.json
            const res = await axios.post('/api/users', formData, config);

            dispatch({
               type: REGISTER_SUCCESS,
               payload: res.data //this response will be the token
            });

            await loadUser(); //this function (created above) is called once we register
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg // this response will be the message: this user already exists, setup in our user.js
            });
        }
    }

    // Login User - logs the user in, get the token
    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            //we can shortcut the url because we added the proxy value of localhost:5000 in our package.json
            const res = await axios.post('/api/auth', formData, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data //this response will be the token
            });

            await loadUser(); //this function (created above) is called once we register
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg // this response will be the message: this user already exists, setup in our user.js
            });
        }
    }

    // Logout - destroy the token, clear everything up
    const logout = () => console.log('logout user');

    //Clear Errors - clears out any errors in the state
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    // Here is where we return our provider so we can wrap the entire application with this context
    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                loadUser,
                login,
                logout,
                clearErrors
            }}>
            { props.children }
        </AuthContext.Provider>
    );
};

export default AuthState;
