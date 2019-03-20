const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const adminSchema = new mongoose.Schema({

    
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
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
});


adminSchema.methods.toJSON = function () {
    const admin = this
    const adminObject = admin.toObject()

    delete adminObject.password
    delete adminObject.tokens

    return adminObject
}


// ! methods are accessible on instances
// ! here we are generating the token before saving the data into database
// ! using middleware provided by mongoose
adminSchema.methods.generateAuthToken = async function () {
    console.log("hi")
    const admin = this
    console.log(admin ,"auth")
    const token = jwt.sign({ _id: admin._id.toString() }, 'thisismynewcourse')
    admin.tokens = admin.tokens.concat({ token })
    await admin.save()

    return token
}


// ! static methods are accessible on model
// ! while login to cross check the password of front end and back end 
// ! we are using findByCredentials method
adminSchema.statics.findByCredentials = async (username, password) => {
    const admin = await Admin.findOne({ username })
    
    if (!admin) {
        throw new Error('Unable to login')
    }

    // const isMatch = await bcrypt.compare(password, admin.password)
    const isMatch = (password === admin.password)? true : false;

    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return admin;
}


// ! Hash the plain text password before saving
adminSchema.pre('save', async function (next) {
    const admin = this
    
    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8)
    }
    next();
})





const Admin = mongoose.model('Admin',adminSchema);
module.exports = Admin;