import React, { useContext, useState, useEffect } from 'react';
import { ColorNav } from "../../contexts/ColorNav";
import './navheader.scss';
import * as FaIcons from "react-icons/fa";
import * as FcIcons from "react-icons/fc";
import * as FiIcons from "react-icons/fi";
import { useHistory, Redirect } from 'react-router-dom';

const Navheader = (props) => {
    const history = useHistory();
    const { verifyUser } = useContext(ColorNav);
    const logout = (e) => {
        localStorage.removeItem('token');
        verifyUser();
    }
    // useEffect(() => {

    // }, [])
    console.log(props.user);

    return (
        <div className='border-navheader'>
            <div className='navheader'>
                <li className='user'>
                    <FaIcons.FaUserCircle className='avatar' />
                    user: {props.user.user.location}
                    <div className='logout' onClick={(e) => { logout(e) }}>
                        <FiIcons.FiLogOut className='iconLogout' />
                        <span>Log out</span>
                    </div>
                </li>
                {/* <li className='setting'>
                    <FcIcons.FcSettings className='iconSetting' />
                    setting
                </li> */}
            </div>
        </div>
    )
}

export default Navheader
