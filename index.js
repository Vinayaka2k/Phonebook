const {v4: uuidv4} = require("uuid")
const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())

let persons = [
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      },
      {
        "name": "newperson",
        "number": "1221",
        "id": 7
      },
      {
        "name": "Arto",
        "number": "Hellas",
        "id": 8
      },
      {
        "name": "Newwst",
        "number": "233",
        "id": 9
      },
      {
        "name": "ASDD",
        "number": "ZXC",
        "id": 10
      },
      {
        "name": "aaa",
        "number": "32434",
        "id": 11
      },
      {
        "name": "saddsa",
        "number": "324",
        "id": 12
      },
      {
        "name": "dsadsa",
        "number": "324432432",
        "id": 13
      },
      {
        "name": "sdadsa",
        "number": "342432",
        "id": 14
      },
      {
        "name": "saddsasa",
        "number": "32432",
        "id": 15
      },
      {
        "name": "dsfds",
        "number": "324",
        "id": 16
      }
    ];

app.get("/api/persons", (req,res) => {
    res.json(persons);
})

app.get("/api/persons/:personId", (request,response) => {
    let personObj = persons.filter(p => p.id === Number(request.params.personId));
    if(personObj.length) {
        return response.status(200).json(personObj);
    }else {
        return response.status(404).json({
            error: "Resource not found"
        });
    }
})

app.delete("/api/persons/:personId", (request,response) => {
    let personObj = persons.find(p => p.id === Number(request.params.personId));
    if(personObj) {
        persons = persons.filter(p => p.id !== personObj.id);
        return response.status(200).json(personObj);
    }else {
        return response.status(200).json({
            error: "Resource not found"
        });
    }
})

app.post("/api/persons", (request,response) => {
    let personObj = {
        ...request.body,
        id: uuidv4()
    }
    persons = persons.concat(personObj);
    return response.status(201).json(personObj);
})

const PORT = prcoess.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
