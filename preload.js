const utils = require('./src/utils/index.js');

function saveUtilsInWindow() {
  Object.entries(utils).map(([key, value]) => {
    window[key] = value;
  })
}

saveUtilsInWindow();

window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});
