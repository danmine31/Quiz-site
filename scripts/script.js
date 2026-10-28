let lightmode = localStorage.getItem('lightmode');
const themeButton = document.querySelector('.header_button');
const grid = document.querySelector('.grid');
const cardTemplate = document.querySelector('#quiz-card-template');
const statusEl = document.querySelector('.status');

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

async function loadQuizzes() {
    const response = await fetch('data/quizzes.json');
    if (!response.ok) {
        throw new Error(`Ошибка загрузки: ${response.status}`);
    }
    return response.json();
}

function createCard(quiz) {
    const card = cardTemplate.content.firstElementChild.cloneNode(true);
    card.dataset.id = quiz.id;

    card.querySelector('.svg').src = `assets/images/${quiz.icon}`
    card.querySelector('.grid_title').textContent = quiz.title;
    card.querySelector('.grid_text').textContent = quiz.description;

    return card;
}

async function initQuizzes() {
    statusEl.textContent = 'Загрузка…';
    statusEl.hidden = false;

    try {
        const quizzes = await loadQuizzes();

        const fragment = document.createDocumentFragment();
        quizzes.forEach((quiz) => fragment.append(createCard(quiz)));
        grid.replaceChildren(fragment);

        statusEl.hidden = true;
    } catch (err) {
        console.error(err);
        statusEl.textContent = 'Не удалось загрузить викторины. Попробуйте обновить страницу.';
    }
}

initQuizzes();