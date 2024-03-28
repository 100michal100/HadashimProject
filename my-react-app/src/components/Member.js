import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../css/member.css'


function Member() {


    const [memberDetails, setMemberDetails] = useState(null);
    const [coronaDetails, setCoronaDetails] = useState(null);

    const [vaccinations, setVaccinations] = useState([]);

    const [isEditMode, setIsEditMode] = useState(false); // אם לעדכון או להוספה  
    let navigate = useNavigate();
    const memberId = window.location.href.split("/").pop().split("?")[0]


    useEffect(() => {
        fetch(`http://localhost:3002/members/${memberId}`) // נתוני הלקוח 
            .then(response => response.json())
            .then(data => {
                setMemberDetails(data[0]);
            })
            .catch(error => {
                console.error('Error fetching member details:', error);
            });

        fetch(`http://localhost:3002/corona/${memberId}`) // נתוני קורונה 
            .then(response => response.json())
            .then(data => {
                setCoronaDetails(data[0]);
            })
            .catch(error => {
                console.error('Error fetching member details:', error);
            });


        fetch(`http://localhost:3002/vaccinations/${memberId}`) // נתוני חיסונים של הלקוח 
            .then(response => response.json())
            .then(data => {
                setVaccinations(data);

            })
            .catch(error => {
                console.error('Error fetching member details:', error);
            });

    }, [memberId]);

 

    const updateMemberDetails = (memberDetails) => {
        return fetch('http://localhost:3002/members', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(memberDetails),
        })
            .then(response => response.json())
            .catch(error => {
                console.error('Error updating member details:', error);
            });
    };

    const updateCoronaDetails = (coronaDetails) => {
        if (coronaDetails)
            return fetch('http://localhost:3002/corona', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ memberId, recoveryDate: coronaDetails.recoveryDate, positiveTestDate: coronaDetails.positiveTestDate }),
            })
                .then(response => response.json())
                .catch(error => {
                    console.error('Error updating corona details:', error);
                });
    };

    const updateVaccinations = (vaccinations) => {
        console.log(vaccinations)
        vaccinations.map((vaccination, index) =>

            fetch('http://localhost:3002/vaccinations', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vaccination),

            })
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        console.error('Error updating member:', response.statusText);
                    }
                })

                .catch(error => {
                    console.error('Error updating vaccinations details:', error);
                })
        )
    };
    useEffect(() => {

    }, [memberDetails]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // עדכון נתוני החבר בטבלת Members
        updateMemberDetails(memberDetails)
            .then(data => {
                console.log('Member details updated successfully:', data);
                // עדכון נתוני החולשת בטבלת Corona
                return updateCoronaDetails(coronaDetails);
            })
            .then(data => {
                console.log('Corona details updated successfully:', data);
                // עדכון נתוני החיסונים בטבלת Vaccinations
                return updateVaccinations(vaccinations);
            })
            .then(data => {
                console.log('Vaccinations details updated successfully:', data);
                setIsEditMode(false); // סיום עריכה כאשר הטופס נשלח
            })
            .catch(error => {
                console.error('Failed to update details:', error);
            });
    };


  
    return (
        <div>
            <h2>פרטי החבר</h2>
            {isEditMode ? (// עדכון
                <form onSubmit={handleSubmit}>
                    <label>שם פרטי:</label>
                    <input type="text" value={memberDetails && memberDetails.memberFName} onChange={(e) => setMemberDetails({ ...memberDetails, memberFName: e.target.value })} />
                    <label>שם משפחה:</label>
                    <input type="text" value={memberDetails && memberDetails.memberLName} onChange={(e) => setMemberDetails({ ...memberDetails, memberLName: e.target.value })} />
                    <label>תעודת זהות:</label>
                    <input type="text" value={memberDetails && memberDetails.IdentityCard} onChange={(e) => setMemberDetails({ ...memberDetails, IdentityCard: e.target.value })} />
                    <label>כתובת:</label>
                    <input type="text" value={`${memberDetails && memberDetails.city}`} onChange={(e) => setMemberDetails({ ...memberDetails, city: e.target.value })} />
                    <input type="text" value={` ${memberDetails && memberDetails.street}`} onChange={(e) => setMemberDetails({ ...memberDetails, street: e.target.value })} />
                    <input type="text" value={` ${memberDetails && memberDetails.building}`} onChange={(e) => setMemberDetails({ ...memberDetails, building: e.target.value })} />

                    <label>תאריך לידה:</label>
                    <input type="text" value={memberDetails && memberDetails.dateOfBirth} onChange={(e) => setMemberDetails({ ...memberDetails, dateOfBirth: e.target.value })} /> 
                    <label>טלפון:</label>
                    <input type="text" value={memberDetails && memberDetails.telephone} onChange={(e) => setMemberDetails({ ...memberDetails, telephone: e.target.value })} />
                    <label>טלפון נייד:</label>
                    <input type="text" value={memberDetails && memberDetails.mobilePhone} onChange={(e) => setMemberDetails({ ...memberDetails, mobilePhone: e.target.value })} />
                    <label >תאריך קבלת תוצאה חיובית:</label>
                    <input type="text" className="formT" value={coronaDetails && coronaDetails.positiveTestDate} onChange={(e) => setCoronaDetails({ ...coronaDetails, positiveTestDate: e.target.value })} />
                    <label >תאריך החלמה מהמחלה:</label>
                    <input type="text" className="formT" value={coronaDetails && coronaDetails.recoveryDate} onChange={(e) => setCoronaDetails({ ...coronaDetails, recoveryDate: e.target.value })} />

                    <h2>רשימת החיסונים</h2>
                    {vaccinations[0] && vaccinations.map((vaccination, index) => (
                        <div>
                            <label>יצרן:</label>
                            <input type="text" value={vaccination.manufacturer}
                                onChange={(e) => setVaccinations(prev => {
                                    const vaccinations = prev.filter(
                                        (v) => !(v.VaccinationsId === vaccination.VaccinationsId)
                                    );
                                    return [...vaccinations, { VaccinationsId: vaccination.VaccinationsId, manufacturer: e.target.value, VaccinationDate: vaccination.VaccinationDate }];
                                })}
                            ></input>
                            <label>תאריך חיסון:</label>
                            <input type="text" value={vaccination.VaccinationDate}
                                onChange={(e) => setVaccinations(prev => {
                                    const vaccinations = prev.filter(
                                        (v) => !(v.VaccinationsId === vaccination.VaccinationsId)
                                    );
                                    return [...vaccinations, { VaccinationsId: vaccination.VaccinationsId, manufacturer: vaccination.manufacturer, VaccinationDate: e.target.value }];
                                })}
                            ></input>

                        </div>
               
                    ))}




                    <button type="submit">שמור</button>
                </form>
            ) : (//צפייה
                <div>
                    <label>שם פרטי:</label>
                    <input type="text" value={memberDetails && memberDetails.memberFName} readOnly />
                    <label>שם משפחה:</label>
                    <input type="text" value={memberDetails && memberDetails.memberLName} readOnly />
                    <label>תעודת זהות:</label>
                    <input type="text" value={memberDetails && memberDetails.IdentityCard} readOnly />
                    <label>כתובת:</label>
                    <input type="text" value={memberDetails && `${memberDetails.city}, ${memberDetails.street} ${memberDetails.building}`} readOnly />
                    <label>תאריך לידה:</label>
                    <input type="text" value={memberDetails && memberDetails.dateOfBirth} readOnly />
                    <label>טלפון:</label>
                    <input type="text" value={memberDetails && memberDetails.telephone} readOnly />
                    <label>טלפון נייד:</label>
                    <input type="text" value={memberDetails && memberDetails.mobilePhone} readOnly />
                    <label >תאריך קבלת תוצאה חיובית:</label>
                    <input type="text" className="formT" value={coronaDetails && coronaDetails.positiveTestDate} readOnly />
                    <label >תאריך החלמה מהמחלה:</label>
                    <input type="text" className="formT" value={coronaDetails && coronaDetails.recoveryDate} readOnly />

                    <h2>רשימת החיסונים</h2>
                    <ul>
                        {vaccinations[0] && vaccinations.map((vaccination, index) => (
                            <li key={index}>
                                <p>יצרן: {vaccination.manufacturer} </p>
                                <p>תאריך חיסון: {vaccination.VaccinationDate} </p>
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => { navigate(`/AddVaccination/${memberDetails.memberId}`) }}>הוספת חיסון</button>

                    <button onClick={() => setIsEditMode(true)}>ערוך</button>
                </div>
            )}
        </div>
    );
}

export default Member;


