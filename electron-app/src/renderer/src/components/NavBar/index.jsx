import React from 'react';
import "./style.css";
import { Link } from 'react-router-dom';
// import { Icon } from '@iconify/react/dist/iconify.js';
const NavBar = () => {
    return (
        <>
        <nav className='navbar flex flex-row'>
            <h1>DeskShot</h1>
            <ul className='flex flex-row'>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/uploadPhoto">Upload Photo</Link></li>
            </ul>
            <div>
            {/* <Icon className='setting_icon' icon="line-md:cog-filled-loop" width="24" height="24" /> */}
            </div>

        </nav>
        <div className="border-bottom"></div>
        </>
    );
};

export default NavBar;
