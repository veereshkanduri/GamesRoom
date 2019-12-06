const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/GamesRoom_mongodb', {
    useNewUrlParser: true
}); // connect to our database

// db.on('error', console.error.bind(console, 'connection error:'));
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))

module.exports = mongoose