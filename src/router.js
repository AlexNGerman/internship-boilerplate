import React, { Fragment, Component } from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';

import SignIn from 'features/Authentication/pages/SignIn';
import SignUp from 'features/Authentication/pages/SignUp';
import Home from 'features/Home/pages/Home';

import { APP_ROUTES } from 'constants/routes';

class AppWrapper extends Component {

  render() {
    return (
      <Fragment>
        <BrowserRouter>
          <Routes>
            <Route exact path={APP_ROUTES.home} element={<Home/>} />
            <Route exact path={APP_ROUTES.signIn} element={<SignIn/>} />
            <Route exact path={APP_ROUTES.signUp} element={<SignUp/>} />

          </Routes>
        </BrowserRouter>

      </Fragment>
    );
  }
}

export default AppWrapper;
