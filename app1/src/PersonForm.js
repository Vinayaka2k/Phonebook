import React from "react";
const PersonForm = ({newPhone,handlePhoneChange,newName,handleNameChange,handleFormSubmit}) => {
    return (
        <div>
            <form>
                <input onChange={handleNameChange} value={newName}></input>
                <input onChange={handlePhoneChange} value={newPhone}></input>
                <input type="submit" onClick={handleFormSubmit} value="Add Person"></input>
            </form>
        </div>
    );
};
export default PersonForm;