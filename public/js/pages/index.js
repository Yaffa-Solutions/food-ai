import { createSignUpPage } from './signUp.js';
import { createLoginPage } from './login.js';
import { createHomePage } from './home.js';

const app = document.querySelector('.app');
 
const loadPage = () => {
  const token = sessionStorage.getItem('token');
  const hash = window.location.hash;

  app.innerHTML = '';

  if (hash === '#signup') {
    createSignUpPage();
  } else if (hash === '#home') {
    if (token) {
      const username = sessionStorage.getItem('username');
      createHomePage(username);
    } else {
      window.location.hash = '#login';
      createLoginPage();
    }
  } else {
    window.location.hash = '#login';
    createLoginPage();
  }
};

window.addEventListener('hashchange', loadPage);
document.addEventListener('DOMContentLoaded', loadPage);

document.addEventListener('navigateToSignUP', () => {
  window.location.hash = '#signup';
});

document.addEventListener('navigateToLogin', () => {
  window.location.hash = '#login';
});
document.addEventListener('navigateHome', (e) => {
  sessionStorage.setItem('username', e.detail.username);
  window.location.hash = '#home';
});
