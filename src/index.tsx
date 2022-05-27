import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import data from "./data.json";
import Popper from "@mui/material/Popper";

const App = () => {
  const [dataS, setDataS] = useState(data);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [term, setTerm] = useState<string | number>("");
  const [arrFilt, setArrFilt] = useState<any[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLElement>, val: string | number) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setTerm(val);
  };

  const handleCheck = (e: boolean, ch: string | number) => {
    if (e) {
      setArrFilt([...arrFilt, { term, ch }]);
    } else {
      setArrFilt((prev) => prev.filter((v) => v.ch !== ch));
    }
  };

  const open = Boolean(anchorEl);
  return (
    <div>
      <table>
        <thead>
          <tr>
            {Object.keys(dataS[0]).map((cell) => (
              <>
                <th onClick={(e) => handleClick(e, cell)} key={cell}>
                  {cell}
                </th>
                <Popper open={open} anchorEl={anchorEl}>
                  <div className="popper">
                    {Array.from(new Set(dataS)).map((v: any) => (
                      <>
                        <label>{v[term]}</label>

                        <input type="checkbox" onChange={(e) => handleCheck(e.target.checked, v[term])} />
                      </>
                    ))}
                  </div>
                </Popper>
              </>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataS.map((v) => (
            <tr key={v.id}>
              {Object.values(v).map((cell) => (
                <td key={cell}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
