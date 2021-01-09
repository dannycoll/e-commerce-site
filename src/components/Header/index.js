import React from 'react';
import './styles.scss';
import Logo from '../../assets/LogoTemp.png';
import { Link } from "react-router-dom";
import { auth } from './../../firebase/utils';
import { connect } from "react-redux";

const Header = props => {

	const { currentUser } = props;
	return (
		<header className="header">
			<div className="wrap">
				<div className="logo">
					<Link to="/">
						<img src={Logo} style={{ height: "50px" }} alt="Logo here" />
					</Link>
				</div>

				<div className="callToActions">

					{currentUser ? (
						<ul>
							<li>
								<a onClick={() => auth.signOut()}>
									Log Out
								</a>
							</li>
							<li>
								<Link to="/dashboard">
									Dashboard
								</Link>
							</li>
						</ul>
					) : (
							<ul>
								<li>
									<Link to="/registration">
										Register
									</Link>
								</li>
								<li>
									<Link to="/login">
										Login
									</Link>
								</li>
							</ul>
						)}
				</div>
			</div>
		</header>
	);
}

Header.defaultProps = {
	currentUser: null
}

const mapStateToProps = ({ user }) => ({
	currentUser: user.currentUser,
});

export default connect(mapStateToProps, null)(Header);