import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import './styles.scss';

import Button from './../forms/Button';
import FormInput from './../forms/FormInput';
import AuthWrapper from './../AuthWrapper';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetAllAuthForms, signInUser, signInWithGoogle } from './../../redux/User/user.actions';

const mapState = ({ user }) => ({
    signInSuccess: user.signInSuccess,
});

const SignIn = props => {
    const { signInSuccess } = useSelector(mapState);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if(signInSuccess) {
            resetForm();
            dispatch(resetAllAuthForms());
            props.history.push('/');
        }
    }, [signInSuccess]);

    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(signInUser({ email, password }));        
    }

    const configAuthWrapper = {
        headline: 'Log In',
    }

    const handleGoogleSignIn = () => {
        dispatch(signInWithGoogle());
    }
    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className="formWrap">
                <form onSubmit={handleSubmit}>

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
                    <Button type="submit">
                        Log In
                            </Button>
                    <div className="socialSignIn">
                        <div className="row">
                            <Button onClick={handleGoogleSignIn}>
                                Sign in with Google
                                    </Button>
                        </div>
                    </div>

                    <div className="links">
                        <Link to='/recovery'>
                            Forgot Password?
                                </Link>
                    </div>
                </form>
            </div>
        </AuthWrapper>
    );

}

export default withRouter(SignIn);