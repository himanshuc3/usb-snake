import SnakeGame from './helper/SnakeGame';
import GameBoard from './components/GameBoard';
import './app.css'

function App() {
  return (
    <div className="App">
      <div className="snake-container">
        <GameBoard />
        {/* <SnakeGame /> */}
      </div>
    </div>
  );
}

export default App;
