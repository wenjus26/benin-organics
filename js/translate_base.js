// ===== SYSTÈME DE TRADUCTION GOOGLE TRANSLATE AMÉLIORÉ =====

let currentLang = 'fr';
let translationInProgress = false;

const langNames = {
    'fr': 'Français',
    'en': 'English',
    'hi': 'हिन्दी'
};

// Fonction pour nettoyer les éléments Google Translate
function cleanGoogleElements() {
    const googleSelectors = [
        '.goog-te-spinner-pos',
        '.goog-te-spinner',
        '.goog-te-banner-frame',
        '.skiptranslate',
        '.goog-te-ftab',
        '.goog-te-menu-frame'
    ];
    
    googleSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.display = 'none !important';
            el.style.visibility = 'hidden !important';
            el.style.height = '0 !important';
            el.style.width = '0 !important';
        });
    });
    
    document.body.style.top = '0px !important';
}

// Fonction principale de traduction
function translatePage(lang) {
    if (lang === currentLang || translationInProgress) return;
    
    translationInProgress = true;
    console.log('Traduction vers:', lang);
    
    // Mettre à jour les boutons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    if (lang === 'fr') {
        // Reset pour le français
        location.reload();
    } else {
        // Utiliser Google Translate
        try {
            const googleTranslateCombo = document.querySelector('.goog-te-combo');
            if (googleTranslateCombo) {
                googleTranslateCombo.value = lang;
                googleTranslateCombo.dispatchEvent(new Event('change'));
                
                setTimeout(() => {
                    cleanGoogleElements();
                    currentLang = lang;
                    translationInProgress = false;
                }, 1000);
            } else {
                console.warn('Google Translate élément non trouvé');
                translationInProgress = false;
            }
        } catch (error) {
            console.error('Erreur de traduction:', error);
            translationInProgress = false;
        }
    }
}

// Surveillance constante des éléments Google
let observer = null;

function initMutationObserver() {
    observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        // Vérifier si c'est un élément Google
                        if (node.className && 
                            (typeof node.className === 'string' || node.className instanceof String) &&
                            node.className.includes('goog')) {
                            cleanGoogleElements();
                        }
                        
                        // Vérifier les iframes
                        if (node.tagName === 'IFRAME') {
                            cleanGoogleElements();
                        }
                        
                        // Vérifier les enfants
                        if (node.querySelectorAll) {
                            const googleElements = node.querySelectorAll('[class*="goog-"], [class*="skiptranslate"]');
                            if (googleElements.length > 0) {
                                cleanGoogleElements();
                            }
                        }
   Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Nettoyer Google immédiatement
    setTimeout(() => {
        cleanGoogleElements();
        
        // Marquer le bouton français comme actif
        const frBtn = document.querySelector('.lang-btn[data-lang="fr"]');
        if (frBtn) {
            frBtn.classList.add('active');
        }
        
        console.log('Système de traduction initialisé');
    }, 500);
});

// Nettoyage périodique
setInterval(() => {
    cleanGoogleElements();
}, 2000);

// Exporter les fonctions
window.translateUtils = {
    translatePage,
    cleanGoogle