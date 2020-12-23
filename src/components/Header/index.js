import React from 'react';
import './styles.scss';
import Logo from '../../assets/LogoTemp.png';
import { Link } from "react-router-dom";
const Header = props => {
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} style={{height: "50px" }} alt="Logo here"/>
                    </Link>
                </div>

                <div className="callToActions">
                    <ul>
                        <li>
                            <Link to="/registration">
                                Register
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;