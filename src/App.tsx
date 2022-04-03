import { useRef, useState } from "react";
import DraggableVideo from "./DraggableVideo";
import Quadrant from "./Quadrant";

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const commonQuadrantProps = {
    videoRef,
  };

  return (
    <main className="container">
      <Quadrant {...commonQuadrantProps} />
      <Quadrant {...commonQuadrantProps} />
      <Quadrant {...commonQuadrantProps}>
        <DraggableVideo
          ref={videoRef}
          coordinates={coordinates}
          setcoordinates={setCoordinates}
        />
      </Quadrant>
      <Quadrant {...commonQuadrantProps} />
    </main>
  );
}

export default App;
