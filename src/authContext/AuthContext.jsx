import React, { useState, useEffect } from 'react';
import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 
export const AuthContext = createContext(undefined);

const AuthProvider = ({ children }) => {
    const [isRegistered, setIsRegistered] = useState(!!Cookies.get('RegisterFormData'));
    const navigate = useNavigate();

    useEffect(() => {
        if (isRegistered) {
            // navigate('/home');
        }
    }, [isRegistered, navigate]);

    const handleLog = () => {
        if (!isRegistered) {
            navigate('/register');
        } else {
            navigate('/home');
        }
    };

    const handleRegistration = (data) => {
        Cookies.set('RegisterFormData', JSON.stringify(data));
        setIsRegistered(true);
        navigate('/home');
    };

    // const handleLogout = () => {
    //     Cookies.remove('credentials');
    //     localStorage.removeItem('SignupData');
    //     setIsRegistered(false);
    //     navigate('/login');
    // };

    return (
        <AuthContext.Provider value={{ handleLog, handleRegistration }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
