const {Schema, model} = require('mongoose')
const { ObjectId } = require('mongodb');

const userSchema = new Schema({
    username: 
    { 
        type: String, 
        required: true,
    },
    hashedPass: 
    { 
        type: String, 
        required: true 
    },
    address: {
        type: String, 
        required: true,
    },
    publications:{
        type: [ObjectId],
        ref: 'posts'
    }
})

let user = model('user', userSchema)

module.exports = user