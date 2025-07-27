import GameBoard from "./components/GameBoard";
import "./app.css";
import { PointsProvider } from "./state/points";

function App() {
  return (
    <PointsProvider>
      <div className="App">
        <div className="snake-container">
          <GameBoard />
          {/* <SnakeGame /> */}
        </div>
      </div>
    </PointsProvider>
  );
}

export default App;
