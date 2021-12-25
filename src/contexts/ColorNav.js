import { login } from "../reducers/login";
import { api } from "./constants";
import React, { createContext, useState, useReducer, useEffect } from "react";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
export const ColorNav = createContext();

const ColorNavProvider = ({ children }) => {
    const [color, setColor] = useState({
        info: {
            'A1': {
                backgroundColor: '#ff3399',
                length: 32
            },
            'A2': {
                backgroundColor: '#00ccff',
                length: 2
            },
            'A3': {
                backgroundColor: 'yellow',
                length: 4
            },
            'B1': {
                backgroundColor: '#00ff00',
                length: 6
            },
            'B2': {
                backgroundColor: 'orange',
                length: 8
            }

        },
        level: 'A1',
        tab: 0,
        route: [
            '/dashboard',
            '/profile',
            '/manage',
            '/control',
            '/analysis'
        ]
    });

    const [auth, dispatch] = useReducer(login, {
        isAuth: false,
        user: null,
    });
    const loginUser = async (form) => {
        try {
            const response = await axios.post(`${api}/web/login`, form);
            if (response.data.result === 'login success') {
                localStorage.setItem('token', response.data.token);
            }
            await verifyUser();
            return response.data;
        } catch (error) {
            return error;
        }
    }
    const verifyUser = async () => {
        if (localStorage['token']) {
            console.log(localStorage['token']);
            setAuthToken(localStorage['token']);
        }
        else {
            setAuthToken(null);
            dispatch({
                type: 'SET_AUTH',
                payload: { isAuth: false, user: null }
            })
        }
        try {
            const response = await axios.get(`${api}/testToken`);
            console.log(response.data);
            if (response.data.result == 'verify token success') {
                const level = response.data.level;
                setColor({ ...color, level });
                dispatch({
                    type: 'SET_AUTH',
                    payload: { isAuth: true, user: response.data.user }
                })
            }
        } catch (error) {
            localStorage.removeItem('token');
            setAuthToken(null);
            dispatch({
                type: 'SET_AUTH',
                payload: { isAuth: false, user: null }
            })
        }
    }

    useEffect(() => verifyUser(), []);

    const chooseColor = (index) => {
        setColor({ ...color, level: index });
    }
    const chooseTab = (index) => {
        setColor({ ...color, tab: index });
    }
    const setSelf = (value) => {
        auth.user.isToggle = false;
    }
    const colorNavData = {
        color,
        chooseColor,
        chooseTab,
        loginUser,
        auth,
        setSelf,
        verifyUser
    }

    return <ColorNav.Provider value={colorNavData}>
        {children}
    </ColorNav.Provider>
}

export default ColorNavProvider;