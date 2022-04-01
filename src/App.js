import { Routes, Route } from "react-router";
import Header from "./layout/Header";
import Welcome from "./layout/Welcome";
import Home from "./layout/Home";

function App() {
  return (
    <>
      <Header loggedIn/>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Welcome />} />
      </Routes>
    </>
  );
}

export default App;
