import {model, Schema} from 'mongoose';
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isActivated: {typed: Boolean, default: false},

});

//hash password before saving (only on password change)
UserSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')){
            next()
        }else {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt)
        }
    }catch (error) {
        next(error)
    }
})

//authentication method added to schema for password
UserSchema.methods.authenticate = async function (passwordInput) {
    return await bcrypt.compare(passwordInput, this.password)
}



export const User = model('User', UserSchema)