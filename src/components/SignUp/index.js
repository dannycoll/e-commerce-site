import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import './styles.scss';
import { useSelector, useDispatch } from 'react-redux';

import { resetAllAuthForms, signUpUser } from './../../redux/User/user.actions';

import FormInput from './../forms/FormInput';
import Button from './../forms/Button';
import AuthWrapper from './../AuthWrapper';

const mapState = ({ user }) => ({
  signUpSuccess: user.signUpSuccess,
  signUpError: user.signUpError,
});

const SignUp = props => {
  const { signUpSuccess, signUpError } = useSelector(mapState)
  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (signUpSuccess) {
      resetForm();
      props.history.push('/');
    }
  }, [signUpSuccess]);

  useEffect(() => {
    if (Array.isArray(signUpError) && signUpError.length >= 1) {
      setErrors(signUpError);
    }
  }, [signUpError]);

  const resetForm = () => {
    setDisplayName('');
    setConfirmPassword('');
    setEmail('');
    setErrors([]);
    setPassword('');
  }
  const handleFormSubmit = e => {
    e.preventDefault();
    dispatch(signUpUser({
      displayName,
      email,
      password,
      confirmPassword,
    }));
    resetForm();
    dispatch(resetAllAuthForms());
    props.history.push('/');   
  }

  const configAuthWrapper = {
    headline: 'Register',
  }

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => {
              return (
                <li key={index}>
                  {err}
                </li>
              );
            })}
          </ul>
        )}
        <form onSubmit={handleFormSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Full Name"
            handleChange={e => setDisplayName(e.target.value)}
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="E-mail"
            handleChange={e => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={e => setPassword(e.target.value)}
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            handleChange={e => setConfirmPassword(e.target.value)}
          />

          <Button type="submit">
            Register
          </Button>
        </form>
      </div>
    </AuthWrapper>
  );
}


export default withRouter(SignUp);