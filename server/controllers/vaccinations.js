var dataBase = require("./connection.js");


//קבלת חיסונים זה רק פר אדם 
exports.getVaccinations = (req, res) => {
    const memberId = req.params.memberId
    if (memberId !== null) {
        let sql = `SELECT * FROM vaccinations WHERE memberId = ${memberId} ORDER BY VaccinationDate`
        dataBase.query(sql, (err, result) => {
            if (err)
                res.status(400).send({ mas: err });
            res.send(result);
        })
    }
}

// פונקצית מחיקת החיסונים תיקרא כשנמחק חבר
exports.deleteVaccinations = (req, res) => {
    const memberId = req.params.memberId
    if (memberId) {
        let sql = `DELETE FROM Vaccinations WHERE memberId=${memberId}`
        dataBase.query(sql, (err, result) => {
            if (err)
                res.status(400).send({ mas: err });
            res.send(result);

        })
    }
}


exports.updateVaccination = (req, res) => {
    const vaccination = req.body

    if (vaccination) {
        let sql = `UPDATE Vaccinations 
        SET manufacturer='${vaccination.manufacturer}',
            VaccinationDate='${vaccination.VaccinationDate}'
        WHERE VaccinationsId=${vaccination.VaccinationsId}`
      
        dataBase.query(sql, (err, result) => {
            if (err)
                res.status(400).send({ mas: err });
            res.send(result);

        })
    }
}

      
   

exports.addVaccinations = (req, res) => {
    let sql = "";
    const data = req.body
    if (data) {
        const memberId = data.memberId;
        const memberQuery = `SELECT COUNT(*) AS vaccinationsCount FROM Vaccinations WHERE memberId = ${memberId}`;
        dataBase.query(memberQuery, (err, result) => {
            if (err) {
                return res.status(400).send({ message: err });
            }

            const vaccinationsCount = result[0].vaccinationsCount;
            console.log(vaccinationsCount, result)
            if (vaccinationsCount >= 4) {
                 return res.status(404).send({ message: 'Cannot add more than 4 vaccinations for a member.' });
            } else {
            //     // הוספת החיסון למסד הנתונים
                const sql = `INSERT INTO Vaccinations (memberId, manufacturer, VaccinationDate) VALUES (${memberId}, '${data.manufacturer}', '${data.vaccinationDate}')`;
                dataBase.query(sql, (err, result) => {
                    console.log(err, result)
                    if (err) {
                        return res.status(400).send({ message: err });
                    }
                    res.send(result);

                });
 }            
        });
    }
};


        

                    
                
            
        

