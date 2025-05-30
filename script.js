// Carrossel de depoimentos com setas
const depoimentos = document.querySelectorAll('.depoimento');
const setaEsq = document.querySelector('.seta-esq');
const setaDir = document.querySelector('.seta-dir');
let index = 0;

function mostrarDepoimento(i) {
  depoimentos.forEach((dep, idx) => {
    dep.classList.toggle('ativo', idx === i);
  });
  animarDepoimentoAtivo();
}

function proximoDepoimento() {
  index = (index + 1) % depoimentos.length;
  mostrarDepoimento(index);
}
function anteriorDepoimento() {
  index = (index - 1 + depoimentos.length) % depoimentos.length;
  mostrarDepoimento(index);
}
if (setaDir) setaDir.addEventListener('click', proximoDepoimento);
if (setaEsq) setaEsq.addEventListener('click', anteriorDepoimento);
setInterval(proximoDepoimento, 4000); // Troca a cada 4 segundos

// Efeito de animação ao rolar 
const animarAoRolar = () => {
  const elementos = document.querySelectorAll('.card, .hero-text, .hero-img');
  const trigger = window.innerHeight * 0.85;
  elementos.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) {
      el.style.opacity = 1;
      el.style.transform = 'none';
    }
  });
};
window.addEventListener('scroll', animarAoRolar);
window.addEventListener('load', animarAoRolar);

// Menu mobile
const btnMenu = document.querySelector('.menu-mobile');
const navUl = document.querySelector('nav ul');
if (btnMenu && navUl) {
  btnMenu.addEventListener('click', () => {
    navUl.classList.toggle('ativo');
  });
  
  navUl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navUl.classList.remove('ativo');
    });
  });
}


const titulo = document.querySelector('.hero-text h1');
if (titulo) {
  const texto = titulo.textContent;
  titulo.textContent = '';
  let i = 0;
  function digitar() {
    if (i < texto.length) {
      titulo.textContent += texto.charAt(i);
      i++;
      setTimeout(digitar, 45);
    }
  }
  digitar();
}

//  Parallax no mockup
const heroImg = document.querySelector('.hero-img img');
window.addEventListener('mousemove', e => {
  if (window.innerWidth > 900 && heroImg) {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    heroImg.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
  }
});
window.addEventListener('mouseleave', () => {
  if (heroImg) heroImg.style.transform = '';
});

//  Tilt nos cards
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width/2;
    const yc = rect.height/2;
    const dx = (x - xc) / xc;
    const dy = (y - yc) / yc;
    card.style.transform = `rotateY(${dx*8}deg) rotateX(${-dy*8}deg) scale(1.04)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


function criarRipple(e) {
  const btn = e.currentTarget;
  const circle = document.createElement('span');
  circle.className = 'ripple';
  const size = Math.max(btn.offsetWidth, btn.offsetHeight);
  circle.style.width = circle.style.height = size + 'px';
  circle.style.left = (e.offsetX - size/2) + 'px';
  circle.style.top = (e.offsetY - size/2) + 'px';
  btn.appendChild(circle);
  setTimeout(() => circle.remove(), 600);
}
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', criarRipple);
});


const links = document.querySelectorAll('nav a[href^="#"], .btn[href^="#"]');
links.forEach(link => {
  link.addEventListener('click', function(e) {
    const hash = this.getAttribute('href');
    if (hash && hash.startsWith('#')) {
      e.preventDefault();
      document.querySelector(hash).scrollIntoView({ behavior: 'smooth' });
    }
  });
});


function animarDepoimentoAtivo() {
  document.querySelectorAll('.depoimento').forEach(dep => {
    dep.classList.remove('zoom');
  });
  const ativo = document.querySelector('.depoimento.ativo');
  if (ativo) ativo.classList.add('zoom');
}
setInterval(animarDepoimentoAtivo, 400);


const darkBtn = document.createElement('button');
darkBtn.className = 'dark-toggle';
darkBtn.innerHTML = '🌙';
document.body.appendChild(darkBtn);
darkBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  darkBtn.innerHTML = document.body.classList.contains('dark') ? '☀️' : '🌙';
}); 
