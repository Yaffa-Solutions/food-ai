import { createHtmlElement, customAppendChild } from '../../utils/dom.js';

export const createHomePage = (username) => {
  const app = document.querySelector('.app');

  const nav = createHtmlElement('nav', [
    'flex',
    'items-center',
    'justify-between',
    'bg-white',
    'shadow-sm',
    'px-8',
    'py-4'
  ]);

  const logo = createHtmlElement(
    'h1',
    [
      'text-2xl',
      'font-light',
      'text-blue-400',
      'tracking-wide',
      'drop-shadow-sm',
      'font-sans'
    ],
    'FoodAI'
  );

  const userDiv = createHtmlElement('div', [
    'flex',
    'items-center',
    'space-x-3'
  ]);

  const userCircle = createHtmlElement(
    'div',
    [
      'w-10',
      'h-10',
      'rounded-full',
      'bg-blue-400',
      'flex',
      'items-center',
      'justify-center',
      'text-white',
      'font-semibold',
      'text-lg'
    ],
    username.charAt(0).toUpperCase()
  );

  const greeting = createHtmlElement(
    'span',
    ['text-gray-700', 'font-medium'],
    `Hi, ${username}!`
  );

  customAppendChild(userDiv, userCircle, greeting);
  customAppendChild(nav, logo, userDiv);
  customAppendChild(app, nav);
};

createHomePage('Marwa');
