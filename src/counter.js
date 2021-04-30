import React from 'react';
import { useState } from "react";
import './counter.css';
import DataTable from "./dataTable";
import Button from '@material-ui/core/Button';

export default function Counter() {

  const [count, setCount] = useState(0);

  return (
    <div>
      <div className="increment-counter">
        <p> You Have Clicked {count} times</p>
        {/* <button onClick={() => setCount(count + 1)}>click to Increase </button>
      <button onClick={() => setCount(0)}> Click to reset </button> */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCount(count + 1)}
          // className={classes.button}
          // startIcon={<DeleteIcon />}
        >
          Increase
          </Button>

          <Button
          variant="contained"
          color="primary"
          onClick={() => setCount(0)}>
          Reset
          </Button>


      </div>

      <div className="data-table">

        <DataTable />
      </div>
    </div>

  );
}


