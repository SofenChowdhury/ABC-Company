import React from "react";
import { CanvasJSChart } from "canvasjs-react-charts";

const BarChartComponent = () => {
  const options = {
    title: {
      text: "Basic Column Chart",
    },
    data: [
      {
        // Change type to "doughnut", "line", "splineArea", etc.
        type: "column",
        dataPoints: [
          { label: "MaxX", y: 10},
          { label: "MaxX", y: 15},
          { label: "MaxY", y: 25},
          { label: "MaxY", y: 30},
          { label: "MaxZ", y: 28},
          { label: "MaxZ", y: 28},
        ],
      },
    ],
  };

  return <CanvasJSChart options={options} />;
};

export default BarChartComponent;
