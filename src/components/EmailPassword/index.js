import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './styles.scss';

import AuthWrapper from './../AuthWrapper';
import FormInput from "./../forms/FormInput";
import Button from "./../forms/Button";
import { resetAllAuthForms, resetPassword } from '../../redux/User/user.actions';

const mapState = ({ user }) => ({
	resetPasswordSuccess: user.resetPasswordSuccess,
	resetPasswordError: user.resetPasswordError,
});


const EmailPassword = props => {
	const { resetPasswordError, resetPasswordSuccess } = useSelector(mapState);
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		if (resetPasswordSuccess) {
			dispatch(resetAllAuthForms());
			props.history.push('/login');
		}
	}, [resetPasswordSuccess]);

	useEffect(() => {
		if (Array.isArray(resetPasswordError) && resetPasswordError.length >= 1) {
			setErrors(resetPasswordError);
		}
	}, [resetPasswordError])
	const handleSubmit = async e => {
		e.preventDefault();
		dispatch(resetPassword(email));
		
	}

	const configAuthWrapper = {
		headline: 'Forgot Password',
	};

	return (
		<AuthWrapper {...configAuthWrapper}>
			<div className="formWrap">

				{errors.length > 0 && (
					<ul>
						{errors.map((e, index) => {
							return (
								<li key={index}>
									{e}
								</li>
							)
						})}
					</ul>
				)}
				<form onSubmit={handleSubmit}>
					<FormInput
						type="email"
						name="email"
						value={email}
						placeholder="Email"
						handleChange={e => setEmail(e.target.value)}
					/>
					<Button>
						Request Password Reset
					</Button>
				</form>
			</div>
		</AuthWrapper>
	);
}


export default withRouter(EmailPassword);