const { getAllPosts } = require('../services/CRUD')

const router = require('express').Router()


router.get('/', async (req,res) => {
    let posts = await getAllPosts()
    res.render('home', {layout: false, data: req.session.user, posts: posts})
})


module.exports = router