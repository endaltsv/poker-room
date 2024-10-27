import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css';

import MainLayout from './components/layout/MainLayout/MainLayout';
import AuthLayout from './components/layout/AuthLayout/AuthLayout';
import TournamentsPage from './pages/Tournaments/MTTPage';
import NewsPage from './pages/Promotions/NewsPage';
import { SocketProvider } from './context/SocketContext';
import GamePage from './pages/Poker/PokerPage';

const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/Auth/RegisterPage'));
const ProfilePage = lazy(() => import('./pages/Profile/ProfilePage'));
const HeadsUpPage = lazy(() => import('./pages/Tournaments/HeadsUpPage'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <SocketProvider>
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

            <Route path="/game/:roomId" element={<GamePage />} />
          </Routes>
        </SocketProvider>
      </Suspense>
    </Router>
  );
}

export default App;
