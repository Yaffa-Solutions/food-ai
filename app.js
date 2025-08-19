const express = require('express');
const { join } = require('path'); 
const cookieParser = require('cookie-parser');
const authRouter = require('./src/routers/authRouter');
const foodRouter = require('./src/routers/foodRouter');


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use('/api/auth/', authRouter);
app.use('/api/foods/', foodRouter);


app.set('port', process.env.PORT || 5000);


module.exports = app;