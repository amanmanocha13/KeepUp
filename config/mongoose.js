const mongoose = require('mongoose');
const env = require('./environment');
//connecting to mongodb with db name as KeepUp
mongoose.connect(`mongodb://localhost/K${env.db_name}`);

const db = mongoose.connection;

db.on('error',console.error.bind("Error in connecting to database"));

db.once('open',function(){
    console.log("Connected to database : monogdb");
});

module.exports = db;
