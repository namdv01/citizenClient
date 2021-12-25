import React, { useContext, useState } from 'react';
import './menu.scss';
import logo from '../../assets/img/logo.png';
import { ColorNav } from "../../contexts/ColorNav";
import { Link } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import * as GrIcons from "react-icons/gr";
import * as GoIcons from "react-icons/go";

const Menu = () => {

    const { color, chooseTab } = useContext(ColorNav);
    const [menu, setMenu] = useState({
        items: [
            {
                title: 'Dashboard',
                path: '/',
                icon: <FaIcons.FaBars className='menuIcon' />
            },
            {
                title: 'Profile',
                path: '/profile',
                icon: <FaIcons.FaUserAlt className='menuIcon' />
            },
            {
                title: 'Manage',
                path: '/manage',
                icon: <FaIcons.FaUsersCog className='menuIcon' />
            },
            {
                title: 'Control',
                path: '/control',
                icon: <GoIcons.GoSettings className='menuIcon' />
            },
            {
                title: 'Analysis',
                path: '/analysis',
                icon: <GrIcons.GrPieChart className='menuIcon' />
            },

        ]
    });
    // console.log(color.info[color.level].backgroundColor);
    const menuItemActive = {
        'backgroundColor': color.info[color.level].backgroundColor,
        'borderRadius': '10px',
    }

    const test = {
        'backgroundColor': '#ccc'
    }

    const setActive = (e, index) => {
        chooseTab(index);
        console.log(index, color.tab);
    }

    return (
        <div className='menu' >
            <ul className='menu-list-item'>
                <li className='menuItem menu-logo'>
                    <img src={logo} className='logo' />
                </li>
                {menu.items.map((item, index) => {
                    return (
                        <li key={index} className='menuItem' style={index === color.tab ? menuItemActive : test}
                            onClick={(e) => {
                                setActive(e, index);
                            }}
                        >
                            <Link to={item.path}>
                                {item.icon}
                                <span className='menuItem-title'>{item.title}</span>
                            </Link>
                        </li>)
                })}
            </ul>
        </div>
    )
}

export default Menu;
