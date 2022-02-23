const authController = require("../controllers/authController")
const homeController = require("../controllers/homeController")
const createController = require("../controllers/createController")
const detailsController = require("../controllers/detailsController")
const editController = require("../controllers/editController")

module.exports = (app) => {
    app.use(authController)
    app.use(homeController)
    app.use(createController)
    app.use(detailsController)
    app.use(editController)
    app.get('*', (req,res) => {
        res.render('404', {layout: false, data: req.session.user})
    })
}