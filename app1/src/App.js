// Phonebook
import PersonForm from "./PersonForm"
import Persons from "./Persons"
import { useEffect, useState } from 'react'
import phoneService from "./services/phoneService";
import "./index.css"
import Notification from "./Notification"

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [errorMessage,setErrorMessage] = useState(null);
    
    useEffect(() => {
        (async function(){
            let personList = await phoneService.getAll();
            setPersons(personList);
        })();
    }, []);

    const handleNameChange = (ev) => {
        setNewName(ev.target.value);
    }
    
    const handlePhoneChange = (ev) => {
        setNewPhone(ev.target.value);
    }

    const deletePersonHandler = async (personId) => {
        let res = await phoneService.deletePerson(personId);
        setPersons(persons.filter(person => person.id !== personId));
    }

    const handleFormSubmit = async (ev) => {
        ev.preventDefault();
        let person = persons.find(person => person.name === newName);
        if(person) {
            let personObj = await phoneService.updatePerson({
                ...person,
                number: newPhone
            });
            setPersons(persons.map(p => p.id === person.id ? personObj : p));
            setErrorMessage("Person updated!");
            setTimeout(() => setErrorMessage(), 1000);
        }
        else {
            let personObj = await phoneService.createPerson({
                name: newName,
                number: newPhone
            });
            setPersons(persons.concat(personObj));
            setErrorMessage("Person created!");
            setTimeout(() => setErrorMessage(), 1000);
        }
        setNewName('');
        setNewPhone('');
    }
    
    return (
      <div>
        <Notification message={errorMessage}/>
        <h2>Add new entry</h2>
        <PersonForm newPhone={newPhone} handlePhoneChange={handlePhoneChange} newName={newName} handleNameChange={handleNameChange} handleFormSubmit={handleFormSubmit}/>
        <h2>Numbers</h2>
        <Persons persons={persons} deletePersonHandler={deletePersonHandler}/>
      </div>
    )
  }
  
  export default App