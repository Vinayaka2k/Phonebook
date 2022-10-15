const personRouter = require("express").Router()
const Person = require("../models/person")

personRouter.get("/", async (req,res) => {
    let people = await Person.find({});
    res.json(people);
})

personRouter.get("/:personId", async (request,response) => {
    let personObj = await Person.findById(request.params.personId);
    if(personObj) {
        return response.status(200).json(personObj);
    }else {
        return response.status(404).json({
            error: "Resource not found"
        });
    }
})

personRouter.delete("/:personId", async (request,response) => {
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

personRouter.post("/", async (request,response) => {
    const body = request.body;
    const person = new Person(body);
    let personObj = await person.save();
    return response.status(201).json(personObj);
})

personRouter.put("/:id", async (request, response) => {
    const body = request.body;
    let res = await Person.findByIdAndUpdate(request.params.id, body, {new:true});
    return response.status(200).json(res);
})

module.exports = personRouter