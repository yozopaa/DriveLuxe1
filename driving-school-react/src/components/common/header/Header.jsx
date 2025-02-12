// Header.js
import React, { useState, useEffect } from 'react'
import './header.css'
import {Link, useHistory} from 'react-router-dom';
import { Avatar, Menu, MenuItem } from '@mui/material';

const Header = () => {
    const [navlist, setNavlist] = useState(false);
    const [user, setUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const userData = sessionStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        setUser(null);
        handleClose();
        history.push('/login');
    };

    return (
        <>
            <header>
                <div className="top flex">
                    <div className="left">
                        <i className='fa fa-location-dot'></i>
                        <span className='street'>188 rue 142N, Casa Blanca, Morocco</span>
                        <i className='far fa-clock'></i>
                        <span>Lun - Ven : 09h00 - 21h00</span>
                    </div>
                    <div className="right flex">
                        <div>
                            <i className='fa fa-phone'></i>
                            <a 
                                href="https://wa.me/212612345678" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ textDecoration: 'none', color:"white" }}
                            >
                                <span className='phone'>+212 613-427395</span>
                            </a>
                        </div>
                        <ul className='flex'>
                            <li>
                                <a href=""><i className='fab fa-facebook-f'></i></a>
                            </li>
                            <li>
                                <a href=""><i className='fab fa-twitter'></i></a>
                            </li>
                            <li>
                                <a href=""><i className='fab fa-linkedin-in'></i></a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/yozopaa/"><i className='fab fa-instagram'></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="head flex">
                    <div className="logo" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="50" viewBox="0 0 24 24" style={{margin:"-10px", paddingRight:"5px"}}>
                            <path d="M23.5 7c.276 0 .5.224.5.5v.511c0 .793-.926.989-1.616.989l-1.086-2h2.202zm-1.441 3.506c.639 1.186.946 2.252.946 3.666 0 1.37-.397 2.533-1.005 3.981v1.847c0 .552-.448 1-1 1h-1.5c-.552 0-1-.448-1-1v-1h-13v1c0 .552-.448 1-1 1h-1.5c-.552 0-1-.448-1-1v-1.847c-.608-1.448-1.005-2.611-1.005-3.981 0-1.414.307-2.48.946-3.666.829-1.537 1.851-3.453 2.93-5.252.828-1.382 1.262-1.707 2.278-1.889 1.532-.275 2.918-.365 4.851-.365s3.319.09 4.851.365c1.016.182 1.45.507 2.278 1.889 1.079 1.799 2.101 3.715 2.93 5.252zm-16.059 2.994c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm10 1c0-.276-.224-.5-.5-.5h-7c-.276 0-.5.224-.5.5s.224.5.5.5h7c.276 0 .5-.224.5-.5zm2.941-5.527s-.74-1.826-1.631-3.142c-.202-.298-.515-.502-.869-.566-1.511-.272-2.835-.359-4.441-.359s-2.93.087-4.441.359c-.354.063-.667.267-.869.566-.891 1.315-1.631 3.142-1.631 3.142 1.64.313 4.309.497 6.941.497s5.301-.184 6.941-.497zm2.059 4.527c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm-18.298-6.5h-2.202c-.276 0-.5.224-.5.5v.511c0 .793.926.989 1.616.989l1.086-2z" fill="#f3be00b2"/>
                        </svg>
                        <span>DriveLuxe</span>
                    </div>
                    <div className="right flex">
                        <div className="nav">
                            <ul className={navlist ? "small flex1" : "flex"}>
                                <li><Link to='/'>Accueil</Link></li>
                                <li><Link to='/about'>À propos</Link></li>
                                <li><Link to='/courses'>Cours</Link></li> 
                                <li className='pages'>
                                    <span>Pages</span>
                                    <i className="fa fa-chevron-down arrow"></i>
                                    <div className='inside'>
                                        <li><Link to='/features'>Caracterestiques</Link></li>
                                        <li><Link to='/appointment'>Rendez-vous</Link></li>
                                        <li><Link to='/our-team'>Notre équipe</Link></li>
                                        <li><Link to='/testimonial'>Témoignages</Link></li>
                                    </div>
                                </li>
                                <li><Link to='/contact'>Contact</Link></li>
                            </ul>
                        </div>
                        {user ? (
                            <div className="user-profile" onClick={handleClick} >
                                <button className="btn1">
                                    <Avatar 
                                        sx={{ 
                                            width: 30, 
                                            height: 30,
                                            bgcolor: 'white',
                                            color: '#f3be00b2',
                                            marginRight: '8px',
                                            fontSize: '16px'
                                        }}
                                    >
                                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                    </Avatar>
                                    {user.name.slice(0)}
                                    <i className='fa fa-chevron-down' style={{ marginLeft: '8px', fontSize: '14px' }}></i>
                                </button>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={() => {
                                        handleClose();
                                        history.push(`/${user.role}/profile/${user.email}`);
                                    }}>Profile</MenuItem>
                                    <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
                                </Menu>
                            </div>
                        ) : (
                            <Link to='/login'>
                                <button className="btn1">
                                    Se connecter <i className='fa fa-arrow-right'></i>
                                </button>
                            </Link>
                        )}
                    </div>
                    <div className="toggle">
                        <button onClick={() => setNavlist(!navlist)}>
                            {navlist ? <i className="fa fa-times"></i> : <i className="fa fa-bars"></i>}
                        </button>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header