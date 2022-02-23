const express = require('express')
const {create: handlebars} = require('express-handlebars')
const session = require('express-session')
const userSession = require('../middlewares/userSession')
const databaseConfig = require('./databaseConfig')
const route  = require('./routesConfig')


const port = 3000
async function start()
{
    // TODO setup the view engine
    
    const app = express()
    
    await databaseConfig(app)
    
    app.engine('.hbs', handlebars({
        extname: 'hbs',
        runtimeOptions: {

            allowProtoPropertiesByDefault: true,

            allowProtoMethodsByDefault: true,

        },
    }).engine)
    
    app.set('view engine', '.hbs')

    app.use('/static', express.static('static'))
    
    app.use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie:
        {
            secure: 'auto'
        }
    }))
    
    app.use(express.urlencoded({
        extended: true
    }))
    
    app.use(userSession())

    route(app)
    

    app.listen(port, ()=> {
        console.log(`Server running on port ${port}`)
    })

}

module.exports = {
    start
}