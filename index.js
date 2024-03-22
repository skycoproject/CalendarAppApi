const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');

const cors = require('cors');


//* Create server

const app = express();

//* Data base
dbConnection();

//*Cors

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// app.use(cors);

//* Public Directory
app.use( express.static('public') );

//* Reading and parse
app.use(express.json() );

//* Route
app.use(`/api/${process.env.NODE_API_VERSION}/auth`, require('./routes/auth'));
app.use(`/api/${process.env.NODE_API_VERSION}/events`, require('./routes/events'));


//* listen petition
app.listen( process.env.NODE_PORT, () =>{
    console.log(`The server is running on port ${ process.env.NODE_PORT }`)
});