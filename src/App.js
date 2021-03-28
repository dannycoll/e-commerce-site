import React, { useEffect } from 'react';
import { connect, useDispatch } from "react-redux";
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';

import './default.scss';

import MainLayout from './layouts/MainLayout';
import HomepageLayout from "./layouts/HomepageLayout";

import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Dashboard from "./pages/Dashboard";

import WithAuth from './hoc/withAuth';

import { setCurrentUser } from "./redux/User/user.actions";

const App = props => {
  const dispatch = useDispatch();
  const { setCurrentUser, currentUser } = props;

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapShot => {
          dispatch(setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          }));
        });

      }

      dispatch(setCurrentUser(userAuth));
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
          render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )} />
        <Route path={'/login'}
          render={() => (
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
        <Route path={'/dashboard'}
          render={() => (
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
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
