var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection('mongodb://localhost/Movie_Ticket');

autoIncrement.initialize(connection);

var TicketSchema = new mongoose.Schema({
    UserName:{
        type: String,
        required: true,
    },
    PhoneNo: {
        type: Number,
        required: true,
    },
    SlotID:{
        type: Number,
        required: true,
    },
    ExpireAt:{
        type: Date,
        required: true,
        default: undefined,
    }
}, {
    versionKey: false 
});

TicketSchema.index({ "ExpireAt": 1 }, { expireAfterSeconds: 0 });

TicketSchema.plugin(autoIncrement.plugin, 'ticket');
var ticket = mongoose.model('ticket', TicketSchema);
module.exports = ticket;

