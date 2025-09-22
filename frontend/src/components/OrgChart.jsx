import React from "react";
import ReactFlow, { Controls, MiniMap, Background } from "reactflow";
import "reactflow/dist/style.css";

const OrgChart = ({ nodes, edges }) => {
  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default OrgChart;
