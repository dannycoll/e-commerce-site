import React, { useState } from 'react';
import './styles.scss';

import Button from './../forms/Button';
import { auth, signInWithGoogle } from './../../firebase/utils';
import FormInput from './../forms/FormInput';
import AuthWrapper from './../AuthWrapper';
import { Link } from 'react-router-dom';

const SignIn = props => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(email, password);
            resetForm();
        } catch (e) {
            console.log(e);
        }
    }

    const configAuthWrapper = {
        headline: 'Log In',
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
                            <Button onClick={signInWithGoogle}>
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

export default SignIn;