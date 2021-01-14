const { Router } = require('express');
const router = Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    if (req.session.user) {
        res.json(await User.findOne({login: req.session.user.login}));
    }    
});  

module.exports = router;