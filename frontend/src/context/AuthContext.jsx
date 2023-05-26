import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode'

const AuthContext = createContext({
    isAuthenticated: false,
    login: () => { },
    logout: () => { },
});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null);
    const [loading, setLoading]= useState(false)

    useEffect(() => {
        if (getToken()) {
            setToken(getToken())
            setUser(getUser())
            //alert(JSON.stringify(getUser(), null, 4))
        }
    }, []);


    const getUser = () => {
        return localStorage.getItem("token")
            ? jwt_decode(localStorage.getItem("token"))
            : null;
    };

    const getToken = () => {
        return localStorage.getItem("token");
    };

    const login = async (email, password) => {
        try {
            setLoading(true)
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/api/user/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.token) {
                localStorage.setItem('token', data.token);
                setToken(data.token)
                setUser(jwt_decode(data.token))
                setLoading(false)
                return data
            } else if(data){
                setLoading(false)
                return data
            } else {
                setLoading(false)
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            return false
        }
    };


    const signup = async (
        firstName, 
        lastName, 
        email, 
        phoneNumber, 
        password, 
        role
    ) => {
        try {
            setLoading(true)
            const response = await fetch(
                process.env.REACT_APP_BACKEND_URL+'/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    password,
                    role
                }),
            });

            const data = await response.json();

            if (data.token) {
                localStorage.setItem('token', data.token);
                setToken(data.token)
                setUser(jwt_decode(data.token))
                setLoading(false)
                return data.token
            } else {
                setLoading(false)
                throw new Error('Signup failed');
                return false
            }
        } catch (error) {
            console.error('Signup error:', error);
        }
    };


    const logOut = () => {
        localStorage.removeItem('token');
        setToken(null)
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            login,
            logOut,
            signup,
            user,
            token,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
