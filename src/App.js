import Header from "./layout/Header";
import Welcome from "./layout/Welcome";

function App() {
  return (
    <>
      <Header loggedIn={false} />
      <Welcome />
    </>

  );
}

export default App;
