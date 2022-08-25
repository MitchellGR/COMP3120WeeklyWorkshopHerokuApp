import React from "react";
import App from "./App.js"
import axios from 'axios'

const Unit = ({unit,deleteFunction}) => {

    console.log(unit)

  return (
    <li><strong>{unit.code}:</strong> &nbsp;
    {unit.title} 
    &nbsp;-&nbsp;
    {unit.offering.map(o => <strong><span key={o}>  {o} </span></strong>)}
    <button onClick={() => deleteFunction(unit.id)}>Delete</button>
    </li>
  )

}

export default Unit