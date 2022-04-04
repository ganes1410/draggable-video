import { forwardRef, MutableRefObject, useRef } from "react";

type DragEvent = React.DragEvent<HTMLElement>;
type TouchEvent = React.TouchEvent<HTMLElement>;

const DraggableVideo = forwardRef<
  HTMLVideoElement,
  {
    coordinates: any;
    setcoordinates: any;
  }
>(({ coordinates, setcoordinates }, ref) => {
  // Typecast videoRef
  const videoRef = ref as MutableRefObject<HTMLVideoElement>;
  const closestQuadrentRef = useRef<Element | null>(null);

  function onDragStart(event: DragEvent) {
    const target = event.target as HTMLVideoElement;
    target.classList.add("dragging");

    // Pause the video when drag starts
    videoRef?.current?.pause();
  }

  function onTouchStart(event: TouchEvent) {
    const touches = event.targetTouches[0];
    setcoordinates({ x: touches.pageX, y: touches.pageY });
  }

  function onTouchMove(event: TouchEvent) {
    event.stopPropagation();

    const touches = event.targetTouches[0];

    videoRef?.current?.pause();
    let elementHover = document.elementsFromPoint(
      touches.clientX,
      touches.clientY
    );

    if (elementHover) {
      // Find the closest quadrant
      const closestQuadrant = elementHover[0].classList.contains("quadrant")
        ? elementHover[0]
        : elementHover[1];

      closestQuadrentRef.current = closestQuadrant;
    }

    if (videoRef.current) {
      let deltaX = touches.pageX - coordinates.x;
      let deltaY = touches.pageY - coordinates.y;
      let pageX = `${deltaX + videoRef?.current?.offsetLeft ?? 0}px`;
      let pageY = `${deltaY + videoRef?.current?.offsetTop ?? 0}px`;

      videoRef!.current!.style.position = "absolute";
      videoRef!.current!.style.left = pageX;
      videoRef!.current!.style.top = pageY;
      setcoordinates({ x: touches.pageX, y: touches.pageY });
    }
  }

  function onTouchEnd(event: TouchEvent) {
    const target = event.target as HTMLElement;
    target.classList.remove("dragging");
    if (videoRef.current) {
      if (closestQuadrentRef.current) {
        closestQuadrentRef.current?.appendChild(videoRef?.current);
      }
      videoRef!.current!.style.left = "0px";
      videoRef!.current!.style.top = "";
    }
  }

  function togglePlay() {
    if (videoRef?.current?.paused) {
      videoRef?.current?.play();
    } else {
      videoRef?.current?.pause();
    }
  }

  return (
    <video
      draggable
      muted
      onDragStart={onDragStart}
      onClick={togglePlay}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      ref={videoRef}
      controls
      src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
      poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
      width={200}
      height={300}
    >
      Sorry, your browser doesn't support embedded videos, but don't worry, you
      can <a href="https://archive.org/details/BigBuckBunny_124">download it</a>
      and watch it with your favorite video player!
    </video>
  );
});

export default DraggableVideo;
