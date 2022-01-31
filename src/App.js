import React, { useMemo } from 'react';
import { createClient, Provider, dedupExchange, cacheExchange, fetchExchange, errorExchange } from 'urql';
import { authExchange } from '@urql/exchange-auth';
import { makeOperation } from '@urql/core';
import { API_URL } from 'constants/api';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import SignIn from 'features/Authentication/pages/SignIn';
import SignUp from 'features/Authentication/pages/SignUp';
import PrivateRoute from 'features/Authentication/molecules/PrivateRoute';
import Home from 'features/Home/pages/Home';
import theme from 'utils/theme';
import { getToken, removeToken } from 'utils/auth/cookies';
import { ROUTES } from 'constants/routes';

const App = () => {
  const token = getToken();
  const client = useMemo(() => {
    const logOut = () => {
      removeToken();
      return <Navigate to={ROUTES.SIGNIN} replace />;
    }
    return createClient({
      url: API_URL,
      exchanges: [
        dedupExchange,
        cacheExchange,
        errorExchange({
          onError: (error) => {
            const isAuthError = error.graphQLErrors.some(
              e => e.extensions?.code === 401,
            );

            if (isAuthError) logOut();
          }
        }),
        authExchange({
          addAuthToOperation: ({ authState , operation}) => {

            if (!authState || !authState.token) {
              return operation;
            }

            const fetchOptions =
              typeof operation.context.fetchOptions === 'function'
                ? operation.context.fetchOptions()
                : operation.context.fetchOptions || {};

            return makeOperation(
              operation.kind,
              operation,
              {
                ...operation.context,
                fetchOptions: {
                  ...fetchOptions,
                  headers: {
                    ...fetchOptions.headers,
                    "Authorization": `Bearer ${authState.token}`,
                  },
                },
              },
            );
          },
          willAuthError: ({ authState }) => !authState,
          didAuthError: ({ error }) => {
            return error.graphQLErrors.some(
              e => e.extensions?.code === 401
            );
          },
          getAuth: async ({ authState }) => {
            if (!authState) {
              if (token) {
                return { token };
              }
              return null;
            }

            logOut();

            return null;
          },
        }),
        fetchExchange,
      ],
    });
  }, [token]);

  return (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route exact path={ROUTES.HOME} element={
              <PrivateRoute>
                <Home/>
              </PrivateRoute>
            }/>
            <Route exact path={ROUTES.SIGNIN} element={<SignIn/>} />
            <Route exact path={ROUTES.SIGNUP} element={<SignUp/>} />
            <Route path="*" element={<SignUp/>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
