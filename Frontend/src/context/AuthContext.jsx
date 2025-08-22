import React, { createContext, useEffect, useState } from 'react';
import { api } from '../services/api';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { setLoading(false); return; }
    api.me().then((res) => setUser(res.user)).catch(() => localStorage.removeItem('token')).finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await api.login({ email, password });
    localStorage.setItem('token', res.token);
    setUser(res.user);
  };

  const register = async (name, email, password) => {
    const res = await api.register({ name, email, password });
    localStorage.setItem('token', res.token);
    setUser(res.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = { user, loading, login, register, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


