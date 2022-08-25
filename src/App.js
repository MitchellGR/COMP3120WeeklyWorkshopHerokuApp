import React, {useState, useEffect} from 'react';
import './App.css';
import UnitForm from "./UnitForm.js"
import Unit from "./Unit.js"
import axios from 'axios'
const baseUrl = "http://localhost:3001"

function App() {

  const [units, setUnits] = useState([])

  const addNewUnit = (newUnit) => {
    axios.post(baseUrl + "/api/units", newUnit)
    .then(response => {
      console.log("POST response", response)
      setUnits([...units, response.data])
    })
  }

  const deleteUnit = (unitID) => {
    const unitURL = baseUrl + "/api/units/" + unitID
    axios.delete(unitURL)
    .then(response => {
      console.log("DELETE response", response)

      axios.get( baseUrl + "/api/units")
      .then((response) => {
        console.log("response: ", response)
        setUnits(response.data)
      })
    })
    .catch(
      (error) => {
        alert("ERROR: Unit does not exist, and cannot be deleted")
      }
    )
  }

  useEffect(() => {
    axios.get( baseUrl + "/api/units")
    .then((response) => {
      console.log("response: ", response)
      setUnits(response.data)
    })
  },[])

  return (
    <div className="App">
      <div className="row">
        <div className="four columns">
          <UnitForm updateFn={addNewUnit}/>
        </div>
        <div className="six columns">
          <ul style={{listStyleType:'none'}}>
            {units.map((unit) => (<Unit key={unit.id} unit={unit} deleteFunction={deleteUnit}/>
            ))}
          </ul>
        </div>
      </div>     
    </div>
  );
}

export default App;
