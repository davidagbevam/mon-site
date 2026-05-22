/* ==========================================================================
   DSPS Lamesin Nyo - Script d'interactivité
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. DÉFILEMENT FLUIDE (SMOOTH SCROLL) POUR LES LIENS D'ANCRE
    // Permet de naviguer doucement vers les sections (#adhesion, #cotisations, etc.)
    const menuLinks = document.querySelectorAll('nav a[href^="#"], .btn-main[href^="#"]');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Sécurité pour les liens vides
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calcule la hauteur du header pour ne pas cacher le haut de la section
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // 2. GESTION DU FORMULAIRE DE CONTACT
    // Intercepte l'envoi, affiche un état de chargement, puis un message de succès personnalisé
    const contactForm = document.querySelector('.contact-section form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Empêche le rechargement de la page
            
            // Récupération du bouton pour l'animer
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            // Changement d'état : simulation de chargement
            submitBtn.disabled = true;
            submitBtn.textContent = "Envoi en cours...";
            submitBtn.style.backgroundColor = "#e67e22"; // Passe à la couleur secondaire pendant l'envoi
            
            // Simulation d'une requête réseau (AJAX) après 1.5 seconde
            setTimeout(() => {
                // Réinitialise le formulaire
                contactForm.reset();
                
                // Restaure le bouton
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                submitBtn.style.backgroundColor = "";
                
                // Création d'un message de remerciement dynamique et visuel
                const successMessage = document.createElement('div');
                successMessage.className = 'note-box'; // Utilise la classe CSS déjà existante
                successMessage.style.backgroundColor = '#d4edda';
                successMessage.style.borderColor = '#28a745';
                successMessage.style.color = '#155724';
                successMessage.style.marginTop = '20px';
                successMessage.style.padding = '15px';
                successMessage.style.textAlign = 'center';
                successMessage.style.fontWeight = '600';
                successMessage.innerHTML = '✨ Merci ! Votre demande a bien été envoyée. Un conseiller Lamesin Nyo vous contactera très rapidement.';
                
                // Ajoute le message juste en dessous du formulaire
                contactForm.appendChild(successMessage);
                
                // Supprime automatiquement le message après 6 secondes
                setTimeout(() => {
                    successMessage.remove();
                }, 6000);
                
            }, 1500);
        });
    }


    // 3. ANIMATION D'APPARITION AU DÉFILEMENT (SCROLL ANIMATION)
    // Rend le site plus moderne en faisant apparaître les cartes délicatement lors du scroll
    const cards = document.querySelectorAll('.card');
    
    // Configuration de l'Observer : déclenche l'animation quand 10% de la carte est visible
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Se déclenche un peu avant d'atteindre le bas de l'écran
    };
    
    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ajoute les styles de transition directement
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Une fois animée, on arrête d'observer cette carte
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Initialisation des états invisibles sur les cartes avant le scroll
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        cardObserver.observe(card);
    });

});
