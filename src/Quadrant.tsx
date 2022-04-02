import React from "react";

type DragEvent = React.DragEvent<HTMLElement>;

function Quadrant({ children }: { children?: React.ReactNode }) {
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

  return (
    <section
      className="quadrant"
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragEnd={onDragEnd}
    >
      {children ? children : null}
    </section>
  );
}

export default Quadrant;
