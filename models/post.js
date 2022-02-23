const {Schema, model} = require('mongoose')
const { ObjectId } = require('mongodb');

const postSchema = new Schema({
    title: 
    { 
        type: String, 
        required: true,
    },
    technique: 
    { 
        type: String, 
        required: true 
    },
    image: {
        type: String, 
        required: true,
    },
    authCert:{
        type: String,
        required: true
    },
    author:{
        type: ObjectId,
        ref: 'user'
    },
    usersShared:{
        type: [ObjectId],
        ref: 'user',
    }
})

let post = model('post', postSchema)

module.exports = post