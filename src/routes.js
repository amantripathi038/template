import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
// layouts
import DashboardLayout from './layouts/dashboard';

import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import RegisterPage from './pages/RegisterPage';

export default function Router() {
  const user = useSelector((state) => state.user.user);

  return (
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
      </Route>

      <Route path="/404" element={<Page404 />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}
