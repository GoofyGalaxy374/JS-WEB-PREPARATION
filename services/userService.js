let userModel = require('../models/user')
let bcrypt = require('bcrypt')


const saltRounds = 9

// TODO all fields required by the exam

async function register(username, password, address)
{
    const user = await getUserByUsername(username)
    if(user)
    {
        throw new Error('This user is already taken!')    
    }
    else
    {
        const hashedPass = await bcrypt.hash(password, saltRounds)

        const user = new userModel({
            username, 
            hashedPass,
            address
        })

        await user.save()

        return user
    }
}

async function login(username, password)
{
    const user = await getUserByUsername(username)

    if (user == null)
    {
        throw new Error('This user doesn\'t exist!')
    }
    else
    {
        const hashedPasswordsMatch = await bcrypt.compare(password, user.hashedPass)

        if( hashedPasswordsMatch == false)
        {
            throw new Error('Wrong passwod!')
        }

        return user

    }
}

async function getUserByUsername(username)
{
    let user = await userModel.findOne({ username })

    return user 
}

module.exports = {
    login,
    register
}