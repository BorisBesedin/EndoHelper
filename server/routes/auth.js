const { Router } = require('express');
const router = Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.get('/login', (req, res) => {
    console.log(req.session.isAuthenticated)
    res.send({isAuth: res.locals.isAuth})
});

router.get('/logout', (req, res) => {
    req.session.isAuthenticated = false
    req.session.destroy()
    res.end()
});

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body
        const candidate = await User.findOne({ email })

        if (candidate) {
            const areSame = await bcrypt.compare(password, candidate.password)

            if (areSame) {
                req.session.user = candidate
                req.session.isAuthenticated = true
                req.session.save(err => {
                    if(err) {
                        throw err
                    }
                    res.redirect('/')
                }) 
            } else {
                res.end()
            }
             
        } else {
            res.end()
        }
    } catch(e) {
        console.log(e)
    }
   
});

router.get('/register', async (req, res) => {
    const user = await User.findOne({email: req.query.email})

    if (user) {
        res.send(true)
    } else {
        res.send(false)
    }
});

router.post('/register', async (req, res) => {
    try {
        const { email, password, name, city, hospitalName, hospitalAdress, hospitalPhone } = req.body
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({
            name,
            email,
            password: hashPassword,
            city,
            hospital: {
                name: hospitalName,
                adress: hospitalAdress,
                phone: hospitalPhone
            }
        })

        await user.save()
        res.end()

    } catch(e) {
        console.log(e)
    }
});

module.exports = router;