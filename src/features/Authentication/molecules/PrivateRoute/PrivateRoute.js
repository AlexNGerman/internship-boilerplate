import React from "react"
import { Navigate } from "react-router-dom"
import { getToken } from 'utils/auth/cookies';
import { ROUTES } from 'constants/routes';


const PrivateRoute = ({ children }) => {
  const token = getToken();
  return token ? children : <Navigate to={ROUTES.SIGNIN} replace />
}

export default PrivateRoute