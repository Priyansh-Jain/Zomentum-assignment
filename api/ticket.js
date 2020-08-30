var express = require('express');
const ticket = require('../models/ticket');
const slot = require('../models/slot');
var router = express.Router();


//Book a ticket means post data having UserName,PhoneNo,SlotId & ExpireAt
router.post('/', (req, res, next) => {

    if (req.body.UserName && req.body.PhoneNo && req.body.SlotID  ) {

        slot.findById(req.body.SlotID,(err,slotResponse)=>{
            if(err)
            {
                res.send(err);
            }
            
            if(slotResponse.NumberOfSeats > 0)
            {
                let ExpiryTime = slotResponse.StartTime ;
                ExpiryTime.setTime(ExpiryTime.getTime() + 1000 * 60 * 60 * 8);

                req.body.ExpireAt = ExpiryTime;
                
                let newTicket = new ticket(req.body);

                newTicket.save((err, ticket) => {
                    if (err) {
                        res.send(err);
                    }
                    slot.findOneAndUpdate({ _id: req.body.SlotID },{$inc: {NumberOfSeats: -1}}, { new: true }, function(err, slot) {
                        if (err) {
                            console.log("Something wrong when updating data!");
                        }
                    });

                    res.json(ticket);
                });
            }
            else
            {
                res.send("Seats are not available");
            }
        })
    }
});


// View the user’s details based on the ticket id.
router.get('/:ticketID',(req, res) => {

    ticket.findById(req.params.ticketID, (err, Ticket) => {
        if (err) {
            res.send(err);
        }
        if(Ticket == null)
        {
            res.send("TicketID is not correct");
        }
        else
        {
            slot.findById(Ticket.SlotID, (err, Slot) => {
                if (err) {
                    res.send(err);
                }

                let UserDetails = {
                    UserName: Ticket.UserName,
                    PhoneNo: Ticket.PhoneNo,
                    StartTime: Slot.StartTime,
                    EndTime: Slot.EndTime,
                    ExpireAt: Ticket.ExpireAt
                }
                res.json(UserDetails);
            })
        }
    })
})


//Getting all tickets Or Getting all tickets on basis of time
router.get('/', (req, res) => {

    if(req.query.StartTime && req.query.EndTime){
        slot.find({ $and: [{ StartTime: { $gte: req.query.StartTime } }, { EndTime: { $lte: req.query.EndTime } }] } ,(err, Slot) => {
            if (err) {
                res.send(err);
            }

             let SlotID_arr = [];

            for(let i=0 ; i<Slot.length ; i++)
            {
                SlotID_arr.push(Slot[i]._id);
            }

            ticket.find({SlotID: {$in : SlotID_arr}},(err,Ticket)=>{
                if(err)
                {
                    res.send(err);
                }
                res.json(Ticket);
            })
        })
    }
    else{
        ticket.find({}, (err, ticket) => {
            if (err) {
                res.send(err);
            }
            res.json(ticket);
        })
    }
});



//delete a particular data
router.delete('/:TicketID',(req, res) => {

    ticket.findById(req.params.TicketID, (err, Ticket) => {
        if (err) {
            res.send(err);
        }

        slot.findOneAndUpdate({ _id: Ticket.SlotID },{$inc: {NumberOfSeats: +1}}, { new: true }, function(err, slot) {
            if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log(slot);
        });
        deleteTicket();
    })

    var deleteTicket = () => ticket.deleteOne({_id: req.params.TicketID},(err)=>{
        if (err) {
            res.send(err);
        }
        res.json({ message: 'successfully deleted ticket' });
    })
})


//update ticket timing

router.put('/:TicketID', function(req, res) {
    ticket.findById(req.params.TicketID, function (err, Ticket) {
        if (err) {
            res.send(err);
        }
        slot.findOneAndUpdate({ _id: Ticket.SlotID },{$inc: {NumberOfSeats: +1}}, { new: true }, function(err, SlotResponse) {
            if (err) {
                console.log("Something wrong when updating data!");
            }

        });

        slot.findOneAndUpdate({ _id: req.body.SlotID },{$inc: {NumberOfSeats: -1}}, { new: true }, function(err, SlotResponse) {
            if (err) {
                console.log("Something wrong when updating data!");
            }


            let UpdatedExpiryTime = SlotResponse.StartTime ;
            UpdatedExpiryTime.setTime(UpdatedExpiryTime.getTime() + 1000 * 60 * 60 * 8);

            ticket.findOneAndUpdate({_id: req.params.TicketID},{ExpireAt: UpdatedExpiryTime}, function (err, TicketResponse) {
                if (err) {
                    res.send(err);
                }

            })
        });
            
        ticket.findOneAndUpdate({_id: req.params.TicketID},{SlotID: req.body.SlotID}, function (err, Ticket) {
            if (err) {
                res.send(err);
            }

            res.json({message: 'Time Post Updated!'});
        })
    });
  });


module.exports = router;