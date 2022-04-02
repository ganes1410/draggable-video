import React from "react";

type DragEvent = React.DragEvent<HTMLElement>;

interface IQuadrant {
  videoRef: React.RefObject<HTMLVideoElement>;
  children?: React.ReactNode;
}
function Quadrant({ children, videoRef }: IQuadrant) {
  function onDragEnter(event: DragEvent) {
    const target = event.target as HTMLElement;
    if (target.className === "quadrant") {
      target.classList.add("dragEnter");
    }
  }

  function onDragLeave(event: DragEvent) {
    const target = event.target as HTMLElement;
    if (target.className?.includes("quadrant")) {
      target.classList.remove("dragEnter");
    }
  }

  function onDragEnd(event: DragEvent) {
    const target = event.target as HTMLElement;
    target.classList.remove("dragging");
  }

  // This event is needed to trigger the onDrop Event
  function onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  function onDrop(event: DragEvent) {
    const target = event.target as HTMLElement;

    // move dragged elem to the selected drop target
    if (target.className?.includes("quadrant")) {
      target.classList.remove("dragEnter");

      if (videoRef?.current?.parentNode) {
        videoRef.current.parentNode.removeChild(videoRef.current);
        target.appendChild(videoRef?.current);
      }
    }
  }

  return (
    <section
      className="quadrant"
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      {children ? children : null}
    </section>
  );
}

export default Quadrant;
