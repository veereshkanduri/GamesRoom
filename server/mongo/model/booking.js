var mongoose = require('mongoose')
var Schema = mongoose.Schema

var BookingSchema = new Schema({
    guest_email: String,
    guest: {
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
    },
    listing: {
        listingName: String,
        description:String,
        gametype: String,
        address: {
            aptno: String,
            street: String,
            city: String,
            state: String,
            zip:String,
        },
        phonenumber: String,
        price: String,
        pic1: String,
        pic2: String,
        _id:String,
    },
    host_email:String,
    host:{
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
    },
    total_price:Number,
    date:String,
    time:{
        from:Number,
        to: Number,
    },
    time_to:Number,
    rating:Number,
    review:String,
})
module.exports = mongoose.model('Booking', BookingSchema)