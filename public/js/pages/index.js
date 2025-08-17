import { createSignUpPage } from './signUp.js';
import { createLoginPage } from './login.js';
import { createHomePage } from './home.js';

document.addEventListener('DOMContentLoaded', () => {
  createLoginPage();
});
document.addEventListener('navigateToSignUP', () => {
  document.querySelector('.app').innerHTML = '';
  createSignUpPage();
});

document.addEventListener('navigateToLogin', () => {
  document.querySelector('.app').innerHTML = '';
  createLoginPage();
});
// document.addEventListener("navigateHome", () => {
//   document.querySelector(".app").innerHTML = "";
//   createHomePage();
// });