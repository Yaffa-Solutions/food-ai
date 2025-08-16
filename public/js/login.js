import { createHtmlElement, customAppendChild } from '../utils/dom.js';

export const createLoginPage = () => {
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
    'Login to Your Account'
  );

  customAppendChild(headerDiv, siteTitle, pageTitle);

  const cardDiv = createHtmlElement('div', [
    'bg-white',
    'rounded-2xl',
    'shadow-xl',
    'p-8',
    'max-w-md',
    'w-full',
    'mx-4',
  ]);

  const loginForm = createHtmlElement('form', ['space-y-6'], '');
  const userDiv = createHtmlElement('div');
  const labelUser = createHtmlElement(
    'label',
    ['block', 'text-gray-700', 'font-medium', 'mb-2'],
    'Email or Username'
  );
  const inputUser = createHtmlElement('input', [
    'w-full',
    'px-4',
    'py-2.5',
    'border',
    'border-gray-300',
    'rounded-lg',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-blue-500',
    'transition',
  ]);
  inputUser.type = 'text';
  inputUser.name = 'user';
  inputUser.placeholder = 'Enter your email or username';

  const passDiv = createHtmlElement('div');
  const labelPass = createHtmlElement(
    'label',
    ['block', 'text-gray-700', 'font-medium', 'mb-2'],
    'Password'
  );
  const inputPass = createHtmlElement('input', [
    'w-full',
    'px-4',
    'py-2.5',
    'border',
    'border-gray-300',
    'rounded-lg',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-blue-500',
    'transition',
  ]);
  inputPass.type = 'password';
  inputPass.name = 'password';
  inputPass.placeholder = 'Enter your password';

  const loginBtn = createHtmlElement(
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
    'Login'
  );
  const errorMsg = createHtmlElement(
    'p',
    ['text-red-600', 'text-sm', 'hidden', 'text-left'],
    'Please fill in all fields'
  );
  const signupLink = createHtmlElement(
    'p',
    ['text-center', 'text-sm', 'text-gray-600', 'mt-4'],
    "Don't have an account? "
  );
  const signupAnchor = createHtmlElement(
    'a',
    ['text-blue-500', 'font-medium', 'hover:underline'],
    'Sign Up'
  );

  customAppendChild(signupLink, signupAnchor);

  customAppendChild(userDiv, labelUser, inputUser);
  customAppendChild(passDiv, labelPass, inputPass);

  customAppendChild(
    loginForm,
    userDiv,
    passDiv,
    loginBtn,
    errorMsg,
    signupLink
  );
  customAppendChild(cardDiv, loginForm);
  customAppendChild(mainContent, headerDiv, cardDiv);
  customAppendChild(app, mainContent);
};

createLoginPage();
