const { Router } = require('express');
const router = Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    if (req.session.user) {
        res.json(await User.findOne({email: req.session.user.email}));
    }    
});     

module.exports = router;