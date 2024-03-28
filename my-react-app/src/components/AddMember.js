
import {useState, useEffect } from "react" ;
import { useNavigate } from "react-router-dom";
import { isValidMobilePhone, isValidPhoneNumber, isValidIsraeliID, isValidName,isValidDate,isValidText,isValidNumber } from '../validations.js';


function AddMember() {

 const [showMember, setShowMember] = useState(false);
 const [IdentityCard, setIdentityCard] = useState(0);
 const [memberFName, setMemberFName] = useState("");
 const [memberLName, setMemberLName] = useState("");
 const [dateOfBirth, setDateOfBirth] = useState("");
 const [telephone, setTelephone] = useState(0);
 const [mobilePhone, setMobilePhone] = useState(0);
 const [city, setCity] = useState("");
 const [street, setStreet] = useState("");
 const [building, setBbuilding] = useState(0);
 const [positiveTestDate, setPositiveTestDate] = useState("");
 const [recoveryDate, setRecoveryDate] = useState("");

 let navigate = useNavigate();

 
 const handleSubmit = (e) => {
  e.preventDefault();
  const formData = {
    IdentityCard,memberFName,memberLName,dateOfBirth,telephone,mobilePhone,city ,street,building,positiveTestDate, recoveryDate
  };
  onSubmit(formData);

};




   const validation = (data) => {
 const { IdentityCard,memberFName,memberLName,dateOfBirth,telephone,mobilePhone,city ,street,building,positiveTestDate, recoveryDate} = data;
    let invalidFields = [];
    // בדיקת מספר הפלאפון
    if (!isValidMobilePhone(data.mobilePhone)) {
        invalidFields.push('מספר פלאפון');
    }
    // בדיקת מספר הטלפון
    if (!isValidPhoneNumber(data.telephone)) {
        invalidFields.push('מספר טלפון');
    }
    // בדיקת תעודת הזהות
    if (!isValidIsraeliID(data.IdentityCard)) {
        invalidFields.push('תעודת זהות');
    }
    // בדיקת השם

    if (!isValidName(data.memberFName)) {
        invalidFields.push('שם פרטי');

    }

    if (!isValidDate(data.dateOfBirth)) {
        invalidFields.push('תאריך לידה');

    }
    if (!isValidText(data.city)) {
        invalidFields.push('עיר');

    }
    if (!isValidText(data.street)) {
        invalidFields.push('רחוב');

    }
    if (!isValidNumber(data.building)) {
        invalidFields.push('בנין');

    }
    if (!isValidDate(data.recoveryDate)) {
        invalidFields.push('תאריך החלמה');

    }
    if (!isValidDate(data.positiveTestDate)) {
        invalidFields.push('תאריך חיובי');

    }
    const isValid = invalidFields.length === 0;

    return { isValid, invalidFields };
};
    


const onSubmit = (data) => {
    const { isValid, invalidFields } = validation(data);
    if (isValid) {    
        addMember(data);
    }
     else {
         alert('שדות  אינם תקינים אנא הקש שוב:', invalidFields.join(', '));
     }
};

const addMember = (data) => {
    console.log("in",data)
    fetch('http://localhost:3002/members', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(response => {
        if (response) {
            console.log('Member added successfully', response);
            addCoronaData(response.insertId, recoveryDate,positiveTestDate);
            navigate(`/Member/${response.insertId}`)

        } else {
            console.error('Failed to add member');
        }
    })
    .catch(error => {
        console.error('Error adding member:', error);
    });
};


const addCoronaData = (memberId,positiveTestDate,recoveryDate) => {

    fetch('http://localhost:3002/corona', {
        method: 'POST',
        body: JSON.stringify({memberId,positiveTestDate,recoveryDate}),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            console.log('Corona data added successfully');
            // פעולות נוספות לאחר הוספת הנתונים של הקורונה...
        } else {
            console.error('Failed to add corona data');
        }
    })
    .catch(error => {
        console.error('Error adding corona data:', error);
    });
};




  return (
    <div className="App"> 
    
  <form onSubmit={handleSubmit}>
            <label >תעודת זהות:</label>
            <input type="text" className="formT" value={IdentityCard} onChange={(e) => setIdentityCard(e.target.value)} required/>
<br/>
            <label >שם פרטי : </label>
            <input type="text" className="formT" value={memberFName} onChange={(e) => setMemberFName(e.target.value)} required/>
            <br/>

            <label >שם משפחה : </label>
            <input type="text" className="formT" value={memberLName} onChange={(e) => setMemberLName(e.target.value)} required/>
            <br/>

            <label >תאריך לידה: </label>
            <input type="text" className="formT" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required/>     
            <br/>

            <label >טלפון:</label>
            <input type="tel" className="formT" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
            <br/>

            <label >נייד:</label>
            <input type="tel" className="formT" value={mobilePhone} onChange={(e) => setMobilePhone(e.target.value)} required/>
            <br/>

            <label > עיר: </label>
            <input type="text" className="formT" value={city} onChange={(e) => setCity(e.target.value)} required/>     
            <br/>

            <label >רחוב:</label>
            <input type="text" className="formT" value={street} onChange={(e) => setStreet(e.target.value)} />
            <br/>

            <label >דירה:</label>
            <input type="text" className="formT" value={building} onChange={(e) => setBbuilding(e.target.value)} required/>
            <br/>

            <label >תאריך קבלת תוצאה חיובית:</label>
            <input type="text" className="formT" value={positiveTestDate} onChange={(e) => setPositiveTestDate(e.target.value)}/>
            <br/>

            <label >תאריך החלמה מהמחלה:</label>
            <input type="text" className="formT" value={recoveryDate} onChange={(e) => setRecoveryDate(e.target.value)}/>
            <br/>


            <button type="submit">לאישור</button>
        </form>

     </div>
  );
}

export default AddMember;

 







         
        


            
