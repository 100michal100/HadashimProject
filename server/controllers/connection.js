const mysql = require('mysql');

// יצירת חיבור למסד הנתונים
const connection = mysql.createConnection({
  host: 'localhost', // המארח של מסד הנתונים
  user: 'root', // שם משתמש למסד הנתונים
  password: 'ms213827827', // סיסמה למסד הנתונים
  database: 'DB' // שם מסד הנתונים
  
});

// התחברות למסד הנתונים
connection.connect((err) => {
  if (err) {
    console.error('שגיאה בחיבור:', err.stack);
    return;
  }

  console.log('מחובר כמשתמש ID:', connection.threadId);
});

// בצע שאילתת SQL
connection.query('SELECT * FROM Members', (err, results) => {
  if (err) throw err;
  console.log('התוצאה היא: ', results);
});

// // סגור את החיבור למסד הנתונים
// connection.end();





module.exports = connection;









// const express = require('express')
// const sql = require('mssql');
// const PORT = 1433

// //'MICHALSEGAL-PC\MSSQLSERVER01
// const config = {
//     user: 'michals',
//     password: 'ms213827827',
//     server: 'MICHALSEGAL-PC\MSSQLSERVER01', // כתובת השרת
//     database: 'DB', // שם מסד הנתונים
//     dialect: "mssql",
// dialectOptions: {
//     instanceName: "SQLEXPRESS"
// }
// };

// let connection = sql.connect(config ,(err)=>{
//     if(err){
//         console.log(err);
//     }else{
//         res.send('DB conected')
//     }
// })


// module.exports = connection;




