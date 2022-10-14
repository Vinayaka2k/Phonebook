import React from "react";
const Persons = ({persons,deletePersonHandler}) => {
    return (
    <div>
        {persons.map(person => 
            <div key={person.id}>
                <p>{person.name} - {person.number}   <button onClick={() => deletePersonHandler(person.id)}>delete</button></p>
            </div>    
                )}
    </div>
    );
}
export default Persons;
