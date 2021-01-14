const { Router } = require('express');
const router = Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.get('/login', (req, res) => {
    res.send({isAuth: res.locals.isAuth})
});

router.get('/logout', (req, res) => {
    req.session.isAuthenticated = false
    req.session.destroy()
    res.end()
});

router.post('/login', async (req, res) => {
    try {
        const {login, password} = req.body
        const candidate = await User.findOne({ login })

        if (candidate) {
            const areSame = await bcrypt.compare(password, candidate.password)

            if (areSame) {
                req.session.user = candidate
                req.session.isAuthenticated = true
                req.session.save(err => {
                    if(err) {
                        throw err
                    }
                    res.send({success: true})
                }) 
            } else {
                res.send({success: false})
            }
             
        } else {
            res.end()
        }
    } catch(e) {
        console.log(e)
    }
   
});

router.get('/register', async (req, res) => {
    const user = await User.findOne({login: req.query.login})

    if (user) {
        res.send(true)
    } else {
        res.send(false)
    }
});

router.post('/register', async (req, res) => {
    try {
        const { login, password, name, city, hospitalName, hospitalAdress, hospitalPhone } = req.body
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({
            name,
            login,
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

router.post('/update', async (req, res) => {
    try {
        const { name, city, hospitalName, hospitalAdress, hospitalPhone } = req.body
        const user = await User.findOne({login: req.session.user.login})

        user.name = name
        user.city = city
        user.hospital.name = hospitalName
        user.hospital.adress = hospitalAdress
        user.hospital.phone = hospitalPhone        

        await user.save()
        res.end()

    } catch(e) {
        console.log(e)
    }
});

router.post('/template', async (req, res) => {
    try {
        const template = req.body
        
        const user = await User.findOne({login: req.session.user.login})

        user.templates.push(template)
        await user.save()
        res.end()

    } catch(e) {
        console.log(e)
    }
});

router.post('/template/delete', async (req, res) => {
    try {
        const template = req.body      
        const user = await User.findOne({login: req.session.user.login})

        user.templates = user.templates.filter(temp => temp.id !== template.id)
        await user.save()
        res.end()

    } catch(e) {
        console.log(e)
    }
});

module.exports = router;