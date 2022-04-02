import React from "react";

function Quadrant({ children }: { children?: React.ReactNode }) {
  return <section className="quadrant">{children ? children : null}</section>;
}

export default Quadrant;
