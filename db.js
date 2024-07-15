const mongoose = require('mongoose')
require('dotenv').config();

//mongo db connection
//const mongoUrl = 'mongodb://localhost:27017'
// const mongoUrl = 'mongodb+srv://umer:qwerty123@cluster0.06wc0xb.mongodb.net/'
const mongoUrl = process.env.MONGODB_URL;


//setup mongo connection
mongoose.connect(mongoUrl,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})

//mongoose maintain a default conection oject representing the mongoose connection
const db = mongoose.connection;

//define event listner for database
db.on('connected',()=>{
    console.log('connected to mongo server');
})
db.on('error',(err)=>{
    console.log('error occured');
})
db.on('disconnected',()=>{
    console.log('disconnected from mongo server');
})


//export the database connection
module.exports = db;