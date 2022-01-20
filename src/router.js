import React, { Fragment } from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import SignIn from 'features/Authentication/pages/SignIn';
import SignUp from 'features/Authentication/pages/SignUp';
import Home from 'features/Home/pages/Home';
import theme from './utils/theme';
import { APP_ROUTES } from 'constants/routes';

const Router = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route exact path={APP_ROUTES.HOME} element={<Home/>} />
        <Route exact path={APP_ROUTES.SIGNIN} element={<SignIn/>} />
        <Route exact path={APP_ROUTES.SIGNUP} element={<SignUp/>} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

export default Router;
