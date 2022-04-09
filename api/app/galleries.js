const express = require('express');
const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');
const config = require('../config');
const auth = require("../middleware/auth");
const Gallery = require("../models/Gallery");
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

router.get('/', async (req, res, next) => {
    try {
        const query = {};
        if (req.query.user) {
            query.user = req.query.user
        }

        const galleries = await Gallery.find(query).populate("user");
        return res.send(galleries);
    } catch (e) {
        next(e);
    }
});

router.post('/', auth, upload.single('image'), async (req, res, next) => {
    try {
            const galleryData = {
            user: req.user._id,
            title: req.body.title,
            image: req.file.filename,
        };

        const gallery = new Gallery(galleryData);

        await gallery.save();

        return res.send(gallery);
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', auth, async (req, res, next) => {
    try {
        if (req.body.user === req.user._id.toString()) {
            const gallery = await Gallery.findById(req.params.id);
            await Gallery.deleteOne(gallery);

            return res.send({message: 'Deleted!'});
        }
        return res.send({message: 'No access!'});

    } catch (e) {
        next(e);
    }
});

module.exports = router;