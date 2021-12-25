import React, { createContext, useState } from "react";

export const Theme = createContext();

const ThemeProvider = ({ children }) => {
    const [state, setState] = useState({
        isLight: true,
        light: {
            background: 'rgb(240,240,240)',
            color: 'black'
        },
        dark: {
            background: 'rgb(39,39,39)',
            color: 'white'
        }
    });
    const themeData = {
        theme: state
    }
    return (
        <Theme.Provider value={themeData} >
            {children}
        </Theme.Provider>
    )
}

export default ThemeProvider;