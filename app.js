/**
 * Require all modules and dependencies
 */
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const User = require('./api/routes/users.routes');


/**
 * Setting Morgan for logs
 */
app.use(morgan('dev'));

/**
 * Setting body-parser for logs
 */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/**
 * Connecting mongodb with mongoose
 */
mongoose.connect(`mongodb://akshay:akshay123@ds157735.mlab.com:57735/users-app-db`,{
    useNewUrlParser: true 
});
if(mongoose.connect) {
    console.log('mLab Connected');
}
else {
    console.log('Some error occurred while connecting to mLab');
}
mongoose.Promise = global.Promise;

/**
 * Setting up CORS
 */
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', '*'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

/**
 * Route for User API
 */
app.use('/user', User);

module.exports = app;