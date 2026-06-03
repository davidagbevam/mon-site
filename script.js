/* ==========================================================================
   CONFIGURATIONS ET GESTIONNAIRES D'ÉVÉNEMENTS
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initSmoothScrolling();
    initFormValidation();
    initScrollAnimations();
});

/* ==========================================================================
   1. DÉFILEMENT FLUIDE (SMOOTH SCROLL)
   ========================================================================== */
function initSmoothScrolling() {
    // Sélectionne tous les liens d'ancrage qui pointent vers un ID (ex: #adhesion)
    const links = document.querySelectorAll('nav a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault(); // Empêche le saut brusque par défaut
            
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calcule la hauteur du menu pour ne pas cacher le titre de la section
                const headerOffset = document.querySelector("header").offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
}

/* ==========================================================================
   2. VALIDATION ET ENVOI DU FORMULAIRE DE CONTACT
   ========================================================================== */
function initFormValidation() {
    const form = document.querySelector("form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Empêche le rechargement de la page
        
        // Récupération des valeurs des champs
        const nomResponsable = form.querySelector('input[type="text"]').value.trim();
        const nbrMembres = form.querySelector('input[type="number"]').value;
        const email = form.querySelector('input[type="email"]').value.trim();
        const message = form.querySelector("textarea").value.trim();
        
        // Validation basique pour s'assurer que le nombre de membres est positif
        if (nbrMembres < 1) {
            alert("⚠️ Le nombre de membres prévus doit être d'au moins 1 personne.");
            return;
        }

        // Changement de l'état du bouton pendant l'envoi simulé
        const submitBtn = form.querySelector("button[type='submit']");
        const originalBtnText = submitBtn.innerText;
        submitBtn.disabled = true;
        submitBtn.innerText = "Envoi en cours...";

        // Simulation d'un envoi asynchrone (ex: Fetch API vers un backend)
        setTimeout(() => {
            // Création d'un message de remerciement dynamique
            const successBox = document.createElement("div");
            successBox.style.backgroundColor = "rgba(25, 135, 84, 0.1)";
            successBox.style.color = "#198754";
            successBox.style.padding = "15px";
            successBox.style.borderRadius = "8px";
            successBox.style.marginTop = "15px";
            successBox.style.textAlign = "center";
            successBox.style.fontWeight = "600";
            successBox.innerHTML = `Merci ${nomResponsable} ! Votre demande pour un groupe de ${nbrMembres} personnes a bien été reçue. Un animateur Lamesin Nyo vous contactera sous peu.`;
            
            // Ajoute le message après le formulaire et réinitialise les champs
            form.appendChild(successBox);
            form.reset();
            
            // Remet le bouton à son état initial
            submitBtn.disabled = false;
            submitBtn.innerText = originalBtnText;

            // Fait disparaître le message de succès automatiquement après 7 secondes
            setTimeout(() => {
                successBox.remove();
            }, 7000);

        }, 1500); // Délai de simulation de 1.5 seconde
    });
}

/* ==========================================================================
   3. ANIMATIONS AU DÉFILEMENT (SCROLL REVEAL)
   ========================================================================== */
function initScrollAnimations() {
    // Cibles à animer : les cartes principales, la galerie photo et la section vidéos
    const elementsToAnimate = document.querySelectorAll(".card, .grid-photos > div, .grid-videos > div");
    
    // Ajout d'un style CSS initial de manière propre via JS
    elementsToAnimate.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
    });

    // Configuration de l'Intersection Observer (API moderne de détection de défilement)
    const observerOptions = {
        root: null, // Utilise le viewport de l'écran
        threshold: 0.15, // L'élément s'anime quand 15% de sa surface est visible
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Rendre l'élément visible et le remettre à sa place d'origine
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                // On arrête d'observer cet élément une fois l'animation jouée
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elementsToAnimate.forEach(el => {
        scrollObserver.observe(el);
    });
}
