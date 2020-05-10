import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';

import * as auth from '~/services/auth';
import api from '~/services/api';

const AuthContext = createContext({
  signed: false,
  user: {},
  loading: true,
  signIn: () => {},
  signOut: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem('@RNAuth:user');
      const storageToken = await AsyncStorage.getItem('@RNAuth:token');

      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
        api.defaults.headers.Authorization = `Bearer ${storageToken}`;
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  async function signIn() {
    const response = await auth.signIn();

    setUser(response.user);
    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('@RNAuth:token', response.token);
    api.defaults.headers.Authorization = `Bearer ${response.token}`;
  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.any,
  ]).isRequired,
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
