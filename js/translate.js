// ===== SYSTÈME DE TRADUCTION GOOGLE TRANSLATE =====

// Initialiser le bouton FR comme actif et protéger les boutons au chargement
document.addEventListener('DOMContentLoaded', function() {
    const frBtn = document.querySelector('.lang-btn[data-lang="fr"]');
    if (frBtn) frBtn.classList.add('active');
    protectLanguageButtons();
});

// Fonction pour protéger les boutons de langue de la traduction
function protectLanguageButtons() {
    const buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach(btn => {
        if (btn.getAttribute('data-lang') === 'fr') btn.textContent = 'FR';
        if (btn.getAttribute('data-lang') === 'en') btn.textContent = 'EN';
        if (btn.getAttribute('data-lang') === 'hi') btn.textContent = 'HI';
    });
}

// Vérifier et corriger les boutons toutes les secondes
setInterval(protectLanguageButtons, 1000);

// Initialisation de Google Translate
function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'fr', includedLanguages: 'en,fr,hi'}, 'google_translate_element');
    setTimeout(protectLanguageButtons, 500);
}

// Fonction principale de traduction
function googleTranslate(lang) {
    // Mettre à jour les boutons actifs
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    if (lang === 'fr') {
        // Reset pour le français
        document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        location.reload();
    } else {
        // Trouver le dropdown Google Translate et changer la langue
        var el = document.querySelector('.goog-te-combo');
        if (el) { 
            el.value = lang; 
            el.dispatchEvent(new Event('change')); 
            setTimeout(protectLanguageButtons, 500); 
        }
        else {
            // Retry si Google Translate n'est pas encore chargé
            setTimeout(() => {
                var e = document.querySelector('.goog-te-combo');
                if (e) { 
                    e.value = lang; 
                    e.dispatchEvent(new Event('change')); 
                    setTimeout(protectLanguageButtons, 500); 
                }
            }, 500);
        }
    }
}
