// On cible les éléments à modifier
const toggle = document.querySelector(".menu-btn, .menu-btn--page");
const nav = document.querySelector(".menu");
const page = document.body;

// Vérifier si les éléments existent avant d'ajouter l'événement
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = toggle.ariaExpanded === "true";
    const isClosed = !isOpen;
    // Mise à jour des attributs ARIA pour accessibilité
    toggle.ariaExpanded = isClosed;
    nav.ariaHidden = isOpen;
    page.classList.toggle("noscroll", isClosed);
  });
} 

const nextButton = document.querySelector('.carousel__button--next');
const prevButton = document.querySelector('.carousel__button--prev');
const carouselContainer = document.querySelector('.carousel__container');

if (nextButton){
nextButton.addEventListener('click', () => {
  carouselContainer.scrollBy({ left: 300, behavior: 'smooth' });
});}
if (prevButton) {
prevButton.addEventListener('click', () => {
  carouselContainer.scrollBy({ left: -300, behavior: 'smooth' });
});}


const cards = document.querySelectorAll('.carousel-card');

// Ajoute un écouteur d'événement sur chaque carte
cards.forEach((card) => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped'); // Ajoute/enlève la classe 'flipped' au clic
  });
});