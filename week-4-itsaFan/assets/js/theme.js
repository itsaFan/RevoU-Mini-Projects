const modeToggle = document.getElementById('mode-toggle');
const body = document.body;

modeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  setTheme();

  const isLight = isLightMode();
  localStorage.setItem('preferredMode', isLight ? 'light' : 'dark');
});

const isLightMode = () => body.classList.contains('light-mode');
const setTheme = () => {
  const root = document.documentElement;
  const theme = isLightMode() ? 'light' : 'dark';

  root.style.setProperty('--bg-color', theme === 'light' ? '#f5f5f5' : '#0f0e17');
  root.style.setProperty('--h-color', theme === 'light' ? '#0f0e17' : '#a7a9be');
  root.style.setProperty('--p-color', theme === 'light' ? '#2e2f3e' : '#a7a9be');
  root.style.setProperty('--navfoot-color', theme === 'light' ? '#eff0f3' : '#0b0b12')
  root.style.setProperty('--nav-li-color', theme === 'light' ? '#0f0e17' : '#fffffe')
};

const preferredMode = localStorage.getItem('preferredMode');
if (preferredMode === 'light') {
    body.classList.add('light-mode');
}

setTheme();