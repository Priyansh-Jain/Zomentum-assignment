const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var routesTicket = require('./api/ticket');
var routesSlot = require('./api/slot');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect('mongodb://localhost/Movie_Ticket');
var db = mongoose.connection;


//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});

//include routes
app.use('/ticket',routesTicket);
app.use('/slots',routesSlot);

app.get("/",(req,res)=>{
    res.end("hi this is a ticket booking app");
})

app.listen(4000,()=>{
    console.log('server listening on port 4000');
})
