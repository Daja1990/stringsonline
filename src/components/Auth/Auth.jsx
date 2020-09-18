import React, { useState, useEffect, useContext, createContext, useCallback, useMemo } from 'react';
import { Route, Redirect } from 'react-router-dom';
import JwtDecode from 'jwt-decode';

const AuthContext = createContext({
    loggedIn: false,
    user: null,
    login: () => {},
    logout: () => {},
});

export function AuthProvider(props) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if(!user) {
            const access_token = sessionStorage.getItem('token');
            const user_id = sessionStorage.getItem('user_id');
            if(access_token && user_id) {
                setUser({
                    access_token,
                    user_id
                })
            }

        }
    }, [user, setUser]);

    const login = useCallback((username, password) => {
        // Deklarerer headers
        const headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
    
        // Deklarerer user data (username + password)
        const urlencodedBody = new URLSearchParams();
        urlencodedBody.append("username", username);
        urlencodedBody.append("password", password);
    
        // Deklarerer request options
        let requestOptions = {
            method: "POST",
            headers: headers,
            body: urlencodedBody,
            redirect: "follow",
        };
    
        // Kalder login i API - returnerer array med token hvis true
        fetch("https://api.mediehuset.net/token", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log("login -> result", result)
            // Hvis bruger findes
            if (result.access_token) {
            const decodedTokenInfo = JwtDecode(result.access_token);
            setUser({...result, tokenInfo: decodedTokenInfo});
            // Smid token og user id ned i session storage
            // Så kan vi tilgå dem derfra indtil at browser vinduet lukkes
            sessionStorage.setItem("token", result.access_token);
            sessionStorage.setItem("user_id", result.user_id);
            }
            return result
        }).catch(err => {
            console.error(err);
            return err
        })
    }, [setUser]);
    
    const logout = useCallback(() => {
        setUser(null);
        sessionStorage.clear();
    }, [setUser]);    

    const value = useMemo(() => {
        const loggedIn = !!user;

        return {
            loggedIn,
            user,
            login,
            logout,
        };
    }, [user, login, logout]);

    return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    );
}

export default function useAuth() {
    return useContext(AuthContext);
  }

export function AuthRoute(props) {
    const { loggedIn } = useAuth();
    if(!loggedIn) return <Redirect to="/login" />
    return <Route {...props} />
  }