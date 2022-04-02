import { useRef } from "react";
import DraggableVideo from "./DraggableVideo";
import Quadrant from "./Quadrant";

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <main className="container">
      <Quadrant videoRef={videoRef} />
      <Quadrant videoRef={videoRef} />
      <Quadrant videoRef={videoRef}>
        <DraggableVideo ref={videoRef} />
      </Quadrant>
      <Quadrant videoRef={videoRef} />
    </main>
  );
}

export default App;
