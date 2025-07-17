// MESSAGE MOBILE POUR PC
function initMobileMessage() {
    // Vérifier si on est sur PC (largeur > 768px)
    if (window.innerWidth > 768) {
        // Vérifier si l'utilisateur a déjà vu le message (expire après 1 jour)
        const messageData = localStorage.getItem('omnisphere-mobile-message');
        const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
        
        if (!messageData || JSON.parse(messageData).timestamp < oneDayAgo) {
            // Créer le message d'accueil
            const mobileMessage = document.createElement('div');
            mobileMessage.className = 'mobile-message';
            mobileMessage.innerHTML = `
                <div class="mobile-message__content">
                    <button class="mobile-message__close" onclick="closeMobileMessage()">×</button>
                    <img src="/assets/img/icons/logo/logo_omni-sphere-blanc.svg" alt="Logo Omnisphere" class="mobile-message__logo">
                    <h1 class="mobile-message__title">Omnisphere</h1>
                    <h2 class="mobile-message__subtitle">Expérience optimisée pour mobile</h2>
                    <p class="mobile-message__text">
                        Ce site est conçu pour offrir une expérience immersive en format mobile. 
                        Activez le mode responsive pour une navigation optimale !
                    </p>
                    <div class="mobile-message__instructions">
                        <div class="mobile-message__step">
                            <span class="mobile-message__step-number">1</span>
                            <span>Appuyez sur <strong>F12</strong> ou <strong>Ctrl+Shift+I</strong></span>
                        </div>
                        <div class="mobile-message__step">
                            <span class="mobile-message__step-number">2</span>
                            <span>Cliquez sur l'icône <strong>📱 responsive</strong></span>
                        </div>
                        <div class="mobile-message__step">
                            <span class="mobile-message__step-number">3</span>
                            <span>Sélectionnez <strong>iPhone</strong> ou <strong>390px</strong></span>
                        </div>
                    </div>
                    <div class="mobile-message__buttons">
                        <button class="mobile-message__button mobile-message__button--primary" onclick="openDevTools()">
                            📱 Mode mobile
                        </button>
                        <button class="mobile-message__button mobile-message__button--secondary" onclick="continuePc()">
                            💻 Continuer ici
                        </button>
                    </div>
                </div>
            `;
            
            // Ajouter le message au body
            document.body.appendChild(mobileMessage);
            
            // Bloquer le scroll
            document.body.style.overflow = 'hidden';
            
            // SUPPRESSION DE L'AUTO-FERMETURE
            // Le message reste affiché jusqu'à ce que l'utilisateur interagisse
        }
    }
}

function closeMobileMessage() {
    const mobileMessage = document.querySelector('.mobile-message');
    if (mobileMessage) {
        mobileMessage.classList.add('hidden');
        document.body.style.overflow = '';
        
        // Marquer comme vu dans localStorage avec timestamp
        const messageData = {
            seen: true,
            timestamp: Date.now()
        };
        localStorage.setItem('omnisphere-mobile-message', JSON.stringify(messageData));
        
        // Supprimer l'élément après l'animation
        setTimeout(() => {
            if (mobileMessage.parentNode) {
                mobileMessage.remove();
            }
        }, 800);
    }
}

function openDevTools() {
    // Message plus informatif pour les instructions
    const instructions = `
Pour activer le mode mobile :

1. Ouvrez les outils de développement (F12)
2. Cliquez sur l'icône responsive/mobile (📱)
3. Sélectionnez "iPhone" ou définissez la largeur à 390px
4. Rafraîchissez la page pour une expérience optimale

Le site est conçu pour une largeur de 390px !
    `;
    
    alert(instructions);
    closeMobileMessage();
}

function continuePc() {
    closeMobileMessage();
}

// Réinitialiser le message si l'utilisateur redimensionne la fenêtre
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        closeMobileMessage();
    }
});

// Initialiser le message au chargement de la page
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMessage);
} else {
    initMobileMessage();
}

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
    // Fonction pour recalculer la largeur d'un item dynamiquement
    function getItemWidth() {
        return items[0].offsetWidth + 16; // +16 pour le gap
    }

    // Calculer la position du carousel pour centrer sur l'image du milieu
    function centerCarousel() {
        const itemWidth = getItemWidth();
        const middleIndex = Math.floor(items.length / 2); // Index de l'image du milieu
        let middlePosition = middleIndex * itemWidth; // Position à atteindre pour centrer

        // Appliquer un décalage (par exemple, pour compenser des marges ou paddings)
        const offset = -itemWidth / 5; // Ajuste cette valeur pour ton besoin (négatif = à gauche)
        middlePosition += offset;

        // Déplacer le carousel pour centrer l'image du milieu au démarrage
        carouselContainer.scrollLeft = middlePosition;
    }

    // Centrer le carousel au démarrage
    centerCarousel();

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            const itemWidth = getItemWidth();
            carouselContainer.scrollBy({ left: itemWidth, behavior: 'smooth' });
        });
    }
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            const itemWidth = getItemWidth();
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

