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

router.get('/', async (req, res) => {
       res.json(await Photo.getData());
    });
     
router.post('/', upload.single('photo'), async (req, res) => {  
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