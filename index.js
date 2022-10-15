require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const Person = require("./models/person")

app.use(express.static('build'))
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

app.get("/api/persons", async (req,res) => {
    let people = await Person.find({});
    res.json(people);
})

app.get("/api/persons/:personId", async (request,response) => {
    let personObj = await Person.findById(request.params.personId);
    if(personObj) {
        return response.status(200).json(personObj);
    }else {
        return response.status(404).json({
            error: "Resource not found"
        });
    }
})

app.delete("/api/persons/:personId", async (request,response) => {
    let personObj = await Person.findById(request.params.personId);
    if(personObj) {
        await Person.deleteOne({"_id": request.params.personId});
        return response.status(204).json(personObj);
    }
    else {
        return response.status(204).json({
            error: "No Person exists with the given id"
        })
    }
})

app.post("/api/persons", async (request,response) => {
    const body = request.body;
    const person = new Person(body);
    let personObj = await person.save();
    return response.status(201).json(personObj);
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})