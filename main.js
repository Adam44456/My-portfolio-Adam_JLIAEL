/* ============================================================
   main.js — Scripts principaux du portfolio
   Portfolio Adam Jlaiel
   Auteur  : Adam Jlaiel
   Version : 1.0

   Description :
   Ce fichier regroupe tous les comportements JavaScript
   indépendants de la gestion des langues :
     1. Génération du ticker défilant
     2. Animations d'entrée via IntersectionObserver
     3. Mise en évidence du lien actif dans la navbar
   ============================================================ */


/* ─────────────────────────────────────────
   1. TICKER DÉFILANT (bandeau orange)

   Le ticker est une liste de mots-clés
   qui défile en boucle. On duplique son
   contenu pour créer l'illusion d'un
   défilement infini grâce à l'animation
   CSS "ticker" définie dans styles.css.
───────────────────────────────────────── */

/** Liste des mots-clés affichés dans le bandeau */
var tickerItems = [
  'BUT R&T', '·',
  'CYBERSÉCURITÉ', '·',
  'IUT VILLETANEUSE', '·',
  'PENTEST', '·',
  'RÉSEAU', '·',
  'ALTERNANCE 2026', '·',
  'AP-HP BICHAT', '·',
  'REACT', '·',
  'PYTHON', '·',
  'NESSUS', '·',
  'METASPLOIT', '·'
];

/**
 * buildTicker()
 *
 * Génère le contenu HTML du ticker et l'injecte dans
 * l'élément #tickerInner. Le contenu est répété 3 fois
 * pour que la boucle CSS soit seamless (sans saut visible).
 */
function buildTicker() {
  var container = document.getElementById('tickerInner');
  if (!container) return; /* sécurité si l'élément n'existe pas */

  var html = '';

  /* Répétition x3 pour le défilement infini */
  for (var i = 0; i < 3; i++) {
    tickerItems.forEach(function(word) {
      /* Le point séparateur reçoit une classe spéciale pour l'opacité */
      var cls = word === '·' ? ' class="dot"' : '';
      html += '<span' + cls + '>' + word + '</span>';
    });
  }

  container.innerHTML = html;
}


/* ─────────────────────────────────────────
   2. ANIMATIONS D'ENTRÉE (IntersectionObserver)

   Au lieu de tout animer dès le chargement,
   on attend que chaque élément soit visible
   dans le viewport avant de le faire apparaître.
   Cela donne un effet de révélation au scroll.
───────────────────────────────────────── */

/**
 * setupScrollAnimations()
 *
 * Observe les cartes d'expérience, les lignes de projets
 * et les barres de compétences. Quand ils entrent dans
 * le viewport, la classe "visible" leur est ajoutée,
 * déclenchant leur animation CSS.
 */
function setupScrollAnimations() {

  /* Configuration de l'observateur :
     threshold 0.15 = déclenche quand 15% de l'élément est visible */
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {

      if (entry.isIntersecting) {

        var el = entry.target;

        /* Ajoute la classe .visible qui déclenche les transitions CSS */
        el.classList.add('visible');

        /* Cas particulier des barres de compétence :
           on déclenche manuellement l'animation de remplissage */
        var fillBar = el.querySelector('.skill-fill-line');
        if (fillBar) {
          fillBar.style.transform = 'scaleX(1)';
        }
      }
    });

  }, { threshold: 0.15 });


  /* ── Cartes d'expérience ── */
  document.querySelectorAll('.exp-card').forEach(function(card, index) {
    /* Décalage progressif : chaque carte apparaît 70ms après la précédente */
    card.style.transitionDelay = (index % 3 * 0.07) + 's';
    observer.observe(card);
  });


  /* ── Lignes de projets ── */
  document.querySelectorAll('.project-row').forEach(function(row, index) {
    row.style.transitionDelay = (index * 0.08) + 's';
    observer.observe(row);
  });


  /* ── Barres de compétences ── */
  document.querySelectorAll('.skill-line').forEach(function(line) {

    /* Initialise la barre à 0 (cachée) avant observation */
    var fillBar = line.querySelector('.skill-fill-line');
    if (fillBar) {
      fillBar.style.transition = 'transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s';
      fillBar.style.transform  = 'scaleX(0)';
    }

    observer.observe(line);
  });
}


/* ─────────────────────────────────────────
   3. LIEN ACTIF DANS LA NAVBAR

   Détecte la section actuellement visible
   et met en orange le lien de navigation
   correspondant dans la barre fixe.
───────────────────────────────────────── */

/**
 * setupActiveNav()
 *
 * Écoute l'événement scroll et compare la position
 * verticale de chaque section avec le scrollY courant
 * pour déterminer quelle section est "active".
 */
function setupActiveNav() {

  /* Récupère toutes les sections qui ont un id */
  var sections = document.querySelectorAll('section[id]');

  /* Récupère tous les liens de navigation */
  var navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', function() {

    var currentId = '';

    /* Parcourt les sections pour trouver la dernière
       dont le haut est au-dessus du point de vue actuel */
    sections.forEach(function(section) {
      if (window.scrollY >= section.offsetTop - 140) {
        currentId = section.id;
      }
    });

    /* Met à jour la couleur des liens de nav */
    navLinks.forEach(function(link) {
      var href = link.getAttribute('href');
      if (href === '#' + currentId) {
        link.style.color = 'var(--orange)'; /* lien actif = orange */
      } else {
        link.style.color = '';              /* autre = couleur CSS par défaut */
      }
    });

  });
}


/* ─────────────────────────────────────────
   INITIALISATION
   Lance toutes les fonctions au chargement
   complet du DOM
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
  buildTicker();
  setupScrollAnimations();
  setupActiveNav();
});
