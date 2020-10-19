const { Router } = require('express');
const router = Router();
const Photo = require('../models/Photo');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'photos');
    },
    filename: (req, file, cb) =>{
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({storage: storage});
// const fs = require('fs');
// const path = require('path')

router.get('/', async (req, res) => {
       res.json(await Photo.getData());
    });
     
router.post('/', upload.single('photo'), async (req, res) => {
        console.log(req.file)
        // let url = '';
        // let fileName = `photo-${Date.now()}.jpeg`;
        // let p = `../../dist/images/${req.body.category}/${req.body.pathology}`;
        // fs.writeFile(path.join(__dirname, p, fileName), req.file.buffer, (err) => {
        //     if (err) throw err;
        //     console.log('It\'s saved!');            
        // });
        // url = `./images/${req.body.category}/${req.body.pathology}/${fileName}`;

    
    const photo = new Photo(
        req.body.author, 
        `/${req.file.destination}/${req.file.filename}`,
        req.body.description,
        req.body.text
        );
    await photo.save(req.body.category, req.body.pathology);
    res.redirect('/');
    res.json({state: 'success'});
    
});

module.exports = router;