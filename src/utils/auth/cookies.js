import Cookies from 'js-cookie';

export const getToken = () => Cookies.get('token');

export const setToken = (value) => Cookies.set('token', value, {secure: true, sameSite: 'strict'});

export const removeToken = () => Cookies.remove('token');
