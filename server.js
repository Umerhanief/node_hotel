const express = require('express')
const app = express();
const db = require('./db');



const bodyParser = require('body-parser');    //data lakke de raha hai
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.send('welcome to our hotel')
})







//imports router
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

//USE THE ROUTE
app.use('/person',personRoutes);
app.use('/menu',menuRoutes);



app.listen(3000,()=>{
  console.log("Server is running on port 3000")

})


