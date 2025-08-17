const express = require('express');
const { join } = require('path'); 
const authRouter = require('./src/routers/auth');



const app = express();

app.set('port', process.env.PORT || 5000);
app.use(express.json());
app.use('/api/auth/', authRouter);


module.exports = app;