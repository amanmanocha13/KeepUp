const mongoose = require('mongoose');
const env = require('./environment');
//connecting to mongodb with db name as KeepUp
let connectionString = `mongodb+srv://keepup:${env.db_password}@cluster0-w2xfu.mongodb.net/${env.db_name}?retryWrites=true&w=majority`;
mongoose.connect(`mongodb://localhost/K${env.db_name}`);

const db = mongoose.connection;

db.on('error',console.error.bind("Error in connecting to database"));

db.once('open',function(){
    console.log("Connected to database : monogdb");
});

module.exports = db;
