const mapper = require('../util/mappers')
const router = require('express').Router()

const {isUser, isGuest} = require('../middlewares/guards')
const { createPost } = require('../services/CRUD')


router.get('/create', isUser(), (req, res) => {
    res.render('create', {layout: false})
})

router.post('/create', isUser(), async (req, res) => {
    const title = req.body.title
    const tech = req.body.tech
    const image = req.body.image
    const certificate = req.body.certificate

    let result = await createPost(title, tech, image, certificate, req.session.user._id)

    res.redirect('/')
})

module.exports = router