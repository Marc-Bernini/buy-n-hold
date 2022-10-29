import React from "react";

import "./Trade.css";

export default function Trade() {
  return (
    <div className="Trade">
      <div className="table">
        <div className="control">
          <label htmlFor="price">
            Price
            <input type="number" id="price"></input>
          </label>
          <button>{`Ajouter une option d'achat`}</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>username</th>
              <th>price</th>
              <th>expiration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Example</td>
              <td>100$</td>
              <td>{new Date().toDateString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="stats"></div>
    </div>
  );
}
