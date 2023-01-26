import type { FC } from "react";
import { Bar } from "react-chartjs-2";

import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

import "./Graph.module.css";

export interface GraphProps {
  data?: any;
  options?: any;
}


const colorGraph = "#808080";
const colorGraphWithTransparency = colorGraph + "80";


const defaultOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    color: colorGraph,
    scales: {
      x: {
        border: {
          color: colorGraph,
        },
        grid: {
          display: false,
        },
        ticks: {
          color: colorGraph,
        },
      },
      y: {
        border: {
          color: colorGraph,
        },
        grid: {
          color: colorGraphWithTransparency,
        },
        ticks: {
          color: colorGraph,
          callback: function (value: string, _index: any, _ticks: any) {
            return value + "Mo";
          },
        },
      },
    },
  };


const Graph: FC<GraphProps> = ({ data, options }: GraphProps) => {
  options = { ...defaultOptions, ...options };
  return (
    <>
      {data ? (
        <>
          <div className="--graph">
            <Bar data={data} width={500} height={250} options={options} />
          </div>
        </>
      ) : (
        <>
          <div className="--graph-empty">
            <p>No data available</p>
          </div>
        </>
      )}
    </>
  );
};

export default Graph;
