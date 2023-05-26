const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/images/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});


const upload = multer({ storage: storage });

// Create an event
router.post('/', upload.single('image'), async (req, res) => {
    try {

        let image = req.file.path || "";
        image = '/' + image.replace(/\\/g, '/').split('/').filter(e => e && e != "public").join('/');


        const event = new Event({
            ...req.body,
            image
        });
        await event.save();
        res.status(201).send(event);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Update an event by id
router.patch('/:id', upload.single('image'), async (req, res) => {
    try {
        let updates = req.body;
        if (req.file) {
            let image = req.file.path || "";
            image = '/' + image.replace(/\\/g, '/').split('/').filter(e => e && e != "public").join('/');
            updates.image= image
        }

        console.log(req.file)
        const event = await Event.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
        if (!event) {
            return res.status(404).send();
        }
        res.send(event);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find({});
        res.send(events);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get an event by id
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).send();
        }
        res.send(event);
    } catch (error) {
        res.status(500).send(error);
    }
});



// Delete an event by id
router.delete('/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).send();
        }
        res.send(event);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
