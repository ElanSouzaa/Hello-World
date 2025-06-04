// Script para controle do menu responsivo
const toggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

if (toggle) {
    toggle.addEventListener('click', () => {
        navList.classList.toggle('open');
    });
}

// Placeholder de submissão do formulário
const form = document.querySelector('.search-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Busca enviada! (funcionalidade de backend não implementada)');
    });
}
