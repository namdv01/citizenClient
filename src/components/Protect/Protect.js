import React, { useContext } from 'react'
import { Route, Redirect } from "react-router-dom"
import { ColorNav } from '../../contexts/ColorNav'
import Menu from '../Menu/Menu';
import Navheader from '../Navheader/Navheader';
import './protect.scss';
const Protect = ({ component: Component, ...rest }) => {
    const { color, chooseColor, loginUser, auth } = useContext(ColorNav);
    // console.log(Component);
    return (
        <Route {...rest}>
            {auth.isAuth ?
                <div className='wrapper'>
                    <Menu />
                    <div className='contentNav'>
                        <Navheader user={auth} />
                        <Component {...rest} user={auth} />
                    </div>
                </div> :
                <Redirect to='/login' />}
        </Route>
    )
}

export default Protect
