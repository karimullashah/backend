exports.__esModule = true;
const Vender = require('../models/vender.model');

let signUp = async (req, res) => {


    try {
        // const result = JOI.validate(req.body, schema);
        // console.log(result.error);
        // if (result.error) {
            const vender = new Vender(req.body);

            await vender.save()
            const token = await vender.generateAuthToken()
            res.status(201).send({ vender, token })
        // }

        // sendMail(user.email, user.name)
    } catch (e) {
        res.status(400).send(e)
    }
}

module.exports = {
    signUp
}