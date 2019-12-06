var mongoose = require('mongoose')
var Schema = mongoose.Schema
var User = require("./user")
var ListingSchema = new Schema({
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
    rating: Number,
    review: Array,
    host_email:String,
    host: {
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
        createdOn: String,
    },
    av_info:{
        mon:{
            flag:Boolean,
            from:Number,
            to:Number,
            av_time:[
                {
                    from:Number,
                    to:Number,
                }
            ]
        },
        tue:{
            flag:Boolean,
            from:Number,
            to:Number,
            av_time:[
                {
                    from:Number,
                    to:Number,
                }
            ]
        },
        wed:{
            flag:Boolean,
            from:Number,
            to:Number,
            av_time:[
                {
                    from:Number,
                    to:Number,
                }
            ]
        },
        thu: {
            flag:Boolean,
            from:Number,
            to:Number,
            av_time:[
                {
                    from:Number,
                    to:Number,
                }
            ]
        },
        fri: {
            flag:Boolean,
            from:Number,
            to:Number,
            av_time:[
                {
                    from:Number,
                    to:Number,
                }
            ]
        },
        sat: {
            flag:Boolean,
            from:Number,
            to:Number,
            av_time:[
                {
                    from:Number,
                    to:Number,
                }
            ]
        },
        sun: {
            flag:Boolean,
            from:Number,
            to:Number,
            av_time:[
                {
                    from:Number,
                    to:Number,
                }
            ]
        }
    },
})

module.exports = mongoose.model('Listing', ListingSchema)