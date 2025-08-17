const express = require('express');
const { join } = require('path'); 


const app = express();

app.set('port', process.env.PORT || 5000);


module.exports = app;