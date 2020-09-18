import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
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

    // Register User - does just that, sign the user up, get the token back

    // Login User - logs the user in, get the token

    // Logout - destroy the token, clear everything up

    //Clear Errors - clears out any errors in the state

    // Here is where we return our provider so we can wrap the entire application with this context
    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
            }}>
            { props.children }
        </AuthContext.Provider>
    );
};

export default AuthState;
