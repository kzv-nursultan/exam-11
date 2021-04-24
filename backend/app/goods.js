const express = require('express');
const path = require('path');
const multer = require("multer");
const {nanoid} = require("nanoid");
const config = require('../config');
const Good = require("../models/GoodsSchema");
const User = require("../models/UserSchema");
const auth = require("../middleware/auth");
const router = express.Router();


const storage = multer.diskStorage({
    destination: (req,file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid(5) + path.extname(file.originalname));
    }
});

const upload = multer({storage});


router.get('/', async (req, res)=>{
    try {
        const data = await Good.find();
        res.send(data);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res)=>{
    try {
        const item = await Good.findById(req.params.id).populate('author');
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/', auth, upload.single('image'), async (req, res)=>{
    const data = req.body;

    if (req.file) {
        data.image = '/uploads/' + req.file.filename;
    }

    try {
        if(data.category && data.title && data.description && data.image && data.author && data.price) {
            const newGood = await new Good(data);
            await newGood.save();
            res.status(200).send(newGood);
        } else {
            res.status(400).send('Check your inputs');
        }

    } catch (error) {
        res.status(500).send(error)
    }
});

router.delete('/:id', auth, async (req, res)=>{
    try {
        const data = await Good.findById(req.params.id);
        const user = await User.findById(data.author);

        if (req.user._conditions.token === user.token) {
            await Good.findByIdAndDelete(req.params.id);
            res.send({message: 'Successfully deleted!'});
        } else {
            res.status(403).send({message: 'This action is forbidden'});
        }

    } catch (error){
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res)=> {
    try {
        const data = await Good.find({category: req.params.id});
        res.send(data);
    } catch {

    }
})

module.exports = router;