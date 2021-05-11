const { Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username : {
        type : String,
        unique : true
    },
    email : {
        type : String,
        unique : true
    },
    password : {
        type : String,
        required :  true
    },
    roles : [{
        ref : "Role",
        type : Schema.Types.ObjectId
    }]
}, {
    timestamps : true,
    versionKey : false
})

userSchema.statics.encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

userSchema.statics.comparePassword = (password,passwordDb,) => {
    return bcrypt.compareSync(password,passwordDb)
}

module.exports = model('User', userSchema)