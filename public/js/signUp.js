import {
  createHtmlElement,
  customAppendChild,
  createFormField,
  createPasswordField,
} from '../utils/dom.js';

export const createSignUpPage = () => {
  const app = document.querySelector('.app');

  const mainContent = createHtmlElement('main', [
    'flex-grow',
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
    'bg-gray-50',
    'py-12',
    'px-4',
  ]);

  const headerDiv = createHtmlElement('div', ['text-center', 'mb-8']);
  const siteTitle = createHtmlElement(
    'h1',
    [
      'text-4xl',
      'font-light',
      'text-blue-400',
      'tracking-wide',
      'drop-shadow-sm',
      'font-sans',
    ],
    'FoodAI'
  );
  const pageTitle = createHtmlElement(
    'h2',
    ['text-xl', 'font-semibold', 'text-gray-800', 'mt-2'],
    'Create Your Account'
  );
  const subtitle = createHtmlElement(
    'p',
    ['text-gray-500', 'mt-1', 'text-sm'],
    'i will edit soon'
  );

  customAppendChild(headerDiv, siteTitle, pageTitle, subtitle);

  const cardDiv = createHtmlElement('div', [
    'bg-white',
    'rounded-2xl',
    'shadow-xl',
    'p-8',
    'max-w-md',
    'w-full',
    'mx-4',
  ]);

  const registerForm = createHtmlElement('form', ['space-y-6'], '');
  const {
    div: usernameDiv,
    input: inputUsername,
    error: usernameError,
  } = createFormField('Username', 'text', 'username', 'Enter your username');
  const {
    div: emailDiv,
    input: inputEmail,
    error: emailError,
  } = createFormField('Email', 'email', 'email', 'Enter your email');
  const {
    div: passDiv,
    input: inputPass,
    error: passwordError,
  } = createPasswordField('Password', 'password', 'Enter your password');
  const {
    div: confirmDiv,
    input: inputConfirm,
    error: confirmPasswordError,
  } = createPasswordField(
    'Confirm Password',
    'confirmPassword',
    'Re-enter your password'
  );

  const registerBtn = createHtmlElement(
    'button',
    [
      'w-full',
      'bg-blue-400',
      'text-white',
      'py-3',
      'rounded-lg',
      'font-semibold',
      'hover:bg-blue-600',
      'transition',
    ],
    'Sign Up'
  );
  const errorMsg = createHtmlElement(
    'p',
    ['text-red-600', 'text-sm', 'hidden', 'text-left'],
    'Please fill in all fields'
  );

  const loginLink = createHtmlElement(
    'p',
    ['text-center', 'text-sm', 'text-gray-600', 'mt-4'],
    'Already have an account? '
  );
  const loginAnchor = createHtmlElement(
    'a',
    ['text-blue-500', 'font-medium', 'hover:underline'],
    'Log in'
  );
  loginLink.appendChild(loginAnchor);

  customAppendChild(
    registerForm,
    usernameDiv,
    emailDiv,
    passDiv,
    confirmDiv,
    registerBtn,
    errorMsg,
    loginLink
  );

  customAppendChild(cardDiv, registerForm);
  customAppendChild(mainContent, headerDiv, cardDiv);
  customAppendChild(app, mainContent);
};

createSignUpPage();
