const express = require('express');
const app=express();
const connection = require('./controllers/connection')
const members = require('./routes/members');
const corona = require('./routes/corona');
const vaccinations = require('./routes/vaccinations');

const cors = require('cors');
app.use(cors())

app.use(express.json())
app.use("/members",members)
app.use("/corona",corona)
app.use("/vaccinations",vaccinations)


//app.get("*",function(req,res){res.send("in")})
app.listen(3002 , ()=> {console.log("the server is running")});

module.exports = app;


