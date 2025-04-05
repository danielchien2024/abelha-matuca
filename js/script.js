const numeroWhatsApp = "5511941367427";
const mensagemPadrao =
  "Olá! Gostaria de mais informações sobre os bolos da Abelha Mutuca.";
const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
  mensagemPadrao
)}`;
const botaoHero = document.getElementById("whatsapp-button-hero");
const botaoFinal = document.getElementById("whatsapp-button-final");
if (botaoHero) {
  botaoHero.href = linkWhatsApp;
  botaoHero.target = "_blank";
}
if (botaoFinal) {
  botaoFinal.href = linkWhatsApp;
  botaoFinal.target = "_blank";
}
const anoAtual = new Date().getFullYear();
const spanAno = document.getElementById("current-year");
if (spanAno) {
  spanAno.textContent = anoAtual;
}
// --- Lightbox Functionality ---

// 1. Get DOM Elements
const galleryImages = document.querySelectorAll('#galeria .gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
// const lightboxCaption = document.getElementById('lightbox-caption'); // Se usar legenda
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

// 2. Store Image Data
let currentImageIndex;
const imageSources = [];
const imageAlts = []; // Armazenar texto alternativo para acessibilidade

galleryImages.forEach((img, index) => {
imageSources.push(img.src);
imageAlts.push(img.alt || `Imagem da Galeria ${index + 1}`); // Usa o alt existente ou um padrão
img.setAttribute('data-index', index); // Adiciona data-index para fácil referência

// 3. Add Click Listener to Thumbnails
img.addEventListener('click', (e) => {
currentImageIndex = parseInt(e.target.getAttribute('data-index'));
openLightbox();
});
});

// 4. Open Lightbox Function
function openLightbox() {
if (currentImageIndex === undefined || currentImageIndex < 0 || currentImageIndex >= imageSources.length) {
console.error("Índice de imagem inválido:", currentImageIndex);
return;
}
lightboxImg.src = imageSources[currentImageIndex];
lightboxImg.alt = imageAlts[currentImageIndex]; // Atualiza o alt da imagem grande
// if (lightboxCaption) lightboxCaption.textContent = imageAlts[currentImageIndex]; // Atualiza legenda se existir

updateNavButtons();
lightbox.style.display = 'flex'; // Muda display antes de ativar para garantir transição
setTimeout(() => { // Pequeno delay para garantir que o display mudou antes da opacidade
lightbox.classList.add('active');
}, 10); // 10ms é suficiente

// Adiciona listener para teclas de navegação
document.addEventListener('keydown', handleKeyboardNav);
}

// 5. Close Lightbox Function
function closeLightbox() {
lightbox.classList.remove('active');
// Espera a transição de opacidade terminar antes de esconder com display: none
// O tempo deve ser igual ao da transição de opacidade no CSS (0.4s = 400ms)
setTimeout(() => {
lightbox.style.display = 'none';
lightboxImg.src = ""; // Limpa a imagem para evitar flash de conteúdo antigo
lightboxImg.alt = "";
// if (lightboxCaption) lightboxCaption.textContent = "";
}, 400);

// Remove listener para teclas de navegação
document.removeEventListener('keydown', handleKeyboardNav);
}

// 6. Update Navigation Buttons State
function updateNavButtons() {
lightboxPrev.disabled = currentImageIndex === 0;
lightboxNext.disabled = currentImageIndex === imageSources.length - 1;
}

// 7. Navigation Functions
function showPrevImage() {
if (currentImageIndex > 0) {
currentImageIndex--;
openLightbox();
}
}

function showNextImage() {
if (currentImageIndex < imageSources.length - 1) {
currentImageIndex++;
openLightbox();
}
}

// 8. Keyboard Navigation Handler
function handleKeyboardNav(e) {
if (e.key === 'Escape') {
  closeLightbox();
} else if (e.key === 'ArrowLeft') {
  showPrevImage();
} else if (e.key === 'ArrowRight') {
  showNextImage();
}
}

// 9. Add Event Listeners to Controls
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrevImage);
lightboxNext.addEventListener('click', showNextImage);

// Opcional: Fechar clicando no fundo (overlay)
lightbox.addEventListener('click', (e) => {
// Verifica se o clique foi diretamente no elemento .lightbox (o fundo)
if (e.target === lightbox) {
closeLightbox();
}
});