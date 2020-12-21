import React from 'react';
import './styles.scss';
import Logo from '../../assets/LogoTemp.png';
const Header = props => {
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <img src={Logo} style={{height: "50px" }} alt="Logo here"/>
                </div>
            </div>
        </header>
    );
}

export default Header;