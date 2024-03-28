import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function ViewAllMembers() {
    const [members, SetMembers] = useState([]);

    let navigate = useNavigate();


    useEffect(() => {
        fetch(`http://localhost:3002/members`) 
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                SetMembers(data);
                console.log(members)

            })
            .catch(error => {
                console.error('Error fetching members:', error);
            });
    }, []);



    const deleteMember = (memberId) => {
        fetch(`http://localhost:3002/members/${memberId}`, { method: 'DELETE'})
        .then(response => {
            if (response.ok) {
                // אם המחיקה הצליחה, נעדכן את הרשימה ללא החבר שנמחק
                SetMembers(prevMembers => prevMembers.filter(member => member.memberId !== memberId));
                alert("הפעולה הושלמה בהצלחה")
                            
            } else {
                console.error('Error deleting member:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error deleting member:', error);
        });
    };

    
    return (
        <div>
            <h1>רשימת חברי הקופה</h1>
            <button  onClick={() => { navigate("/AddMember") }}>הוסף חבר חדש</button>
            <ul>
                {members.map(member => (
                    <div>
                    <li key={member.memberId} onClick={() => {navigate(`/Member/${member.memberId}`)}}> 
                        <strong>שם:</strong> {member.memberFName} {member.memberLName}<br />
                        <strong>תעודת זהות:</strong> {member.IdentityCard}<br />
                        <strong>כתובת:</strong> {member.city}, {member.street} {member.building}<br />
                        <strong>תאריך לידה:</strong> {member.dateOfBirth}<br />
                        <strong>טלפון:</strong> {member.telephone}<br />
                        <strong>טלפון נייד:</strong> {member.mobilePhone}<br />
                    </li>
                         <button onClick={() => deleteMember(member.memberId)}>  מחיקה </button>
                    </div>
                ))}
            </ul>

        </div>
    );
}

export default ViewAllMembers;



  

                      
