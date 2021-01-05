import React, { Component } from 'react';
import './styles.scss';

import Button from './../forms/Button';
import { auth, signInWithGoogle } from './../../firebase/utils';
import FormInput from './../forms/FormInput';
import AuthWrapper from './../AuthWrapper';

const initialState = {
    email: '',
    password: ''
};

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        };

        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit = async e => {
        e.preventDefault();
        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({
                ...initialState
            })
        } catch(e) {
            console.log(e);
        }
    }

    handleChange(e) {
        const {name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        const { email, password } = this.state;

        const configAuthWrapper = {
            headline: 'Log In',
        }
        return(
            <AuthWrapper {...configAuthWrapper}>
                <div className="formWrap">
                        <form onSubmit={this.handleSubmit}>

                            <FormInput 
                                type="email"
                                name="email"
                                value={email}
                                placeholder="E-mail"
                                handleChange={this.handleChange}
                            />
                            <FormInput 
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Password"
                                handleChange={this.handleChange}
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
                        </form>
                    </div>
            </AuthWrapper>
        );
    }
}

export default SignIn;