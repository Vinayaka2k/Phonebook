import axios from "axios"
const baseUrl = "/api/persons";

const getAll = async () => {
    let res = await axios.get(baseUrl);
    return res.data;
}

const updatePerson = async (personObj) => {
    let res = await axios.put(`${baseUrl}/${personObj.id}`, personObj);
    return res.data;
}

const deletePerson = async (personId) => {
    let res = await axios.delete(`${baseUrl}/${personId}`);
    return res.data;
}

const createPerson = async (personObj) => {
    let res = await axios.post(baseUrl, personObj);
    return res.data;
}

export default {
    getAll,
    deletePerson,
    createPerson,
    updatePerson
};