const express = require('express')
const router = express.Router()
const multer =  require('multer')
const Food = require('../model/food')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

var upload = multer({
    storage: storage
})

router.post('/',upload.single('image'), async(req, res) => {
    console.log("e")
    try {
        var newfood = new Food({
            items: req.body.items,
            food_type: req.body.food_type,
            posted_by: req.body.posted_by,
            max_people: req.body.max_people,
            city:req.body.city,
            imageUrl: 'https://foodwaste-backend.herokuapp.com/images/' + req.file.originalname,
            expirationDate:new Date(Date.now() + (parseFloat(req.body.hour) * 3600 * 1000))
        })
        await newfood.save().then(()=>{
            res.status(201).json({result:"ok"})
        })
    }catch(err){
        console.error(err)
        res.status(500).json({})
    }
})

module.exports = router
