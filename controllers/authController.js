const { register, login } = require('../services/userService')
const mapper = require('../util/mappers')
const router = require('express').Router()

const {isUser, isGuest} = require('../middlewares/guards')

router.get('/register', isGuest(), (req, res) => {
    res.render('register', {layout: false})
})
router.post('/register', isGuest(), async (req,res) => {
    // TODO add checks before registration
    // TODO if checks return true, save the data in session
    const username = req.body.username
    const pass = req.body.pass
    const repass = req.body.repass
    const address = req.body.address

    try{
        if(pass.trim() == repass.trim())
        {
            let user = await register(username, pass, address);
            req.session.user = user
            res.redirect('/')
        }
        else
        {
            throw new Error('The passwords do not match')
        }
    }
    catch(err)
    {
        let errors = mapper(err)
        res.render('register', {layout: false, data: req.session.user, errors: errors})
    }


})

router.get('/login', isGuest(), (req, res) => {
    res.render('login', {layout: false})
})
router.post('/login', isGuest(), async (req,res) => {
    // TODO add checks before login
    // TODO if the checks return true, save the data in session

    const username = req.body.username
    const password = req.body.password
    try{
        let user = await login(username, password)
        req.session.user = user
        res.redirect('/')
    }
    catch(err)
    {
        let errors = mapper(err)
        res.render('login', {layout: false, errors: errors})
    }

})

router.get('/logout', isUser(), (req,res) => {
    delete req.session.user
    res.redirect('/')
})

module.exports = router