var express = require('express');
const slot = require('../models/slot');
var router = express.Router();

router.post('/', (req, res, next) => {

    if (req.body.StartTime && req.body.EndTime && req.body.NumberOfSeats) {

        let newSlot = new slot(req.body);
        // console.log(newcart);

        newSlot.save((err, slot) => {
            if (err) {
                res.send(err);
            }
            res.json(slot);
        });
    }
});

router.get('/', (req, res) => {
    slot.find({}, (err, slot) => {
        if (err) {
            res.send(err);
        }
        res.json(slot);
    })
});


router.get('/:_id',(req, res) => {
    slot.findById(req.params._id, (err, Slot) => {
        if (err) {
            res.send(err);
        }
        console.log(Slot.TimeSlot);
        res.json(Slot);
    })
})


module.exports = router;