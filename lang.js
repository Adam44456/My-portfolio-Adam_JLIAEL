/* ============================================================
   lang.js — Système de gestion du bilinguisme (FR / EN)
   Portfolio Adam Jlaiel
   Auteur  : Adam Jlaiel
   Version : 1.0

   Description :
   Ce fichier gère l'affichage conditionnel des éléments HTML
   selon la langue active. Il repose sur l'attribut [data-lang]
   posé directement dans le HTML :
     - data-lang="fr" → visible en français
     - data-lang="en" → visible en anglais
   ============================================================ */


/* ─────────────────────────────────────────
   Langue active par défaut au chargement
───────────────────────────────────────── */
var currentLang = 'fr';


/**
 * applyLang(lang)
 *
 * Applique la langue choisie sur toute la page :
 * - Affiche les éléments [data-lang="fr"] ou [data-lang="en"]
 * - Cache les éléments de l'autre langue
 * - Met à jour le bouton de switch
 * - Met à jour les placeholders du formulaire
 * - Met à jour l'attribut lang de la balise <html>
 *
 * @param {string} lang - 'fr' ou 'en'
 */
function applyLang(lang) {

  /* Mémorise la langue courante */
  currentLang = lang;

  /* Met à jour l'attribut lang du document (accessibilité + SEO) */
  document.documentElement.lang = lang;

  /* Met à jour le texte du bouton :
     si on est en FR → le bouton propose "EN" et vice-versa */
  var btn = document.getElementById('langBtn');
  if (btn) {
    btn.textContent = lang === 'fr' ? 'EN' : 'FR';
  }

  /* Parcourt tous les éléments portant un attribut data-lang */
  document.querySelectorAll('[data-lang]').forEach(function(el) {

    var elLang = el.getAttribute('data-lang');

    if (elLang === lang) {
      /* ── Affiche l'élément dans la bonne langue ── */

      /* Les <span> et <a> sont des éléments inline :
         on leur donne display:inline pour ne pas casser la mise en page */
      var tag = el.tagName.toLowerCase();
      if (tag === 'span' || tag === 'a') {
        el.style.display = 'inline';
      } else {
        /* Les <div>, <p>, <li>, etc. : display vide = valeur par défaut CSS */
        el.style.display = '';
      }

    } else {
      /* ── Cache l'élément de l'autre langue ── */
      el.style.display = 'none';
    }
  });

  /* Met à jour les placeholders du formulaire de contact */
  updateFormPlaceholders(lang);
}


/**
 * updateFormPlaceholders(lang)
 *
 * Change les textes indicatifs (placeholder) des champs
 * du formulaire de contact selon la langue.
 *
 * @param {string} lang - 'fr' ou 'en'
 */
function updateFormPlaceholders(lang) {

  var fieldName    = document.getElementById('ph-name');
  var fieldCompany = document.getElementById('ph-company');
  var fieldMsg     = document.getElementById('ph-msg');

  if (fieldName) {
    fieldName.placeholder = lang === 'fr'
      ? 'Jean Dupont'
      : 'John Doe';
  }

  if (fieldCompany) {
    fieldCompany.placeholder = lang === 'fr'
      ? 'Mon Entreprise'
      : 'My Company';
  }

  if (fieldMsg) {
    fieldMsg.placeholder = lang === 'fr'
      ? 'Bonjour Adam, je souhaite vous proposer une alternance...'
      : 'Hi Adam, I would like to offer you an apprenticeship opportunity...';
  }
}


/**
 * toggleLang()
 *
 * Fonction appelée par le bouton EN/FR dans la navbar.
 * Bascule entre les deux langues disponibles.
 */
function toggleLang() {
  var next = currentLang === 'fr' ? 'en' : 'fr';
  applyLang(next);
}


/* ─────────────────────────────────────────
   Initialisation au chargement de la page
   On applique le français par défaut
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
  applyLang('fr');
});
