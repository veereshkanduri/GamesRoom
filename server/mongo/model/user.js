var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    fullName: String,
    email: String,
    password: String,
    address: {
        aptno: String,
        street: String,
        city: String,
        state: String,
        zip:String,
    },
    phonenumber: String,
    usertype: String,
    createdOn: String
})
module.exports = mongoose.model('User', UserSchema)