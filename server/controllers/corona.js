var dataBase = require("./connection.js");



exports.getCorona = (req, res) => {
    const memberId = req.params.memberId
    if (memberId !== null) {
        let sql = `SELECT * FROM corona WHERE memberId = ${memberId}`
        dataBase.query(sql, (err, result) => {
            if (err)
                res.status(400).send({ mas: err });
            res.send(result);
        })
    }
}



exports.deleteCorona = (req, res) => {
    const memberId = req.params.memberId
    if (memberId) {
        let sql = `DELETE FROM corona WHERE memberId=${memberId}`
        dataBase.query(sql, (err, result) => {
            if (err)
                res.status(400).send({ mas: err });
            res.send(result);

        })
    }
}


exports.updateCorona = (req, res) => {
    const corona = req.body

    if (corona) {
        let sql = `UPDATE Corona 
        SET positiveTestDate='${corona.positiveTestDate}',
            recoveryDate='${corona.recoveryDate}'
        WHERE memberId=${corona.memberId}`
      
        dataBase.query(sql, (err, result) => {
            if (err)
                res.status(400).send({ mas: err });
            console.log("success")
            res.send(result);

        })
    }
}





exports.addCorona = (req, res) => {
    let sql = "";
    const corona = req.body;
    if (corona) {
        let sql = `INSERT INTO Corona (memberId, positiveTestDate, recoveryDate) 
                       VALUES (${corona.memberId}, '${corona.positiveTestDate}', '${corona.recoveryDate}')`;
        dataBase.query(sql, (err, result) => {
            if (err)
                res.status(400).send({ mas: err });
            res.send(result);
        })
    }
}


   
