const { getPostById } = require('../services/CRUD')
const mapper = require('../util/mappers')
const router = require('express').Router()

router.get('/details/:id', async (req, res) => {
    let id = req.params.id
    let targetPost = await getPostById(id)
    res.render('details', {layout: false, data: req.session.user, postData: targetPost})
})

module.exports = router