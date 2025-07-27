import GameBoard from "./components/GameBoard";
import "./app.css";
import { PointsProvider } from "./state/points";

function App() {
  return (
    <PointsProvider>
      <div className="App">
        <h1 className="logo-title">Octosnake</h1>
        <div className="snake-container">
          <GameBoard />
        </div>
      </div>
    </PointsProvider>
  );
}

export default App;
