const mongoose = require('mongoose');

const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Please provide name']


    }
    ,
    phone:
    {
        type:String,
    }
    ,
    email: {
        type: String,
        required: [true, 'Please provide email'],
        // unique: true
    },
    password: {
        type: String,
        required: [true, 'Must be a password'],
        // minLength: 8,
        // select: false
    },
    image: {
        type: String
    },
    price: {
        type: Number
    },
    gender: {
        type: String,
        // required: [true, 'Please provide a gender'],
    },
    desc: {
        type: String,
        // required: [true, 'must be description']
    },
    country:{
        type:String
    },
    age:{
        type:String
    },
    role:{
        type: String,
        enum:{
            values:['teacher', 'student'],
            message: 'The role must be student or teacher'
        },
        default:'student'


        },
    deletedAt: {
        type: Date,
        default: null
        }
        
    
    });
userSchema.index({ email: 1, role: 1 }, { unique: true });


userSchema.pre('save', async function(next){
    
    if(!this.isModified('password'))
    return next()
const salt = await bcrypt.genSalt(12)
this.password = await bcrypt.hash(this.password, salt)
next()
})

  
userSchema.methods.checkPassword = async function(password,hashedPassword){
    const checkPasword = await bcrypt.compare(password, hashedPassword)
    return checkPasword
}

const user = mongoose.model('users', userSchema)

module.exports = user



