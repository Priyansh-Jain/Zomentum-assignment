var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection('mongodb://localhost/Movie_Ticket');

autoIncrement.initialize(connection);

var SlotSchema = new mongoose.Schema({
    StartTime:{
        type:Date,
        required:true,
    },
    EndTime:{
        type:Date,
        required:true,
    },
    NumberOfSeats:{
        type: Number,
        required: true,
    },
}, {
    versionKey: false 
});

SlotSchema.plugin(autoIncrement.plugin, 'slot');
var slot = mongoose.model('slot', SlotSchema);
module.exports = slot;
