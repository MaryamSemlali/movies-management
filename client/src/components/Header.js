import React, { useState } from 'react';
import {NavLink} from 'react-router-dom';
import LineIcon from 'react-lineicons';

function Header(){
    const [navigationToggler, setNavigationToggler] = useState(false);

    const handleNavigationToggler = () =>{
        setNavigationToggler(!navigationToggler);
    }

    return (
        <nav className={navigationToggler ? "mi-header is-visible" : "mi-header"}>
            <button onClick={handleNavigationToggler} className="mi-header-toggler">
                {!navigationToggler ? <LineIcon name="menu" /> : <LineIcon name="close" />}
            </button>
            <div className="mi-header-inner">
                <div className="mi-header-image">
                </div>

                <ul className="mi-header-menu">
                    <li><NavLink exact to="/"><span>Home</span></NavLink></li>
                    <li><NavLink to="/users"><span>Users</span></NavLink></li>
                    <li><NavLink to="/movies"><span>Movies</span></NavLink></li>
                </ul>
                <p className="mi-header-copyright"></p>
            </div>
        </nav>
    )
}


export default Header;
