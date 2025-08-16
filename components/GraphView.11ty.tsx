import React from "react";

export const GraphView = () => {
  return (
    <>
      <h3>Graph View</h3>
      <div is="graph-view" id="graph">
        <span>loading graph view</span>
      </div>
      <script src="https://d3js.org/d3.v7.min.js"></script>
    </>
  );
};
