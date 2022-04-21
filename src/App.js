import {lazy, Suspense} from 'react';
import { Routes, Route, useLocation } from "react-router";
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
      <Suspense fallback={<p>... loading ...</p>}>
      <Routes>
        <Route path="/home" element={<Private><Home /></Private>} />
        <Route path="/u/:username" element={<Private><Profile /></Private>} />
        <Route path="/:stack" element={<Private><Stack /></Private>} />
        <Route path="/" element={<Welcome />} />
      </Routes>
      </Suspense>
    </>
  );
}

export default App;
