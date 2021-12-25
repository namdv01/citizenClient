import { LOGIN, SET_AUTH } from "./types";

export const login = (state, action) => {
    const { type, payload: { isAuth, user } } = action;
    switch (type) {
        case LOGIN:
            const token = localStorage.getItem('token');
            if (token) state = JSON.parse(token);
            return state;
        case SET_AUTH:
            return {
                ...state,
                isAuth,
                user
            }
        default:
            return state;
    }
}