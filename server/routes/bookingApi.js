const express = require('express')
const router = express.Router()

const nodemailer = require('nodemailer');



// const mongodb = require('../mongo/config')

const BookingModel = require('../mongo/model/booking')
const ListingModel = require('../mongo/model/listing')


/*
  API for Listing Schema
  Listing Create and Read all Policies API 's

*/

router.route('/need_previous_bookings').post((req, res)=>{
    var n = new Date(); 
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();
    if(m<10)
      m = "0"+m;
    var date = y+"-"+m+"-"+d;
    var hour = n.getHours();
    BookingModel.find({guest_email:req.body.email,  date: { $gte: date }},(err, data) => {
        if (err) {
            res.send(err)
        }
        res.json(data)
    }).sort({date:-1})
})
router.route('/need_current_bookings').post((req, res)=>{
    var n = new Date(); 
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();
    if(m<10)
      m = "0"+m;
    var date = y+"-"+m+"-"+d;
    var hour = n.getHours();
    BookingModel.find({guest_email:req.body.email,  date: { $lt: date }},(err, data) => {
        if (err) {
            res.send(err)
        }
        res.json(data)
    })
})
router.route('/need_host_bookings').post((req, res)=>{
    BookingModel.find({host_email:req.body.email},(err, data) => {
        if (err) {
            res.send(err)
        }
        res.json(data)
    }).sort({date:-1})
})
router.route('/bookings')

    //  Create a new Product
    .post((req, res) => {
        const booking = new BookingModel() // create a new instance of the Product model
        booking.host = req.body.host
        booking.host_email = req.body.host.email
        booking.guest = req.body.guest
        booking.guest_email = req.body.guest.email
        booking.total_price = req.body.total_price
        booking.date = req.body.date
        booking.time = { from: req.body.time_from, to: req.body.time_to}
        booking.time_to = req.body.time_to
        booking.listing = {
            listingName:req.body.listingName,
            description:req.body.description,
            gametype:req.body.gametype,
            address:req.body.address,
            phonenumber:req.body.phonenumber,
            price:req.body.price,
            pic1:req.body.pic1,
            pic2:req.body.pic2,
            _id:req.body._id,
        }
        ListingModel.findById(req.body._id, function (err, listing) {
            if (err) {
                res.send(err)
            }
            else
                {
                    switch(req.body.weekday){
                        case 0:
                            {
                                if(req.body.time_from==listing.av_info.sun.av_time[req.body.is_av].from){
                                    if(req.body.time_to == listing.av_info.sun.av_time[req.body.is_av].to){
                                        listing.av_info.sun.av_time.splice(req.body.is_av, 1)
                                    }
                                    else
                                    {
                                        listing.av_info.sun.av_time[req.body.is_av].from = req.body.time_to;       
                                    }
                                }
                                else{
                                    if(req.body.time_to == listing.av_info.sun.av_time[req.body.is_av].to){
                                        listing.av_info.sun.av_time[req.body.is_av].to = req.body.time_from;
                                    }
                                    else{
                                        listing.av_info.sun.av_time.splice(req.body.is_av+1, 0, {
                                            from:req.body.time_to,
                                            to: listing.av_info.sun.av_time[req.body.is_av].to
                                        })
                                        listing.av_info.sun.av_time[req.body.is_av].to = req.body.time_from;
                                    }
                                }
                                break;
                            }
                        case 1:
                            {
                                if(req.body.time_from==listing.av_info.mon.av_time[req.body.is_av].from){
                                    if(req.body.time_to == listing.av_info.mon.av_time[req.body.is_av].to){
                                        listing.av_info.mon.av_time.splice(req.body.is_av, 1)
                                    }
                                    else
                                    {
                                        listing.av_info.mon.av_time[req.body.is_av].from = req.body.time_to;       
                                    }
                                }
                                else{
                                    if(req.body.time_to == listing.av_info.mon.av_time[req.body.is_av].to){
                                        listing.av_info.mon.av_time[req.body.is_av].to = req.body.time_from;
                                    }
                                    else{
                                        listing.av_info.mon.av_time.splice(req.body.is_av+1, 0, {
                                            from:req.body.time_to,
                                            to: listing.av_info.mon.av_time[req.body.is_av].to
                                        })
                                        listing.av_info.mon.av_time[req.body.is_av].to = req.body.time_from;
                                    }
                                }
                                break;
                            }
                        case 2:
                            {
                                if(req.body.time_from==listing.av_info.tue.av_time[req.body.is_av].from){
                                    if(req.body.time_to == listing.av_info.tue.av_time[req.body.is_av].to){
                                        listing.av_info.tue.av_time.splice(req.body.is_av, 1)
                                    }
                                    else
                                    {
                                        listing.av_info.tue.av_time[req.body.is_av].from = req.body.time_to;       
                                    }
                                }
                                else{
                                    if(req.body.time_to == listing.av_info.tue.av_time[req.body.is_av].to){
                                        listing.av_info.tue.av_time[req.body.is_av].to = req.body.time_from;
                                    }
                                    else{
                                        listing.av_info.tue.av_time.splice(req.body.is_av+1, 0, {
                                            from:req.body.time_to,
                                            to: listing.av_info.tue.av_time[req.body.is_av].to
                                        }) 
                                        listing.av_info.tue.av_time[req.body.is_av].to = req.body.time_from;
                                    }
                                }
                                break;
                            }
                        case 3:
                            {
                                if(req.body.time_from==listing.av_info.wed.av_time[req.body.is_av].from){
                                    if(req.body.time_to == listing.av_info.wed.av_time[req.body.is_av].to){
                                        listing.av_info.wed.av_time.splice(req.body.is_av, 1)
                                    }
                                    else
                                    {
                                        listing.av_info.wed.av_time[req.body.is_av].from = req.body.time_to;       
                                    }
                                }
                                else{
                                    if(req.body.time_to == listing.av_info.wed.av_time[req.body.is_av].to){
                                        listing.av_info.wed.av_time[req.body.is_av].to = req.body.time_from;
                                    }
                                    else{
                                        listing.av_info.wed.av_time.splice(req.body.is_av+1, 0, {
                                            from:req.body.time_to,
                                            to: listing.av_info.wed.av_time[req.body.is_av].to
                                        })
                                        listing.av_info.wed.av_time[req.body.is_av].to = req.body.time_from;
                                    }
                                }
                                break;
                            }
                        case 4:
                            {
                                if(req.body.time_from==listing.av_info.thu.av_time[req.body.is_av].from){
                                    if(req.body.time_to == listing.av_info.thu.av_time[req.body.is_av].to){
                                        listing.av_info.thu.av_time.splice(req.body.is_av, 1)
                                    }
                                    else
                                    {
                                        listing.av_info.thu.av_time[req.body.is_av].from = req.body.time_to;       
                                    }
                                }
                                else{
                                    if(req.body.time_to == listing.av_info.thu.av_time[req.body.is_av].to){
                                        listing.av_info.thu.av_time[req.body.is_av].to = req.body.time_from;
                                    }
                                    else{
                                        listing.av_info.thu.av_time.splice(req.body.is_av+1, 0, {
                                            from:req.body.time_to,
                                            to: listing.av_info.thu.av_time[req.body.is_av].to
                                        })
                                        listing.av_info.thu.av_time[req.body.is_av].to = req.body.time_from;
                                    }
                                }
                                break;
                            }
                        case 5:
                            {
                                if(req.body.time_from==listing.av_info.fri.av_time[req.body.is_av].from){
                                    if(req.body.time_to == listing.av_info.fri.av_time[req.body.is_av].to){
                                        listing.av_info.fri.av_time.splice(req.body.is_av, 1)
                                    }
                                    else
                                    {
                                        listing.av_info.fri.av_time[req.body.is_av].from = req.body.time_to;       
                                    }
                                }
                                else{
                                    if(req.body.time_to == listing.av_info.fri.av_time[req.body.is_av].to){
                                        listing.av_info.fri.av_time[req.body.is_av].to = req.body.time_from;
                                    }
                                    else{
                                        listing.av_info.fri.av_time.splice(req.body.is_av+1, 0, {
                                            from:req.body.time_to,
                                            to: listing.av_info.fri.av_time[req.body.is_av].to
                                        })
                                        listing.av_info.fri.av_time[req.body.is_av].to = req.body.time_from;
                                    }
                                }
                                break;
                            }
                        case 6:
                            {
                                if(req.body.time_from==listing.av_info.sat.av_time[req.body.is_av].from){
                                    if(req.body.time_to == listing.av_info.sat.av_time[req.body.is_av].to){
                                        listing.av_info.sat.av_time.splice(req.body.is_av, 1)
                                    }
                                    else
                                    {
                                        listing.av_info.sat.av_time[req.body.is_av].from = req.body.time_to;       
                                    }
                                }
                                else{
                                    if(req.body.time_to == listing.av_info.sat.av_time[req.body.is_av].to){
                                        listing.av_info.sat.av_time[req.body.is_av].to = req.body.time_from;
                                    }
                                    else{
                                        listing.av_info.sat.av_time.splice(req.body.is_av+1, 0, {
                                            from:req.body.time_to,
                                            to: listing.av_info.sat.av_time[req.body.is_av].to
                                        })
                                        listing.av_info.sat.av_time[req.body.is_av].to = req.body.time_from;
                                    }
                                }
                                break;
                            }
                    }
                    listing.save();
                }
        })
        // save the bear and check for errors
        booking.save(booking, (err, booking) => {
            if (err) {
                res.send(err)
            }

            res.send(booking)
        })
        var text = "Booking Confirmed Successfully!\n"
        text += "\nListing Name: "+req.body.listingName
        text += "\nGametype: "+ req.body.gametype
        text += "\nAmount: $"+ req.body.total_price
        text += "\nDate and time: "+req.body.date+'    ' + req.body.time_from +'~'+req.body.time_to
        text += "\nAddress: "+req.body.address.aptno+'.'+req.body.address.street+'.'+req.body.address.city+'.'+req.body.address.state
        text += "\nPhone Number:"+ req.body.phonenumber
        text_guest = text+"\nHost Name: "+req.body.host.fullName
        text_guest  += "\nHost Phone Number:"+ req.body.host.phonenumber
        text_host = text+"\nGuest Name: "+req.body.guest.fullName
        text_host  += "\nGuest Phone Number:"+ req.body.guest.phonenumber
        console.log(req.body.guest.email);
        // const send = require('gmail-send')({
        //     user: 'projectgamesroom@gmail.com',
        //     pass: 'Mgb.cbs@118',
        //     to:   'shineiron0708@gmail.com',
        //     subject: 'Booking Confirmed via GamesRoom Website',
        //   });

        //   send({
        //     text:    text,  
        //   }, (error, result, fullResult) => {
        //     if (error) console.error(error);
        //     console.log(result);
        //   })
        var transporter = nodemailer.createTransport(
            {
            service: 'yandex',
            auth: {
              user: 'projectgamesroom@yandex.com',
              pass: 'Mgb.cbs@118'
            },
          }
          );
          
        var mailOptions = {
            from: 'projectgamesroom@yandex.com',
            to: req.body.guest.email,
            subject: 'Booking Confirmed via GamesRoom Website',
            text: text_guest
        };
        var mailOptions1 = {
            from: 'projectgamesroom@yandex.com',
            to: req.body.host.email,
            subject: 'New reservation via GamesRoom Website',
            text: text_host
        };
        transporter.sendMail(mailOptions1, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        })
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    })
    // Get All bookings
    .get((req, res) => {
        BookingModel.find((err, data) => {
            if (err) {
                res.send(err)
            }
            res.json(data)
        })
    })


