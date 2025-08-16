export const createHtmlElement = (
  tag,
  classes = [],
  content = "",
  listener = {}
) => {
  const el = document.createElement(tag);
  classes.forEach((cl) => el.classList.add(cl));
  el.textContent = content;
  Object.entries(listener).forEach(([eventname, handler]) => {
    el.addEventListener(eventname, handler);
  });
  return el;
};
export const customAppendChild = (perant, ...children) => {
  children.forEach((child) => perant.appendChild(child));
};
