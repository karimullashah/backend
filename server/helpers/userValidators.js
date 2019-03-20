const JOI = require('joi');

const joiSchema = JOI.object().keys({
    name : JOI.string().min(3).max(16).required(),
    username  : JOI.string().min(3).max(10).required(),
    email : JOI.string().email({ minDomainAtoms:2}).required(),
    password    : JOI.string(),
    phoneNumber : JOI.number().min(1000000000).max(9999999999)
})


module.exports = joiSchema;