import {lazy, Suspense} from 'react';
import { Routes, Route, useLocation, Navigate } from "react-router";
import ScaleLoading from './utility/ScaleLoading';
const Header = lazy(() => import('./layout/Header'));
const Welcome = lazy(() => import('./layout/Welcome'));
const Home = lazy(() => import('./layout/Home'));
const Profile = lazy(() => import('./layout/Profile'));
const Stack = lazy(() => import('./stack/Stack'));
const Private = lazy(() => import('./utility/Private'));

function App() {
  const location = useLocation();
  return (
    <>
      <Header loggedIn={location.pathname !== '/'}/>
      <Suspense fallback={<ScaleLoading />}>
      <Routes>
        <Route path="/home" element={<Private><Home /></Private>} />
        <Route path="/u/:username" element={<Private><Profile /></Private>} />
        <Route path="/s/:stack" element={<Private><Stack /></Private>} />
        <Route path="/" element={<Welcome />} />
        <Route path="*" element={<Navigate to='home'/>} />
      </Routes>
      </Suspense>
    </>
  );
}

export default App;
