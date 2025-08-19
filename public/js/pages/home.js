import { createHtmlElement, customAppendChild } from '../../utils/dom.js';

export const createHomePage = () => {
   const username = localStorage.getItem('name');
  const cookies = document.cookie;
  if (!cookies) {
    window.location.href = '#login';
    return;
  }

  const app = document.querySelector('.app');
  const nav = createHtmlElement('nav', [
    'flex',
    'items-center',
    'justify-between',
    'bg-white',
    'shadow-sm',
    'px-8',
    'py-4',
  ]);

  const logo = createHtmlElement(
    'h1',
    [
      'text-2xl',
      'font-light',
      'text-blue-400',
      'tracking-wide',
      'drop-shadow-sm',
      'font-sans',
    ],
    'FoodAI'
  );

  const userDiv = createHtmlElement('div', [
    'flex',
    'items-center',
    'space-x-3',
  ]);

  const myFood = createHtmlElement(
    'span',
    ['text-gray-700', 'font-medium','hover:text-blue-400','cursor-pointer','mr-10'],
    'My Food',
    {
      click:()=>{
        window.location.hash='#myfood'
      }
    }
  );

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
      'text-lg',
    ],
    username.charAt(0).toUpperCase(),
    {
      click: () => {
        dropdown.classList.toggle('hidden');
      },
    }
  );

  const greeting = createHtmlElement(
    'span',
    ['text-gray-700', 'font-medium'],
    `Hi, ${username}!`
  );
  const dropdown = createHtmlElement('div', [
    'absolute',
    'top-16',
    'right-0',
    'bg-white',
    'shadow-md',
    'rounded-md',
    'overflow-hidden',
    'hidden',
    'w-32',
    'z-50',
  ]);

  const logoutBtn = createHtmlElement(
    'button',
    ['w-full', 'text-left', 'px-4', 'py-2', 'hover:bg-gray-100'],
    'Log Out',
    {
      click: () => {
        sessionStorage.clear();
        window.location.hash = '#login';
      },
    }
  );

  customAppendChild(dropdown, logoutBtn);

  customAppendChild(userDiv,myFood, userCircle, greeting, dropdown);
  customAppendChild(nav, logo, userDiv);

  const main = createHtmlElement('main', [
    'flex',
    'justify-center',
    'items-center',
    'py-20',
    'bg-gray-50',
    'min-h-screen',
  ]);

  const card = createHtmlElement('div', [
    'bg-white',
    'rounded-2xl',
    'shadow-lg',
    'p-6',
    'w-96',
    'flex',
    'flex-col',
    'items-center',
    'space-y-4',
  ]);

  const previewBox = createHtmlElement('label', [
    'w-full',
    'h-56',
    'border-2',
    'border-dashed',
    'border-gray-300',
    'rounded-xl',
    'flex',
    'items-center',
    'justify-center',
    'cursor-pointer',
    'overflow-hidden',
    'bg-gray-50',
  ]);

  const previewImg = createHtmlElement('img', [
    'max-w-full',
    'max-h-full',
    'object-cover',
    'hidden',
  ]);

  const placeholderText = createHtmlElement(
    'span',
    ['text-gray-400', 'font-medium'],
    'Click to upload image'
  );

  const fileInput = createHtmlElement('input', ['hidden'], null, {
    change: (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          previewImg.src = ev.target.result;
          previewImg.classList.remove('hidden');
          placeholderText.classList.add('hidden');
        };
        reader.readAsDataURL(file);
      }
    },
  });
  fileInput.type = 'file';
  fileInput.name = 'image';
  fileInput.accept = 'image/*';

  customAppendChild(previewBox, previewImg, placeholderText, fileInput);

  const addBtn = createHtmlElement(
    'button',
    [
      'w-full',
      'bg-blue-500',
      'hover:bg-blue-600',
      'text-white',
      'font-medium',
      'py-2',
      'rounded-lg',
      'transition-colors',
      'duration-200',
    ],
    'Add Food',
    {
      click: () => {
        if (!fileInput.files.length) {
          errorMsg.textContent = 'Please select an image first!';
          errorMsg.classList.remove('hidden');
          setTimeout(() => {
            errorMsg.classList.add('hidden');
            errorMsg.textContent = '';
          }, 2000);

          return;
        }
        errorMsg.textContent = 'Food added successfully!';
        errorMsg.classList.remove('hidden');
        previewImg.classList.remove('text-red-500');
        errorMsg.classList.add('text-green-500');
        setTimeout(() => {
          errorMsg.classList.add('hidden');
          errorMsg.classList.remove('text-green-500');

          errorMsg.textContent = '';
        }, 2000);
        fileInput.value = '';
        previewImg.src = '';
        previewImg.classList.add('hidden');
        placeholderText.classList.remove('hidden');
      },
    }
  );
  const errorMsg = createHtmlElement(
    'p',
    ['text-red-500', 'text-left', 'mt-2', 'hidden', 'text-sm'],
    ''
  );

  customAppendChild(card, previewBox, addBtn, errorMsg);
  customAppendChild(main, card);
  customAppendChild(app, nav, main);
};
