import { createSignUpPage } from './signUp.js';
import { createLoginPage } from './login.js';
import { createHomePage } from './home.js';
import { createMyfood } from './myFood.js';

const app = document.querySelector('.app');

const renderRoute = () => {
  const hash = window.location.hash || '#home';
  app.innerHTML = '';
  switch (hash) {
    case '#signup':
      app.innerHTML = '';
      createSignUpPage(app);
      break;
    case '#home':
      app.innerHTML = '';
      createHomePage();
      break;
    case '#myfood':
      app.innerHTML = '';
      createMyfood();
      break;
    case '#login':
      app.innerHTML = '';
      createLoginPage();
    default:
      break;
  }
};

document.addEventListener('DOMContentLoaded', renderRoute);
window.addEventListener('hashchange', renderRoute);
