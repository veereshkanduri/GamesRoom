const express = require('express')
const router = express.Router()

const UserModel = require('../mongo/model/user')

router.route('/login').post((req, res) => {
    UserModel.find({
        email: req.body.email,
        password: req.body.password,
        usertype:req.body.usertype,
    }, function (err, user) {
        if (err) {
            res.send(err)
        }

        if (user.length === 0) {
            res.send(err)
        } else {
            res.json(user)
        }

    })
})
module.exports = router