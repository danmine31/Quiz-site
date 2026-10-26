let lightmode = localStorage.getItem('lightmode');
const themeButton = document.querySelector('.header_button');

const enableLightmode = () => {
    document.body.classList.add('lightmode');
    localStorage.setItem('lightmode', 'active');
}

const enableDarkmode = () => {
    document.body.classList.remove('lightmode');
    localStorage.setItem('lightmode', 'inactive');
}

if (lightmode === 'active') {
    enableLightmode();
}

themeButton.addEventListener('click', () => {
    lightmode = localStorage.getItem('lightmode');
    lightmode !== 'active' ? enableLightmode() : enableDarkmode();
});