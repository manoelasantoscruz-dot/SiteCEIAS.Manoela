// NAVEGAÇÃO ENTRE SEÇÕES
function showSection(sectionId) {
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(sec => sec.classList.remove('active'));
  
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => link.classList.remove('active-link'));
  }
  
  // ACESSIBILIDADE: AJUSTE DE FONTE
  let currentScale = 1.0;
  function changeFontSize(delta) {
    currentScale += delta * 0.1;
    if (currentScale < 0.8) currentScale = 0.8;
    if (currentScale > 1.3) currentScale = 1.3;
    document.documentElement.style.setProperty('--font-scale', `${currentScale}rem`);
  }
  
  // ACESSIBILIDADE: MODO ESCURO
  function toggleDarkMode() {
    document.body.classList.remove('high-contrast');
    document.body.classList.toggle('dark-mode');
  }
  
  // ACESSIBILIDADE: ALTO CONTRASTE
  function toggleHighContrast() {
    document.body.classList.remove('dark-mode');
    document.body.classList.toggle('high-contrast');
  }
  
  // FILTROS DA GALERIA
  function filterGallery(category, event) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    if (event) event.target.classList.add('active');
  
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
      if (category === 'todos' || item.classList.contains(category)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }
  
  // BUSCA GLOBAL
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
  
  // EFEITO DE ELEMENTOS FLUTUANTES NO FUNDO (CANVAS)
  window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
  
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
  
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  
    const particles = [];
    const particleCount = 25;
  
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 15 + 5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.2 + 0.05
      });
    }
  
    function animate() {
      ctx.clearRect(0, 0, width, height);
  
      const isDark = document.body.classList.contains('dark-mode');
      const color = isDark ? '255, 255, 255' : '13, 59, 102';
  
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
  
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
  
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.alpha})`;
        ctx.fill();
      });
  
      requestAnimationFrame(animate);
    }
  
    animate();
  });