const express = require('express')
const router = express.Router()

// const mongodb = require('../mongo/config')

const ListingModel = require('../mongo/model/listing')




router.route('/need_listings').post((req, res)=>{
    ListingModel.find({host_email:req.body.email},(err, data) => {
        if (err) {
            res.send(err)
        }
        res.json(data)
    })
})
router.route('/listings')

    //  Create a new Product
    .post((req, res) => {
        const listing = new ListingModel() // create a new instance of the Product model
        listing.host = req.body.host;
        listing.host_email = req.body.host.email
        listing.listingName = req.body.listingName
        listing.description = req.body.description
        if(req.body.gametype=="Create New")
            listing.gametype = req.body.gametypeDummy
        else
            listing.gametype = req.body.gametype
        listing.phonenumber = req.body.phonenumber
        listing.price = req.body.price
        listing.address.aptno = req.body.aptno
        listing.address.street = req.body.street
        listing.address.city = req.body.city
        listing.address.state = req.body.state
        listing.address.zip = req.body.zip
        listing.pic1 = "/img/no-image.png"
        listing.pic2 = "/img/no-image.png"
        if(req.body.mon_flag!==undefined)
        {
            listing.av_info.mon.flag = req.body.mon_flag
            listing.av_info.mon.from = req.body.mon_from
            listing.av_info.mon.to = req.body.mon_to
            listing.av_info.mon.av_time[0] = {from:req.body.mon_from, to:req.body.mon_to}
        }
        else
        {
            listing.av_info.mon.flag = false
        }
        if(req.body.tue_flag!==undefined){
            listing.av_info.tue.flag = req.body.tue_flag
            listing.av_info.tue.from = req.body.tue_from
            listing.av_info.tue.to = req.body.tue_to
            listing.av_info.tue.av_time[0] = {from:req.body.tue_from, to:req.body.tue_to}
        }
        else
            listing.av_info.tue.flag = false
        if(req.body.wed_flag!==undefined){
            listing.av_info.wed.flag = req.body.wed_flag
            listing.av_info.wed.from = req.body.wed_from
            listing.av_info.wed.to = req.body.wed_to
            listing.av_info.wed.av_time[0] = {from:req.body.wed_from, to:req.body.wed_to}
        }
        else 
            listing.av_info.wed.flag = false
        if(req.body.thu_flag!==undefined){
            listing.av_info.thu.flag = req.body.thu_flag
            listing.av_info.thu.from = req.body.thu_from
            listing.av_info.thu.to = req.body.thu_to
            listing.av_info.thu.av_time[0] = {from:req.body.thu_from, to:req.body.thu_to}            
        }
        else
            listing.av_info.thu.flag = false
        if(req.body.fri_flag!==undefined){
            listing.av_info.fri.flag = req.body.fri_flag
            listing.av_info.fri.from = req.body.fri_from
            listing.av_info.fri.to = req.body.fri_to
            listing.av_info.fri.av_time[0] = {from:req.body.fri_from, to:req.body.fri_to}            
        }
        else
            listing.av_info.fri.flag = false
        if(req.body.sat_flag!==undefined){    
            listing.av_info.sat.flag = req.body.sat_flag
            listing.av_info.sat.from = req.body.sat_from
            listing.av_info.sat.to = req.body.sat_to
            listing.av_info.sat.av_time[0] = {from:req.body.sat_from, to:req.body.sat_to}
        }
        else
            listing.av_info.sat.flag = false
        if(req.body.sun_flag!==undefined){
            listing.av_info.sun.flag = req.body.sun_flag
            listing.av_info.sun.from = req.body.sun_from
            listing.av_info.sun.to = req.body.sun_to
            listing.av_info.sun.av_time[0] = {from:req.body.sun_from, to:req.body.sun_to}            
        }
        else
            listing.av_info.sun.flag = false

        // save the bear and check for errors
        listing.save(listing, (err, listing) => {
            if (err) {
                res.send(err)
            }

            res.send(listing)
        })
    })
    // Get All products
    .get((req, res) => {
        ListingModel.find((err, data) => {
            if (err) {
                res.send(err)
            }
            res.json(data)
        })
    })

router.route('/listings_time_clear/')
    .get(function (req, res) {
        ListingModel.find({},
            function (err, listings) {
                if (err) {
                    res.send(err)
                }
                var date = new Date()
                var weekday = date.getDay()
                console.log("previous day available time clear")
                for(var i=0;i<listings.length;i++){
                    switch(weekday){
                        case 0:{
                            listings[i].av_info.sat.av_time=[];
                            listings[i].av_info.sat.av_time[0]={
                                from:listings[i].av_info.sat.from,
                                to:listings[i].av_info.sat.to
                            }
                            listings[i].save()
                        }
                        case 1:{
                            listings[i].av_info.sun.av_time=[];
                            listings[i].av_info.sun.av_time[0]={
                                from:listings[i].av_info.sun.from,
                                to:listings[i].av_info.sun.to
                            }
                            listings[i].save()
                        }
                        case 2:{
                            listings[i].av_info.mon.av_time=[];
                            listings[i].av_info.mon.av_time[0]={
                                from:listings[i].av_info.mon.from,
                                to:listings[i].av_info.mon.to
                            }
                            listings[i].save()
                        }
                        case 3:{
                            listings[i].av_info.tue.av_time=[];
                            listings[i].av_info.tue.av_time[0]={
                                from:listings[i].av_info.tue.from,
                                to:listings[i].av_info.tue.to
                            }
                            listings[i].save()
                        }
                        case 4:{
                            listings[i].av_info.wed.av_time=[];
                            listings[i].av_info.wed.av_time[0]={
                                from:listings[i].av_info.wed.from,
                                to:listings[i].av_info.wed.to
                            }
                            listings[i].save()
                        }
                        case 5:{
                            listings[i].av_info.thu.av_time=[];
                            listings[i].av_info.thu.av_time[0]={
                                from:listings[i].av_info.thu.from,
                                to:listings[i].av_info.thu.to
                            }
                            listings[i].save()
                        }
                        case 6:{
                            listings[i].av_info.fri.av_time=[];
                            listings[i].av_info.fri.av_time[0]={
                                from:listings[i].av_info.fri.from,
                                to:listings[i].av_info.fri.to
                            }
                            listings[i].save()
                        }
                    }
                }
            })
    })







