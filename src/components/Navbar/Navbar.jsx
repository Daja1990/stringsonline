import React from 'react';
import "./Navbar.scss";
import routes from '../Router/routes';
import { NavLink } from 'react-router-dom';
import { slide as Menu } from "react-burger-menu";
import headerimg from '../images/header-bg.png';
import mail from '../images/mail-icon.svg';
import phone from '../images/phone-icon.svg';
import basket from '../images/cart-icon.svg';
import SearchComponent from '../SearchComponent/SearchComponent';
import GuitarFetch from '../Fetches/GuitarFetch/GuitarFetch';
import BassFetch from '../Fetches/BassFetch/BassFetch';
import OtherFetch from '../Fetches/OtherFetch/OtherFetch';
import KeyboardFetch from '../Fetches/KeyboardFetch/KeyboardFetch';
import BrandFetch from '../Fetches/BrandFetch/BrandFetch';


const Li = props => {
    const { name, exact, path } = props;

    // Navbar grundform, ud fra routes.js

    return (
        <li>
            <NavLink to={path} exact={exact}>
                {name}
            </NavLink>
        </li>
    );
}

export default function Navbar(props) {

    // Almindelig Navbar

    return (
        <div className="navpush">
        <nav className="full-nav">
            <div className="text-block">
            <img className="icons" src={mail} alt="Logo" />
            <p className="navtext">SALES@STRINGONLINE.COM</p>
            <img className="icons" src={phone} alt="Logo" />
            <p className="navtext"> +45 98 12 22 68</p>
            <NavLink to="/Cart">
            <img className="icons" src={basket} alt="Logo" />
            </NavLink>
            </div>
            <ul>
                <img className="nav-img" src={headerimg} alt="Logo" />
                {routes.map((navelement, i) => {
                    if (!navelement.hidden){
                        return (
                            <Li key={navelement.name}
                            {...navelement}
                            />
                            );
                        }
                    })}
                <NavLink to="/Login">
                    <button className="nav-login">Login</button>
                </NavLink>
            </ul>
        </nav>

        {/* Indsættelse af søgefunktionen som komponent */}

        <SearchComponent />


{/* Mobil Navbar / react-burger-menu */}

        <div className="burger-nav">
        <Menu right {...props}>
            <nav className="burger-nav">
                <ul>
                {routes.map((navelement, i) => {
                    // console.log(navelement);
                    if (!navelement.hidden){
                        return (
                            <div key={i}>
                        <Li key={navelement.name}
                        {...navelement}
                        />
                        </div>
                        );
                    }
                })}
                </ul>
            </nav>
            <div className="sidebar-move">
                <br />
                <GuitarFetch />
                <BassFetch />
                <OtherFetch />
                <KeyboardFetch />
                <BrandFetch />
                </div>
        </Menu>
            </div>
            </div>
    );
}