// MESSAGE MOBILE POUR PC
function initMobileMessage() {
    // Vérifier si on est sur PC (largeur > 768px)
    if (window.innerWidth > 768) {
        // Vérifier si l'utilisateur a déjà vu le message dans cette session
        const hasSeenMessage = sessionStorage.getItem('omnisphere-mobile-message-seen');
        
        if (!hasSeenMessage) {
            // Créer le message d'accueil
            const mobileMessage = document.createElement('div');
            mobileMessage.className = 'mobile-message';
            mobileMessage.innerHTML = `
                <div class="mobile-message__content">
                    <button class="mobile-message__close" id="close-mobile-message">×</button>
                    <img src="/assets/img/icons/logo/logo_omni-sphere-blanc.svg" alt="Logo Omnisphere" class="mobile-message__logo">
                    <h1 class="mobile-message__title">Omnisphere</h1>
                    <h2 class="mobile-message__subtitle">Expérience optimisée pour mobile</h2>
                    <p class="mobile-message__text">
                        Ce site est conçu pour offrir une expérience immersive en format mobile. 
                        Activez le mode responsive pour une navigation optimale ou <strong>utilisez directement votre téléphone</strong> pour une meilleure expérience !
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
                        <button class="mobile-message__button mobile-message__button--primary" id="open-dev-tools">
                            📱 Mode mobile
                        </button>
                        <button class="mobile-message__button mobile-message__button--secondary" id="continue-pc">
                            💻 Continuer ici
                        </button>
                    </div>
                </div>
            `;
            
            // Ajouter le message au body
            document.body.appendChild(mobileMessage);
            
            // Bloquer le scroll
            document.body.style.overflow = 'hidden';
            
            // Ajouter les event listeners après que l'élément soit dans le DOM
            setTimeout(() => {
                const closeBtn = document.getElementById('close-mobile-message');
                const devToolsBtn = document.getElementById('open-dev-tools');
                const continuePcBtn = document.getElementById('continue-pc');
                
                if (closeBtn) {
                    closeBtn.addEventListener('click', closeMobileMessage);
                }
                
                if (devToolsBtn) {
                    devToolsBtn.addEventListener('click', openDevTools);
                }
                
                if (continuePcBtn) {
                    continuePcBtn.addEventListener('click', continuePc);
                }
            }, 100);
        }
    }
}

function closeMobileMessage() {
    const mobileMessage = document.querySelector('.mobile-message');
    if (mobileMessage) {
        mobileMessage.classList.add('hidden');
        document.body.style.overflow = '';
        
        // Marquer comme vu dans sessionStorage (pour cette session seulement)
        sessionStorage.setItem('omnisphere-mobile-message-seen', 'true');
        
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
const isEnglish = document.documentElement.lang === 'en';

cards.forEach((card) => {
  const image = card.querySelector('img');
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-pressed', 'false');
  const cardLabel = isEnglish ? 'Show information about' : 'Afficher les informations sur';
  card.setAttribute('aria-label', image ? `${cardLabel} ${image.alt}` : cardLabel);

  const toggleCard = () => {
    card.classList.toggle('flipped');
    card.setAttribute('aria-pressed', card.classList.contains('flipped').toString());
  };

  card.addEventListener('click', toggleCard);
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleCard();
    }
  });
});

const arrow = document.getElementById("hero__fleche");

if (arrow) {
  arrow.addEventListener("click", () => {
    window.scrollBy({
      top: 830,
      behavior: "smooth"
    });
  });
}

//Light BOX
const lightbox = document.querySelector('#lightbox');
const listThumbnail = document.querySelectorAll("[data-full-img]");
const lightboxImg = document.querySelector('#lightbox img');

if (lightbox && lightboxImg) {
  const closeLightbox = lightbox.querySelector('.lightbox__close');
  const openLightbox = (thumbnail) => {
    lightboxImg.src = thumbnail.dataset.fullImg;
    lightboxImg.alt = thumbnail.alt;
    lightbox.showModal();
  };

  listThumbnail.forEach((thumbnail) => {
    thumbnail.setAttribute('role', 'button');
    thumbnail.setAttribute('tabindex', '0');
    const lightboxLabel = isEnglish ? 'Enlarge' : 'Agrandir';
    thumbnail.setAttribute('aria-label', `${lightboxLabel} : ${thumbnail.alt}`);
    thumbnail.addEventListener('click', () => openLightbox(thumbnail));
    thumbnail.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(thumbnail);
      }
    });
  });

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      lightbox.close();
    }
  });

  if (closeLightbox) {
    closeLightbox.addEventListener('click', () => lightbox.close());
  }
}


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
