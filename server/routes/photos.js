const { Router } = require('express');
const router = Router();
const Photo = require('../models/Photo');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'hapufqksm', 
    api_key: '171345659342734', 
    api_secret: 'qExlWQPLmPGH7xU04TWgCQ3wEk0' 
});

router.get('/', async (req, res) => {
       res.json(await Photo.find());
    });
     
router.post('/', async (req, res) => { 
    await cloudinary.uploader.upload(req.files.photo.tempFilePath, function(err, result) {
        if (err) {
            throw err
        }
        const photo = new Photo({
            author: req.session.user.name,
            city: req.session.user.city,
            url: result.secure_url,
            category: req.body.category,
            pathology: req.body.pathology,
            description: req.body.description,
            text: req.body.text
        })

        try {
            photo.save();
            res.redirect('/');
        } catch(e) {
            console.log(e)
        }       
    })  
});

module.exports = router;