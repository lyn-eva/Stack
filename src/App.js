import { Routes, Route, useLocation } from "react-router";
import Header from "./layout/Header";
import Welcome from "./layout/Welcome";
import Home from "./layout/Home";
import Stack from "./stack/Stack";
import Private from "./utility/Private"

function App() {
  const location = useLocation();
  return (
    <>
      <Header loggedIn={location.pathname !== '/'}/>
      <Routes>
        <Route path="/home" element={<Private><Home /></Private>} />
        <Route path="/:stack" element={<Private><Stack /></Private>} />
        <Route path="/" element={<Welcome />} />
      </Routes>
    </>
  );
}

export default App;
