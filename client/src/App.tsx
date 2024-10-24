import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css';

import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import TournamentsPage from './pages/TournamentsPage';
import NewsPage from './pages/NewsPage';

const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const HeadsUpPage = lazy(() => import('./pages/HeadsUpPage'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/heads-up" element={<HeadsUpPage />} />
            <Route path="/mtt" element={<TournamentsPage />} />
            <Route path="/news" element={<NewsPage />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
