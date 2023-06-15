import React from "react";

const Table = ({ data, columns, onDelete, onViewDetails, onEdit }) => {
  return (
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th>Index</th>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 &&
          data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {Object.keys(item).map((key) => {
                if (key === "id") {
                  return null; // Skip rendering the cell if the key is "id"
                }
                return <td key={key}>{item[key]}</td>;
              })}
              <td>
                <button
                  className="btn text-primary"
                  onClick={() => onViewDetails(item)}
                >
                  Details
                </button>
              </td>
              <td>
                <button
                  className="btn text-primary"
                  onClick={() => onEdit(item)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="btn text-danger"
                  onClick={() => onDelete(item)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
