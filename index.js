const app = require('./app');

app.listen(app.get('port'), () => {
  console.log(`Server going live at http://localhost:${app.get('port')}`);
});
