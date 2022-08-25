
const express = require('express')
const cors = require('cors')
const app = express()

//app.use(express.json())
app.use(cors())
app.use(express.static('build'))


let units = [
    {
        "id": 0,
        "code": "COMP1010",
        "title": "Fundamentals of Computer Science",
        "offering": [
          "S1",
          "S2"
        ]
      },
      {
        "id": 1,
        "code": "COMP1750",
        "title": "Introduction to Business Information Systems",
        "offering": [
          "S1"
        ]
      },
      {
        "id": 2,
        "code": "COMP2110",
        "title": "Web Technology",
        "offering": [
          "S1",
          "S2"
        ]
      },
      {
        "id": 3,
        "code": "COMP2750",
        "title": "Applications Modelling and Development",
        "offering": [
          "S1"
        ]
      },
      {
        "id": 4,
        "code": "MMCC2045",
        "title": "Interactive Web Design",
        "offering": [
          "S2"
        ]
      },
      {
        "id": 5,
        "code": "COMP3120",
        "title": "Advanced Web Development",
        "offering": [
          "S2"
        ]
      },
      {
        "id": 6,
        "code": "COMP3130",
        "title": "Mobile Application Development",
        "offering": [
          "S1"
        ]
      }
]


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/units', (request, response) => {
  response.json(units)
})

app.get('/api/units/:id', (request, response) => {
    const id = Number(request.params.id)
    const unit = units.find(unit => unit.id === id)
    if(unit) {
        response.json(unit)
    } else {
        response.status(404).end()
    }
})

app.put('/api/units/:id', (request, response) => {
    const id = Number(request.params.id)
    const updatedUnit = request.body
    updatedUnit.id = id
    
    units.push(updatedUnit)
    response.json(updatedUnit)
})

app.post('/api/units', (request, response) => {
    const newUnit = request.body
    newUnit.id = units.length
    
    units.push(newUnit)
    response.json(newUnit)
})

app.delete('/api/units/:id', (request, response) => {
    const id = Number(request.params.id)
    units = units.filter(unit => unit.id !== id)
  
    response.status(204).end()
})

const PORT =  process.env.PORT ||3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 