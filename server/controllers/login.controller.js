exports.__esModule = true;

const User = require('../models/user.model');
const Vender = require('../models/vender.model');
const Admin = require('../models/admin.model');

let signIn = async (req, res) => {
    try {

        console.log(req.body)
        const user = await User.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()

        res.send({ user, token, flag: "user" })

    } catch (u) {

        try {

            const vender = await Vender.findByCredentials(req.body.username, req.body.password)
            const token = await vender.generateAuthToken()

            res.send({ vender, token, flag: "vender" })

        } catch (v) {

            try {
                
                const admin = await Admin.findByCredentials(req.body.username, req.body.password)
                const token = await admin.generateAuthToken()

                res.send({ admin, token, flag: "admin" })


            } catch (a) {

                res.status(400).send()

            }

        }


    }
}


module.exports = {
    signIn
};