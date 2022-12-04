import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Papa from "papaparse";

import { CanvasJSChart } from "canvasjs-react-charts";
import { useEffect } from "react";

const FormComponent = () => {
  //navigate
  const navigate = useNavigate();

  // first form variables
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [client, setClient] = useState("");
  const [contractor, setContractor] = useState("");

  // second form state deciders
  const [submitted, setSubmitted] = useState(false);
  const [csv, setCsv] = useState(false);
  const [chart, setChart] = useState(false);

  let [minX, setMinX] = useState(0);
  let [maxX, setMaxX] = useState(0);
  let [minY, setMinY] = useState(0);
  let [maxY, setMaxY] = useState(0);
  let [minZ, setMinZ] = useState(0);
  let [maxZ, setMaxZ] = useState(0);
  // let [xData, setxData] = useState([]);
  // let [kpData, setkpData] = useState([]);
  // let [arrData, setarrData] = useState([]);
  // const [data, setData] = useState([]);
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  // submit handler for first form
  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Options for chart
  const options = {
    title: {
      text: "ABC Company Chart",
    },
    data: [
      {
        // Change type to "doughnut", "line", "splineArea", etc.
        type: "column",
        dataPoints: [
          { label: "MinX", y: +minX},
          { label: "MaxX", y: +maxX},
        ],
      },
    ],
  };

  const changeHandler = (event) => {
    setChart(true);
    setCsv(true);
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);
        // let ch = results.data
        //   .map(({ Z, Y, ...keepAttrs }) => keepAttrs)
        //   .map(({ KP: label, X: y, ...rest }) => ({
        //     label,
        //     y,
        //     ...rest,
        //   }))
        //   .slice(0, 2)
        //   ch.map((val) => {
        //     setxData((xData) => [...xData, +val.y])
        //     setkpData((kpData) => [...kpData, val.label])
        //   })
        // setData(ch);
        setMinX(results.data[0]?.X);
        setMaxX(results.data[results.data.length - 1]?.X);
        setMinY(results.data[results.data.length - 1]?.Y);
        setMaxY(results.data[0]?.Y);
        setMinZ(results.data[results.data.length - 1]?.Z);
        setMaxZ(results.data[0]?.Z);
      },
    });
  };

  const result = () => {
    {
      navigate("/result", {
        state: {
          projectName,
          projectDesc,
          client,
          contractor,
          minX,
          maxX,
          minY,
          maxY,
          minZ,
          maxZ,
        },
      });
    }
  };
  console.log(minX);
  console.log(maxX);
  return (
    <div className="conatainer">
      <div className="row">
        {!submitted && (
          <div className="col-md-6">
            <h1 className="display-4 mb-5">Create a Project</h1>

            <form>
              <label className="mb-1">Project Name</label>
              <input
                type="text"
                className="form-control mb-3"
                onChange={(e) => {
                  setProjectName(e.target.value);
                }}
              />
              <label className="mb-1">Project Description</label>
              <textarea
                className="form-control mb-3"
                rows="4"
                onChange={(e) => {
                  setProjectDesc(e.target.value);
                }}
              ></textarea>
              <label className="mb-1">Client</label>
              <input
                type="text"
                className="form-control mb-3"
                onChange={(e) => {
                  setClient(e.target.value);
                }}
              />
              <label className="mb-1">Contractor</label>
              <input
                type="text"
                className="form-control mb-3"
                onChange={(e) => {
                  setContractor(e.target.value);
                }}
              />
              <button
                type="submit"
                onClick={submit}
                className="btn btn-success"
              >
                Submit
              </button>
            </form>
          </div>
        )}
        {submitted && (
          <>
            <h1 className="display-4 mb-5">Create a Project (step 2)</h1>
            <div className="col-md-6">
              <label className="mb-1">Project Name</label>
              <input
                type="text"
                className="form-control mb-3"
                value={projectName}
                disabled
              />
              <label className="mb-1">Project Description</label>
              <textarea
                className="form-control mb-3"
                rows="4"
                value={projectDesc}
                disabled
              ></textarea>
              <label className="mb-1">Client</label>
              <input
                type="text"
                className="form-control mb-3"
                value={client}
                disabled
              />
              <label className="mb-1">Contractor</label>
              <input
                type="text"
                className="form-control mb-3"
                value={contractor}
                disabled
              />
              <label className="mb-1">Input a CSV File</label>
              <input
                type="file"
                className="form-control mb-3"
                onChange={changeHandler}
                accept=".csv"
              />
            </div>
            {csv ? (
              <>
                <div className="col-md-6">
                  <label className="mb-1">MIN X</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={parsedData[0]?.X}
                    disabled
                  />
                  <label className="mb-1">MAX X</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={parsedData[parsedData.length - 1]?.X}
                    disabled
                  />
                  <label className="mb-1">MIN Y</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={parsedData[parsedData.length - 1]?.Y}
                    disabled
                  />
                  <label className="mb-1">MAX Y</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={parsedData[0]?.Y}
                    disabled
                  />
                  <label className="mb-1">MIN Z</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={parsedData[parsedData.length - 1]?.Z}
                    disabled
                  />
                  <label className="mb-1">MAX Z</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={parsedData[0]?.Z}
                    disabled
                  />
                </div>
              </>
            ) : (
              <div className="col-md-6">
                <label className="mb-1">MIN X</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  onChange={(e) => {
                    setMinX(e?.target.value);
                  }}
                />
                <label className="mb-1">MAX X</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  onChange={(e) => {
                    setMaxX(e?.target.value);
                  }}
                />
                <label className="mb-1">MIN Y</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  onChange={(e) => {
                    setMinY(e?.target.value);
                  }}
                />
                <label className="mb-1">MAX Y</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  onChange={(e) => {
                    setMaxY(e?.target.value);
                  }}
                />
                <label className="mb-1">MIN Z</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  onChange={(e) => {
                    setMinZ(e?.target.value);
                  }}
                />
                <label className="mb-1">MAX Z</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  onChange={(e) => {
                    setMaxZ(e?.target.value);
                  }}
                />
              </div>
            )}
            {/* <div className="col-md-10"></div> */}
            {/* <div className="col-md-2">
              <button className="btn btn-success float-end" onClick={result}>
                Create
              </button>
              <button className="btn btn-success float-start" onClick={showChart}>
                Show Chart
              </button>
            </div> */}
          </>
        )}
      </div>
      <div className="row mt-5">{chart && <CanvasJSChart options={options} />}</div>
      <div className="col-md-6 mt-5 ms-5">
        {submitted &&
          <button className="btn btn-success float-end" onClick={result}>
            Create
          </button>
        }
      </div>
    </div>
  );
};

export default FormComponent;
