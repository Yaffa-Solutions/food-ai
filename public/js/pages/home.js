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
    'shadow-xl',
    'px-8',
    'py-4',
  ]);

  const logo = createHtmlElement(
    'h1',
    [
      'text-2xl',
      'font-light',
      'text-blue-500',
      'tracking-wide',
      'drop-shadow-sm',
      'font-sans',
    ],
    'FoodAI'
  );

  const userDiv = createHtmlElement('div', [
    'flex',
    'items-center',
    'space-x-4',
  ]);

  const myFood = createHtmlElement(
    'span',
    [
      'text-gray-700',
      'font-medium',
      'hover:text-blue-400',
      'cursor-pointer',
      'mr-10',
    ],
    'My Food',
    {
      click: () => {
        window.location.hash = '#myfood';
      },
    }
  );

  const userCircle = createHtmlElement(
    'div',
    [
      'w-10',
      'h-10',
      'rounded-full',
      'bg-blue-500',
      'flex',
      'items-center',
      'justify-center',
      'text-white',
      'font-semibold',
      'text-lg',
      'hover:bg-blue-600',
      'transition-colors',
      'cursor-pointer',
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
    'shadow-xl',
    'rounded-lg',
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

  customAppendChild(userDiv, myFood, userCircle, greeting, dropdown);
  customAppendChild(nav, logo, userDiv);

  const main = createHtmlElement('main', [
    'flex',
    'flex-col',
    'items-center',
    'bg-gray-50',
    'min-h-screen',
    'px-6',
    'py-6',
    'w-full',
    'space-y-6',
  ]);

  const sectionTitle = createHtmlElement(
    'h2',
    [
      'text-3xl',
      'font-extrabold',
      'bg-clip-text',
      'text-transparent',
      'bg-gradient-to-r',
      'from-blue-400',
      'to-purple-500',
      'drop-shadow-md',
    ],
    `Calories Don't Count If You Upload Them :)`
  );

  const card = createHtmlElement('div', [
    'bg-white',
    'rounded-3xl',
    'shadow-2xl',
    'hover:scale-105',
    'p-8',
    'w-96',
    'flex',
    'flex-col',
    'items-center',
    'space-y-6',
    'transition-transform',
  ]);

  const previewWrapper = createHtmlElement('div', [
    'relative',
    'w-full',
    'h-56',
  ]);
  const previewBox = createHtmlElement('label', [
    'w-full',
    'h-56',
    'border-2',
    'border-dashed',
    'border-gray-300',
    'border-transparent',
    'hover:border-blue-400',
    'rounded-2xl',
    'flex',
    'items-center',
    'justify-center',
    'cursor-pointer',
    'overflow-hidden',
    'bg-gray-50',
    'transition-colors',
    'duration-200',
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
          discardBtn.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
      }
    },
  });
  fileInput.type = 'file';
  fileInput.name = 'image';
  fileInput.accept = 'image/*';

  customAppendChild(previewBox, previewImg, placeholderText, fileInput);

  const discardBtn = createHtmlElement(
    'button',
    [
      'absolute',
      'top-2',
      'right-2',
      'text-white',
      'rounded-full',
      'w-8',
      'h-8',
      'flex',
      'items-center',
      'justify-center',
      'hidden',
      'hover:text-2xl',
      'transition',
    ],
    '×',
    {
      click: (e) => {
        e.stopPropagation();
        fileInput.value = '';
        previewImg.src = '';
        previewImg.classList.add('hidden');
        placeholderText.classList.remove('hidden');
        discardBtn.classList.add('hidden');
      },
    }
  );
  customAppendChild(previewWrapper, previewBox, discardBtn);

  const addBtn = createHtmlElement(
    'button',
    [
      'w-full',
      'bg-blue-500',
      'hover:bg-blue-600',
      'text-white',
      'font-medium',
      'py-3',
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
        const originalText = addBtn.textContent;
        addBtn.textContent = 'Uploading...';
        addBtn.disabled = true;
        const formData = new FormData();
        formData.append('image', fileInput.files[0]);

        fetch('/api/foods/add', {
          method: 'POST',
          body: formData,
          credentials: 'include',
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              errorMsg.textContent = data.error;
              errorMsg.classList.remove('hidden');
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
              window.location.hash = '#myfood';
            }, 1000);
            fileInput.value = '';
            previewImg.src = '';
            previewImg.classList.add('hidden');
            placeholderText.classList.remove('hidden');
          })
          .catch((err) => {
            errorMsg.textContent = 'failed to upload';
            errorMsg.classList.remove('hidden');
            console.error(err);
          })
          .finally(() => {
            addBtn.textContent = originalText;
            addBtn.disabled = false;
          });
      },
    }
  );

  const errorMsg = createHtmlElement(
    'p',
    ['text-red-500', 'text-left', 'mt-2', 'hidden', 'text-sm'],
    ''
  );

  customAppendChild(card, previewWrapper, addBtn, errorMsg);
  customAppendChild(main, sectionTitle, card);
  customAppendChild(app, nav, main);
};
