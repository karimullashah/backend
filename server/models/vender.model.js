const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const venderSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true
    },
    phoneNumber: {
        type: Number,
        default: 0
    },
    gstInNumber: {
        type: String,
        default: 0
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
});


venderSchema.methods.toJSON = function () {
    const vender = this
    const venderObject = vender.toObject()

    delete venderObject.password
    delete venderObject.tokens

    return venderObject
}


// ! methods are accessible on instances
// ! here we are generating the token before saving the data into database
// ! using middleware provided by mongoose
venderSchema.methods.generateAuthToken = async function () {
    const vender = this

    const token = jwt.sign({ _id: vender._id.toString() }, 'thisismynewcourse')
    vender.tokens = vender.tokens.concat({ token })
    await vender.save()

    return token
}


// ! static methods are accessible on model
// ! while login to cross check the password of front end and back end 
// ! we are using findByCredentials method
venderSchema.statics.findByCredentials = async (username, password) => {
    const vender = await Vender.findOne({ username })

    if (!vender) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, vender.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return vender;
}


// ! Hash the plain text password before saving
venderSchema.pre('save', async function (next) {
    const vender = this
    
    if (vender.isModified('password')) {
        vender.password = await bcrypt.hash(vender.password, 8)
    }
    next();
})





const Vender = mongoose.model('Vender',venderSchema);
module.exports = Vender;