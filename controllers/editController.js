const mapper = require('../util/mappers')
const router = require('express').Router()

const {isUser, isGuest} = require('../middlewares/guards')
const { createPost, getPostById, updatePost } = require('../services/CRUD')


router.get('/edit/:id', isUser(), async (req, res) => {
    let id = req.params.id
    let targetPost = await getPostById(id)
    res.render('edit', {layout: false, data: req.session.user, postData: targetPost})
})

router.post('/edit/:id', isUser(), async (req, res) => {
    const title = req.body.title
    const tech = req.body.technique
    const image = req.body.image
    const certificate = req.body.certificate
    let id = req.params.id
    try
    {
        let result = await updatePost(id, title, tech, image, certificate)
        console.log(result)
        res.redirect(`/details/${id}`)
    }
    catch(err)
    {
        let errors = mapper(err)
        console.log(err)
    }
})
module.exports = router