/*  BookingModel Update and Read by Id and delete products API's */
// on routes that end in /booking/:booking_id
// ----------------------------------------------------
router.route('/bookings/:booking_id')

    // get the product with that id (accessed at GET http://localhost:8080/api/bookings/:booking_id)
    .get(function (req, res) {
        BookingModel.findById(req.params.booking_id, function (err, data) {
            if (err) {
                res.send(err)
            }
            else
                res.json(data)
        })
    })

    // update the product with this id (accessed at PUT http://localhost:8080/api/booking/:booking_id)
    .put(function (req, res) {
        // use our product model to find the product we want
        BookingModel.findById(req.params.booking_id, function (err, booking) {
            if (err) {
                res.send(err)
            }

            booking.review = req.body.review
            booking.rating = req.body.rating
            ListingModel.findById(booking.listing._id, function (err, listing) {
                if (err) {
                    res.send(err)
                }
                else
                {
                    listing.review.push(req.body.review);
                    if(listing.rating)
                    {
                        listing.rating = ((listing.rating*listing.review.length)+req.body.rating)/(listing.review.length+1)
                        listing.rating = Math.round(listing.rating)
                    }
                    else
                    listing.rating = req.body.rating
                    listing.save()
                }
            })
            // save the bear
            booking.save(function (err, data) {
                if (err) {
                    res.send(err)
                }
                res.send(data)
            })

        })
    })

    // delete the product with this id (accessed at DELETE http://localhost:8080/api/bookings/:listing_id)
    .delete(function (req, res) {
        BookingModel.remove({
            _id: req.params.booking_id
        },
            function (err, booking) {
                if (err) {
                    res.send(err)
                }
                res.send(booking)
            })
    })

module.exports = router