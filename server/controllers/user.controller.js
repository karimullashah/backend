exports.__esModule = true;

const User = require('../models/user.model');
const schema = require('../helpers/userValidators');


const JOI = require('joi');

// let signIn = async (req, res) => {
//     try {
//         // console.log("hi")
//         console.log(req.body)
//         const user = await User.findByCredentials(req.body.username, req.body.password)
//         console.log("hi")
//         const token = await user.generateAuthToken()
//         // res.send({user:user.getPublicProfile(),token})
//         res.send({ user, token })

//     } catch (e) {
//         res.status(400).send()
//     }
// }

let signUp = async (req, res) => {


    try {
        const result = JOI.validate(req.body, schema);
        // console.log(result.error);
        if (result.error) {
            const user = new User(req.body);

            await user.save()
            const token = await user.generateAuthToken()
            res.status(201).send({ user, token })
        }

        // sendMail(user.email, user.name)
    } catch (e) {
        res.status(400).send(e)
    }
}

let signOut = async (req, res) => {
    try {
        console.log(req.user.tokens)
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        console.log(req.user.tokens)
        await req.user.save()

        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
}

let signOutAll = async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
}

let getUsers = async (req, res) => {
    try {
        // console.log(req.user)
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
}

let getUser = async (req, res) => {
    try {
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
}

let updateUser = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age', 'phoneNumber']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        // console.log(req.user._id)
        // const user = await User.findById(req.user._id)

        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })

        await req.user.save()

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!req.user) {
            return res.status(404).send()
        }

        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
}

let deleteUser = async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)

        // if (!user) {
        //     return res.status(404).send()
        // } or

        await req.user.remove()

        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
}

module.exports = {
    // signIn,
    signOut,
    signUp,
    signOutAll,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}