router.route('/listings/:listing_id')

    // get the product with that id (accessed at GET http://localhost:8080/api/listings/:listing_id)
    .get(function (req, res) {
        ListingModel.findById(req.params.listing_id, function (err, data) {
            if (err) {
                res.send(err)
            }
            else
                res.json(data)
        })
    })

    // update the product with this id (accessed at PUT http://localhost:8080/api/listing/:listing_id)
    .put(function (req, res) {
        // use our product model to find the product we want
        ListingModel.findById(req.params.listing_id, function (err, listing) {
            if (err) {
                res.send(err)
            }

            listing.listingName = req.body.listingName
            listing.description = req.body.description
            if(req.body.gametype=="Create New")
                listing.gametype = req.body.gametypeDummy
            else
                listing.gametype = req.body.gametype
            listing.phonenumber = req.body.phonenumber
            listing.price = req.body.price
            listing.address = req.body.address
            // listing.av_info = req.body.av_info
            if(req.body.av_info.mon.flag)
            {
                listing.av_info.mon.flag = req.body.av_info.mon.flag
                listing.av_info.mon.from = req.body.av_info.mon.from
                listing.av_info.mon.to = req.body.av_info.mon.to
                listing.av_info.mon.av_time[0] = {from:req.body.av_info.mon.from, to:req.body.av_info.mon.to}
            }
            else
            {
                listing.av_info.mon.flag = false
            }
            if(req.body.av_info.tue.flag){
                listing.av_info.tue.flag = req.body.av_info.tue.flag
                listing.av_info.tue.from = req.body.av_info.tue.from
                listing.av_info.tue.to = req.body.av_info.tue.to
                listing.av_info.tue.av_time[0] = {from:req.body.av_info.tue.from, to:req.body.av_info.tue.to}
            }
            else
                listing.av_info.tue.flag = false
            if(req.body.av_info.wed.flag){
                listing.av_info.wed.flag = req.body.av_info.wed.flag
                listing.av_info.wed.from = req.body.av_info.wed.from
                listing.av_info.wed.to = req.body.av_info.wed.to
                listing.av_info.wed.av_time[0] = {from:req.body.av_info.wed.from, to:req.body.av_info.wed.to}
            }
            else 
                listing.av_info.wed.flag = false
            if(req.body.av_info.thu.flag){
                listing.av_info.thu.flag = req.body.av_info.thu.flag
                listing.av_info.thu.from = req.body.av_info.thu.from
                listing.av_info.thu.to = req.body.av_info.thu.to
                listing.av_info.thu.av_time[0] = {from:req.body.av_info.thu.from, to:req.body.av_info.thu.to}            
            }
            else
                listing.av_info.thu.flag = false
            if(req.body.av_info.fri.flag){
                listing.av_info.fri.flag = req.body.av_info.fri.flag
                listing.av_info.fri.from = req.body.av_info.fri.from
                listing.av_info.fri.to = req.body.av_info.fri.to
                listing.av_info.fri.av_time[0] = {from:req.body.av_info.fri.from, to:req.body.av_info.fri.to}            
            }
            else
                listing.av_info.fri.flag = false
            if(req.body.av_info.sat.flag){    
                listing.av_info.sat.flag = req.body.av_info.sat.flag
                listing.av_info.sat.from = req.body.av_info.sat.from
                listing.av_info.sat.to = req.body.av_info.sat.to
                listing.av_info.sat.av_time[0] = {from:req.body.av_info.sat.from, to:req.body.av_info.sat.to}
            }
            else
                listing.av_info.sat.flag = false
            if(req.body.av_info.sun.flag){
                listing.av_info.sun.flag = req.body.av_info.sun.flag
                listing.av_info.sun.from = req.body.av_info.sun.from
                listing.av_info.sun.to = req.body.av_info.sun.to
                listing.av_info.sun.av_time[0] = {from:req.body.av_info.sun.from, to:req.body.av_info.sun.to}            
            }
            else
                listing.av_info.sun.flag = false

           

            // save the bear
            listing.save(function (err, data) {
                if (err) {
                    res.send(err)
                }
                res.send(data)
            })

        })
    })

    // delete the product with this id (accessed at DELETE http://localhost:8080/api/listings/:listing_id)
    .delete(function (req, res) {
        ListingModel.remove({
            _id: req.params.listing_id
        },
            function (err, listing) {
                if (err) {
                    res.send(err)
                }
                res.send(listing)
            })
    })

module.exports = router