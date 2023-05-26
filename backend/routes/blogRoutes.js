const express = require('express');
const multer = require('multer');
const router = express.Router();
const Blog = require('../models/Blog');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/images/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

// Create a new blog with image
router.post('/', upload.array('images'), (req, res) => {
    const images = req.files.map(file => {
        let path = '/' + file.path.replace(/\\/g, '/').split('/').filter(e => e && e != "public").join('/');
        return path;
    });

    const blog = new Blog({
        ...req.body,
        images
    });

    blog.save()
        .then(savedBlog => res.json( savedBlog))
        .catch(err => res.status(400).json({ error: err.message }));

});

// Get all blogs
router.get('/', (req, res) => {
    Blog.find()
        .then(blogs => res.json(blogs))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Get a specific blog by id
router.get('/:id', (req, res) => {
    Blog.findById(req.params.id)
        .then(blog => res.json(blog))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Update a specific blog by id with new images
router.patch('/:id', upload.array('images'), async (req, res) => {
    try {
        let images = req.files.map(file => {
            let path = '/' + file.path.replace(/\\/g, '/').split('/').filter(e => e && e != "public").join('/');
            return path;
        });

        const updatedBlog = {
            ...req.body,
            images
        };

        const blog = await Blog.findByIdAndUpdate(req.params.id, updatedBlog, { new: true });

        if (!blog) {
            res.status(404).send({ message: "Blog not found" });
        } else {
            res.status(200).send(blog);
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a specific blog by id
router.delete('/:id', (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: "Blog deleted successfully!" }))
        .catch(err => res.status(400).json({ error: err.message }));
});

module.exports = router;
