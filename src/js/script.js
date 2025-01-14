// MEN
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



//CAROUSEL
const nextButton = document.querySelector('.carousel__button--next');
const prevButton = document.querySelector('.carousel__button--prev');
const carouselContainer = document.querySelector('.carousel__container');
const items = document.querySelectorAll('.carousel__item');

// Fonction pour calculer la largeur d'un item

if (items.length > 0) {
    const itemWidth = items[0].offsetWidth;

// Calculer la position du carousel pour centrer sur l'image du milieu
const middleIndex = Math.floor(items.length / 2); // Index de l'image du milieu
let middlePosition = middleIndex * itemWidth; // Position à atteindre pour centrer

// Appliquer un décalage (par exemple, pour compenser des marges ou paddings)
const offset = -itemWidth / 5; // Ajuste cette valeur pour ton besoin (négatif = à gauche)
middlePosition += offset;

// Déplacer le carousel pour centrer l'image du milieu au démarrage
carouselContainer.scrollLeft = middlePosition;

if (nextButton) {
  nextButton.addEventListener('click', () => {
    carouselContainer.scrollBy({ left: itemWidth, behavior: 'smooth' });
  });
}
if (prevButton) {
  prevButton.addEventListener('click', () => {
    carouselContainer.scrollBy({ left: -itemWidth, behavior: 'smooth' });
  });
}

} else {
    console.error("Aucun élément carousel trouvé.");
}

//CARD

const cards = document.querySelectorAll('.carousel-card');

cards.forEach((card) => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});

const arrow = document.getElementById("hero__fleche");

// Ajoutez un événement de clic
arrow.addEventListener("click", () => {
    window.scrollBy({
        top: 840, // Ajustez le nombre de pixels à descendre
        behavior: "smooth" // Ajoutez un effet de défilement fluide
    });
});

//FLECHE
document.getElementById("hero__fleche").addEventListener("click", () => {
    window.scrollBy({
        top: 830, // Le nombre de pixels à descendre (ajustez selon vos besoins)
        behavior: "smooth" // Défilement fluide
    });
});

//Light BOX
const lightbox = document.querySelector('#lightbox');
const listThumbnail = document.querySelectorAll("[data-full-img]");
const lightboxImg = document.querySelector('#lightbox img');

listThumbnail.forEach((thumbnail) => {
    thumbnail.addEventListener('click', (evt) => {
        lightboxImg.src = thumbnail.dataset.fullImg;
        lightbox.classList.add('open');
        lightbox.classList.remove('close');
    });
});

lightbox.addEventListener('click', () => {
    lightbox.classList.add('close');
    lightbox.classList.remove('open');
    setTimeout(() => {
        lightbox.close();
    }, 700); 
});


// Sélectionner tous les boutons avec la classe "button-link"
const buttons = document.querySelectorAll(".button-link");

// Ajouter des événements "mouseover" et "mouseout" pour chaque bouton
buttons.forEach((button) => {
  button.addEventListener("mouseover", () => {
    // Appliquer le gradient au texte
    button.style.setProperty("background", "linear-gradient(90deg, var(--rose), var(--bleu-cyan))");    button.style.webkitBackgroundClip = "text"; // Support pour WebKit (Chrome, Safari)
    button.style.webkitTextFillColor = "transparent"; // Support pour WebKit
    button.style.color = "transparent"; // Fallback pour d'autres navigateurs
  });

  button.addEventListener("mouseout", () => {
    // Réinitialiser les styles au survol
    button.style.background = "none";
    button.style.webkitTextFillColor = "var(--noir)";
    button.style.color = "var(--noir)";
  });
});



const swipper = new Swiper('.card-wrapper', {
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

