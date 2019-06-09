// all modules imported
const express = require('express');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const cors = require("cors");
const parser = require('body-parser');
const axios = require('axios');
const relationship = require('mongoose-relationship');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())

app.use(cors());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*');
	if(req.method ==='OPTIONS'){
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
})
 
app.use(function(req,res,next){
    res.locals.userValue = null;
    next();
})


// database connection
mongoose.connect('mongodb://localhost:27017/tring', {useNewUrlParser: true});

mongoose.set('useFindAndModify', false);

// setting ejs as view engine, used only for testing purposes.
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

// for css and js files
app.use('/static',express.static(__dirname + '/public'));


//routes begin from here

var route = require('./routes/user.routes.js');
app.use('/routes',route)




app.listen(PORT,function(){
    console.log('server running on port 5000');
})