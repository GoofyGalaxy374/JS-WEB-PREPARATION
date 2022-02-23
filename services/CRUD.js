let postModel = require('../models/post')

async function createPost(title, technique, image, authCert, ownerID)
{
    let post = new postModel({
        title,
        technique, 
        image, 
        authCert,
        author: ownerID
    })
    await post.save()
    return post
}

async function getAllPosts()
{
    let posts = await postModel.find({})
    return posts
}

async function getPostById(id)
{
    let post = await postModel.findById(id).populate('author')
    return post
}

async function updatePost(id, title, technique, image, authCert)
{
    try
    {
        let newPost = await postModel.findOneAndUpdate(id, 
        {
            title,
            technique,
            image,
            authCert
        })
        return newPost
    }
    catch(err)
    {
        return err
    }
    
}
module.exports = 
{
    createPost,
    getAllPosts,
    getPostById,
    updatePost
}