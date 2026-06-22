/**
 * DSPS Lamesin Nyo - Fonctionnalités du site
 * Année : 2026
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. NAVIGATION FLUIDE (SMOOTH SCROLL)
    // ==========================================================================
    // Assure une transition douce lorsque l'on clique sur les liens du menu
    const links = document.querySelectorAll('nav a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            // Si le lien pointe juste vers "#", on ne fait rien
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // On calcule la hauteur du header pour ne pas cacher le titre de la section
                const headerOffset = document.querySelector('header').offsetHeight || 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================================================
    // 2. GESTION DU FORMULAIRE DE CONTACT
    // ==========================================================================
    const contactForm = document.querySelector('.contact-section form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Empêche le rechargement de la page
            
            // Récupération des données du formulaire
            const nomResponsable = contactForm.querySelector('input[type="text"]').value.trim();
            const nombreMembres = contactForm.querySelector('input[type="number"]').value;
            const email = contactForm.querySelector('input[type="email"]').value.trim();
            const message = contactForm.querySelector('textarea').value.trim();
            
            // Validation basique du nombre de membres (minimum 10 selon le modèle Lamesin Nyo)
            if (parseInt(nombreMembres, 10) < 10) {
                alert("⚠️ Attention : Le nouveau modèle d'adhésion requiert un groupe d'au moins 10 personnes.");
                return;
            }
            
            // Simulation d'envoi (À remplacer plus tard par une intégration d'API ou service d'email)
            console.log("Données reçues :", { nomResponsable, nombreMembres, email, message });
            
            // Message de succès à l'utilisateur
            alert(`Merci ${nomResponsable} ! Votre demande pour un groupe de ${nombreMembres} personnes a bien été reçue. Un conseiller DSPS Lamesin Nyo vous contactera rapidement.`);
            
            // Réinitialisation du formulaire
            contactForm.reset();
        });
    }

    // ==========================================================================
    // 3. OPTIMISATION DU MENU DROPDOWN SUR ÉCRANS TACTILES (MOBILE)
    // ==========================================================================
    // Permet aux utilisateurs sur smartphone de cliquer une fois pour ouvrir le sous-menu
    const dropdownLink = document.querySelector('.dropdown > a');
    
    if (dropdownLink) {
        dropdownLink.addEventListener('click', (e) => {
            // Appliqué uniquement sur les écrans tactiles ou mobiles (< 768px)
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const submenu = dropdownLink.nextElementSibling;
                
                if (submenu) {
                    const isVisible = submenu.style.visibility === 'visible';
                    submenu.style.opacity = isVisible ? '0' : '1';
                    submenu.style.visibility = isVisible ? 'hidden' : 'visible';
                    submenu.style.transform = isVisible ? 'translateY(10px)' : 'translateY(0)';
                }
            }
        });
    }
});
