const mongoose = require('mongoose');
const validate = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema({
    username:{
        type: String,
        unique: true,
        require: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        validate: value => {
            if(!validate.isEmail(value)) {
                throw new Error('Invalid Email address');
            }
        }
    },
    password:{
        type: String,
        require: true,
        minLength: 7,
    },
    tokens:[{
        token:{
            type: String,
            require: true,
        }
    }],
    // passwordConfirm: {
    //     type: 'string',
    //     require: true,
    // }
});

UserSchema.pre('save', async function (next){
    //Hash pw before saving user
    const user = this 
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password , 8)
    }
    next()
})

UserSchema.methods.generateAuthToken = async function(){
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id},process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

UserSchema.statics.findByCredentials = async (email, password) =>{
    //Search for a user by email and pw
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Invalid login credential');
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if(!isPasswordMatch){
        throw new Error('Invalid login credential');
    }
    return user
}

const User = mongoose.model('User',UserSchema);

module.exports = User;