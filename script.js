// Sistema de Troca de Páginas/Seções
function showSection(sectionId) {
  const sections = document.querySelectorAll('.page-section');
  sections.forEach(sec => sec.classList.remove('active'));
  
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Controle de Acessibilidade - Tamanho da Fonte
let currentScale = 1.0;
function changeFontSize(delta) {
  currentScale += delta * 0.1;
  if (currentScale < 0.8) currentScale = 0.8;
  if (currentScale > 1.4) currentScale = 1.4;
  document.documentElement.style.setProperty('--font-scale', `${currentScale}rem`);
}

// Controle de Acessibilidade - Modo Escuro
function toggleDarkMode() {
  document.body.classList.remove('high-contrast');
  document.body.classList.toggle('dark-mode');
}

// Controle de Acessibilidade - Alto Contraste
function toggleHighContrast() {
  document.body.classList.remove('dark-mode');
  document.body.classList.toggle('high-contrast');
}

// Filtro da Galeria por Categoria/Ano
function filterGallery(category, evt) {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  
  if (evt) {
    evt.target.classList.add('active');
  }

  const items = document.querySelectorAll('.gallery-item');
  items.forEach(item => {
    if (category === 'todos' || item.classList.contains(category)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// Busca Global
function handleSearch(e) {
  if (e.key === 'Enter') {
    const query = e.target.value.toLowerCase().trim();
    if (!query) return;

    const displayQuery = document.getElementById('search-query-display');
    const resultsContainer = document.getElementById('search-results-list');
    
    displayQuery.innerText = `Mostrando resultados para: "${query}"`;
    resultsContainer.innerHTML = '';

    const cards = document.querySelectorAll('.card, .timeline-item');
    let foundCount = 0;

    cards.forEach(card => {
      if (card.innerText.toLowerCase().includes(query)) {
        const clone = card.cloneNode(true);
        resultsContainer.appendChild(clone);
        foundCount++;
      }
    });

    if (foundCount === 0) {
      resultsContainer.innerHTML = '<p>Nenhum resultado encontrado para esta pesquisa.</p>';
    }

    showSection('search-results-section');
  }
}