// 1. ALTERAR TAMANHO DA FONTE (ACESSIBILIDADE)
let currentFontScale = 1;
function changeFontSize(direction) {
    currentFontScale += direction * 0.05;
    if (currentFontScale < 0.85) currentFontScale = 0.85;
    if (currentFontScale > 1.25) currentFontScale = 1.25;
    document.documentElement.style.setProperty('--font-scale', `${currentFontScale}rem`);
}

// 2. ALTERNAR MODO ESCURO
function toggleDarkMode() {
    document.body.classList.remove('high-contrast');
    document.body.classList.toggle('dark-mode');
}

// 3. ALTERNAR ALTO CONTRASTE
function toggleHighContrast() {
    document.body.classList.remove('dark-mode');
    document.body.classList.toggle('high-contrast');
}

// 4. PESQUISA EM TEMPO REAL NA BARRA SUPERIOR
function liveSearch() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let items = document.querySelectorAll('.searchable');

    items.forEach(function(item) {
        let text = item.innerText.toLowerCase();
        if (text.includes(input)) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });
}

// 5. FILTRO DE CATEGORIAS DA GALERIA
function filterGallery(category) {
    let items = document.querySelectorAll('.gallery-item');
    let buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    items.forEach(item => {
        if (category === 'todos' || item.classList.contains(category)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

// 6. ENVIAR FORMULÁRIO DE CONTATO
function handleFormSubmit(event) {
    event.preventDefault();
    alert("✓ Sua mensagem foi enviada com sucesso! O colégio responderá em breve.");
    event.target.reset();
}