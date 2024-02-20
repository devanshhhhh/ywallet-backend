const mongoose=require("mongoose");
const bcrypt=require('bcrypt');
const { connectionString }=require('../config/appConfig.js');


mongoose.connect(connectionString);

const UserSchema= new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    password_hash: { 
        type: String, 
        required: true 
    }
});

UserSchema.methods.createHash = async function(plainTextPassword) {
    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainTextPassword, salt);
};
  
UserSchema.methods.validatePassword =async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password_hash);
};

const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', AccountSchema);
const User=mongoose.model('User', UserSchema);

module.exports={
    User,
    Account
};