import React, { useEffect } from 'react';
import './default.scss';
import { connect } from "react-redux";
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';

import MainLayout from './layouts/MainLayout';
import HomepageLayout from "./layouts/HomepageLayout";

import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';

import { setCurrentUser } from "./redux/User/user.actions";

const App = props => {
  
  const { setCurrentUser, currentUser } = props;

  useEffect(() => {

    const authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });

      }

      setCurrentUser(userAuth);
    });

    return () => {
      authListener();
    }
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route exact path={'/'} render={() => (
          <HomepageLayout>
            <Homepage />
          </HomepageLayout>
        )} />
        <Route path={'/registration'}
          render={() => currentUser ? <Redirect to="/" /> : (
            <MainLayout>
              <Registration />
            </MainLayout>
          )} />
        <Route path={'/login'}
          render={() => currentUser ? <Redirect to="/" /> : (
            <MainLayout>
              <Login />
            </MainLayout>
          )}
        />
        <Route path={'/recovery'}
          render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )}
        />
      </Switch>
    </div>
  );
}


const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
