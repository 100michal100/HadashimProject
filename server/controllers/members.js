var dataBase = require("./connection.js");

exports.getMembers = (req, res) => {
    console.log("aaa1");
    let sql = 'SELECT * FROM members  ORDER BY memberFName'
    dataBase.query(sql, (err, result) => {
        if (err)
            res.status(400).send({ mas: err });
        res.send(result);   
        
       
    })
}

exports.getMember = (req, res) => {
    const memberId = req.params.memberId
    if (memberId !== null) {
        let sql = `SELECT * FROM members WHERE memberId = ${memberId}`
        dataBase.query(sql, (err, result) => {
            if (err)
                res.status(400).send({ mas: err });
            res.send(result);
        })
    }
}




exports.deleteMember = (req, res) => {
    const memberId = req.params.memberId
    if (memberId) {
        let sql = `DELETE FROM members WHERE memberId=${memberId}`
        dataBase.query(sql, (err, result) => {
            if (err)
                res.status(400).send({ mas: err });
            res.send(result);
        })
    }
}


exports.updateMember = (req, res) => {
    const member = req.body

    if (member) {
       
        let sql =  `UPDATE members SET 
        memberFName='${member.memberFName}',
        memberLName='${member.memberLName}',
        dateOfBirth='${member.dateOfBirth}',
        telephone='${member.telephone}',
        mobilePhone='${member.mobilePhone}',
        city='${member.city}',
        street='${member.street}',
        building=${member.building}
        WHERE memberId=${member.memberId}`
        dataBase.query(sql, (err, result) => {
            if (err)
                res.status(400).send({ mas: err });
            res.send(result);

        })
    }
}

exports.addMember = (req, res) => {
    let sql = "";
    const member = req.body

    if (member) {
        
        let sql = `INSERT INTO members (IdentityCard, memberFName, memberLName, dateOfBirth, telephone, mobilePhone, city, street, building) 
                   VALUES ('${member.IdentityCard}',
                    '${member.memberFName}',
                     '${member.memberLName}', 
                     '${member.dateOfBirth}', 
                     '${member.telephone}', 
                     '${member.mobilePhone}', 
                     '${member.city}',
                      '${member.street}',
                       ${member.building})`;
        dataBase.query(sql, (err, result) => {
            if (err)
                res.status(400).send({ mas: err });
            res.send(result);

        })
    }
}


   
