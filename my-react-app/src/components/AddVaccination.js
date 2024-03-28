import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isValidDate, isValidName } from '../validations.js';


function AddVaccination() { 
  
  const [manufacturer, setManufacturer] = useState("");
  const [vaccinationDate, setVaccinationDate] = useState("");

  let navigate = useNavigate();
  const memberId= window.location.href.split("/").pop().split("?")[0]



  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
    window.location.href = '/' 

  };


  const validation = (data) => {
    const { manufacturer, vaccinationDate } = data;
    let invalidFields = [];
    
    // בדיקת השם
    if (!isValidName(data.manufacturer)) {
        invalidFields.push('שם יצרן');
    }

    if (!isValidDate(data.vaccinationDate)) {
      invalidFields.push('תאריך חיסון');
  }
    
    const isValid = invalidFields.length === 0;

    return { isValid, invalidFields };
};


  const onSubmit =()=> {
 
    fetch('http://localhost:3002/vaccinations', {  
      method: 'POST',
      body: JSON.stringify({memberId,manufacturer, vaccinationDate}),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log('res',response);
        if (response.ok) {
          console.log('Vaccination added successfully');

        } else if(response.status==404){
          console.error('there is limit of four vaccination');
          alert('there is limit of four vaccination')
        }
        else{
          console.error('Failed to add vaccination');
        }
      })
      .catch(error => {
        console.error('Error adding vaccination:', error);
      });


  };


  return (
    <div className="App">
      <form onSubmit={handleSubmit}>

        <label>יצרן החיסון:</label>
        <input type="text" className="formT" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} />
        <br/>
        <label>תאריך החיסון:</label>
        <input type="text" className="formT" value={vaccinationDate} onChange={(e) => setVaccinationDate(e.target.value)} />
        <br/>
        
        <button type="submit"  >לאישור</button>
      </form>
    </div>
  );
}

export default AddVaccination;
