// Controle de menu responsivo
const toggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

if (toggle) {
    toggle.addEventListener('click', () => {
        navList.classList.toggle('open');
    });
}

// Fecha o menu ao selecionar um link (modo mobile)
navList?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navList.classList.remove('open'));
});

// Alerta simples para submissão do formulário
const form = document.querySelector('.search-form');
form?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Busca enviada!');
});
