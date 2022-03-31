import Header from "./layout/Header";
import Welcome from "./layout/Welcome";

function App() {
  return (
    <div className="App">
      <Header loggedIn={false} />
      <Welcome />
    </div>

  );
}

export default App;
