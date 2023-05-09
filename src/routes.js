import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
// layouts
import { CircularProgress } from '@mui/material';

import DashboardLayout from './layouts/dashboard';

import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import RegisterPage from './pages/RegisterPage';
import userService from './store/userService';
import DeepAnalysis from './pages/DeepAnalysis'
import Accounts from './pages/Accounts'

export default function Router() {

  const [isLoading, setIsLoading] = useState(false)
  const getUser = async (token) => {
    try {
      setIsLoading(true)
      await userService.getUser(token);
    } catch (error) {
      console.error(error);
    }
    finally {
      setIsLoading(false)
    }
  }
  const token = localStorage.getItem('token') ? localStorage.getItem('token').slice(1, -1) : (sessionStorage.getItem('token') ? sessionStorage.getItem('token').slice(1, -1) : null);

  useEffect(() => {
    if (token) {
      getUser(token)
    }
  }, [token]);

  const user = useSelector((state) => state.user.user);

  return (
    <>
      {isLoading && (
        <div style={{ position: 'fixed', top: '40%', left: '50%' }}>
          <CircularProgress color="success" />
        </div>
      )}
      {!isLoading &&
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/app" />} />
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard/app" />} />
          <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/dashboard/app" />} />

          <Route
            path="/dashboard"
            element={user ? <DashboardLayout /> : <Navigate to="/login" />}
          >
            <Route path="app" element={<DashboardAppPage />} />
            <Route path="user" element={<UserPage />} />
            <Route path="analysis" element={<DeepAnalysis />} />
            <Route path="accounts" element={<Accounts />} />
          </Route>

          <Route path="/404" element={<Page404 />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      }
    </>
  );
}
