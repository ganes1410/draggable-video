import { forwardRef, MutableRefObject } from "react";

type DragEvent = React.DragEvent<HTMLElement>;

const DraggableVideo = forwardRef<HTMLVideoElement, {}>((_, ref) => {
  // Typecast videoRef
  const videoRef = ref as MutableRefObject<HTMLVideoElement>;

  function onDragStart(event: DragEvent) {
    const target = event.target as HTMLVideoElement;
    target.classList.add("dragging");

    // Pause the video when drag starts
    videoRef?.current?.pause();
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
      onClick={() => togglePlay()}
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
