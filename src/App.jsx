import { useEffect } from 'react';
import {useFetchAuth} from './useFetchAuth'
import LoginForm from './Forms/LoginForm'
import SetlistPage from './components/SetlistPage';
import SongsPage from './components/Songs/SongsPage';
import api from './api'

import * as ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import './globals.css'

const App = () => {
  const { loadingUser, user } = useFetchAuth();
  useEffect(() => api.guestLogin(), []);
  if (loadingUser) return <div className="loading">loading...</div>

  return (
    <BrowserRouter>
      <Routes>
        <Route path="songs" element={<SongsPage {...{user}} />} />
        <Route path="login" element={<LoginForm {...{user}} />} />
        <Route path="/" element={<SetlistPage {...{user}} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
