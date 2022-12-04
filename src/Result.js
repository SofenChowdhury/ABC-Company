import React from "react";
import { useLocation } from "react-router-dom";

import jsPDF from "jspdf";
import "jspdf-autotable";

const Result = () => {
  const location = useLocation();

  // define a generatePDF function that accepts a tickets argument
  const generatePDF = (data) => {
    // initialize jsPDF
    const doc = new jsPDF();

    // define the columns we want and their titles
    const tableColumn = [
      "Project Name",
      "Project Description",
      "Client",
      "Contractor",
      "MIN X",
      "MAX X",
      "MIN Y",
      "MAX Y",
      "MIN Z",
      "MAX Z",
    ];
    // define an empty array of rows
    const tableRows = [];

    // for each ticket pass all its data into an array

    const rowData = [
      data.projectName,
      data.projectDesc,
      data.client,
      data.contractor,
      data.minX,
      data.maxX,
      data.minY,
      data.maxY,
      data.minZ,
      data.maxZ,
    ];
    // push each tickcet's info into a row
    tableRows.push(rowData);

    // startY is basically margin-top
    doc.autoTable(tableColumn, tableRows, { startY: 20 });

    const resultPdf = "result_pdf";
    // ticket title. and margin-top + margin-left
    doc.text("Result", 14, 15);
    // we define the name of our PDF file.
    doc.save(`report_${resultPdf}.pdf`);
  };

  return (
    <>
      <div className="table-responsive mt-5">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col" colSpan={2} className="text-center table-primary">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Project Name</td>
              <td>{location.state.projectName}</td>
            </tr>
            <tr>
              <td>Project Desc</td>
              <td>{location.state.projectDesc}</td>
            </tr>
            <tr>
              <td>Client</td>
              <td>{location.state.client}</td>
            </tr>
            <tr>
              <td>Contractor</td>
              <td>{location.state.contractor}</td>
            </tr>
            <tr>
              <td>MIN X</td>
              <td>{location.state.minX}</td>
            </tr>
            <tr>
              <td>MAX X</td>
              <td>{location.state.maxX}</td>
            </tr>
            <tr>
              <td>MIN Y</td>
              <td>{location.state.minY}</td>
            </tr>
            <tr>
              <td>MAX Y</td>
              <td>{location.state.maxY}</td>
            </tr>
            <tr>
              <td>MIN Z</td>
              <td>{location.state.minZ}</td>
            </tr>
            <tr>
              <td>MAX Z</td>
              <td>{location.state.maxZ}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        className="btn btn-primary"
        onClick={() => generatePDF(location.state)}
      >
        Download PDF
      </button>
    </>
  );
};

export default Result;
