import DraggableVideo from "./DraggableVideo";
import Quadrant from "./Quadrant";

function App() {
  return (
    <main className="container">
      <Quadrant />
      <Quadrant />
      <Quadrant>
        <DraggableVideo />
      </Quadrant>
      <Quadrant />
    </main>
  );
}

export default App;
