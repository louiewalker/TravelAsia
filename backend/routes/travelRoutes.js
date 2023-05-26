const express = require('express');
const router = express.Router();
const multer = require('multer');
const Travel = require('../models/Travel');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/images/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

// Create a travel
router.post('/', upload.single('image'), async (req, res) => {
    try {
        let image = req.file.path || "";
        image = '/' + image.replace(/\\/g, '/').split('/').filter(e => e && e != "public").join('/');

        const travel = new Travel({
            ...req.body,
            image
        });
        await travel.save();
        res.status(201).send(travel);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Update a travel by id
router.patch('/:id', upload.single('image'), async (req, res) => {
    try {
        let updates = req.body;
        if (req.file) {
            let image = req.file.path || "";
            image = '/' + image.replace(/\\/g, '/').split('/').filter(e => e && e != "public").join('/');
            updates.image= image
        }

        const travel = await Travel.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
        if (!travel) {
            return res.status(404).send();
        }
        res.send(travel);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all travels
router.get('/', async (req, res) => {
    try {
        const travels = await Travel.find({});
        res.send(travels);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a travel by id
router.get('/:id', async (req, res) => {
    try {
        const travel = await Travel.findById(req.params.id);
        if (!travel) {
            return res.status(404).send();
        }
        res.send(travel);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete a travel by id
router.delete('/:id', async (req, res) => {
    try {
        const travel = await Travel.findByIdAndDelete(req.params.id);
        if (!travel) {
            return res.status(404).send();
        }
        res.send(travel);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
