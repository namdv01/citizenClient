import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as GrIcons from "react-icons/gr";
import * as GoIcons from "react-icons/go";

export const MenuItems = [
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
