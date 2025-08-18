const express = require('express');
const { join } = require('path'); 
const authRoutes = require('./src/routers/authRouter.js');
const foodRouter = require('./src/routers/foodRouter.js');


const app = express();
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api/auth', authRoutes);
app.use('/api/foods/', foodRouter);


app.set('port', process.env.PORT || 5000);


module.exports = app;