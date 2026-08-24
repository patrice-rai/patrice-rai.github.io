/* ============================================================
   Portfolio de Patrice RAÏ — script principal (JavaScript vanilla)
   - Menu : burger mobile, sous-menus déroulants accessibles
   - Bascule de thème sombre / clair (mémorisée en localStorage)
   - Filtres de la page compétences
   - Animations d'apparition au défilement (IntersectionObserver)
   - Fenêtres de détail de la frise du parcours (élément <dialog>)
   - Validation du formulaire de contact (avec champ pot de miel)
   - Constellation compétences ↔ réalisations générée depuis la
     matrice unique (navigation circulaire rendue visible)
   ============================================================ */

(function () {
  "use strict";

  /* Matrice unique compétences ↔ réalisations (source de vérité,
     injectée par le générateur du site). */
  var DONNEES = {
  "competences": [
    {
      "code": "T1",
      "slug": "developpement-web-full-stack",
      "nom": "Développement web full-stack (PHP, MySQL, JavaScript)",
      "court": "Développement web"
    },
    {
      "code": "T2",
      "slug": "architecture-logicielle-modelisation-donnees",
      "nom": "Conception d'architectures logicielles et modélisation de données",
      "court": "Architectures & données"
    },
    {
      "code": "T3",
      "slug": "ingenierie-donnees-pipelines-etl",
      "nom": "Ingénierie de données et pipelines ETL (SSIS, Python)",
      "court": "Ingénierie de données"
    },
    {
      "code": "T4",
      "slug": "integration-personnalisation-wordpress",
      "nom": "Intégration et personnalisation WordPress",
      "court": "WordPress"
    },
    {
      "code": "T5",
      "slug": "exploitation-supervision-qualite-donnees",
      "nom": "Exploitation, supervision et qualité des données",
      "court": "Exploitation & qualité"
    },
    {
      "code": "H1",
      "slug": "autonomie-auto-formation",
      "nom": "Autonomie et capacité d'auto-formation",
      "court": "Autonomie"
    },
    {
      "code": "H2",
      "slug": "ecoute-traduction-besoins-metier",
      "nom": "Écoute et traduction des besoins métier en solutions",
      "court": "Écoute métier"
    },
    {
      "code": "H3",
      "slug": "coordination-animation-collectifs",
      "nom": "Coordination et animation de collectifs",
      "court": "Coordination"
    },
    {
      "code": "H4",
      "slug": "relation-client-sens-du-service",
      "nom": "Relation client et sens du service",
      "court": "Relation client"
    },
    {
      "code": "H5",
      "slug": "pensee-reflexive-autocritique",
      "nom": "Pensée réflexive et autocritique",
      "court": "Autocritique"
    }
  ],
  "realisations": [
    {
      "code": "R1",
      "slug": "plateforme-recouvrement-facturation",
      "nom": "Plateforme de recouvrement de facturation pour un groupe de santé",
      "court": "Recouvrement santé"
    },
    {
      "code": "R2",
      "slug": "migration-pipeline-ssis-python",
      "nom": "Modernisation d'un pipeline de données : migration SSIS vers Python",
      "court": "Migration SSIS → Python"
    },
    {
      "code": "R3",
      "slug": "plateforme-multi-sites-paroissiale",
      "nom": "Plateforme web multi-sites pour un réseau paroissial",
      "court": "Multi-sites paroissial"
    },
    {
      "code": "R4",
      "slug": "prestation-web-independante",
      "nom": "Activité de prestation web indépendante",
      "court": "Prestation web"
    },
    {
      "code": "R5",
      "slug": "analyse-donnees-datavisualisation",
      "nom": "Analyse de données et datavisualisation : un classement comparatif de candidats",
      "court": "Datavisualisation"
    }
  ],
  "liens": [
    [
      "T1",
      "R1"
    ],
    [
      "T1",
      "R3"
    ],
    [
      "T1",
      "R4"
    ],
    [
      "T2",
      "R1"
    ],
    [
      "T2",
      "R2"
    ],
    [
      "T2",
      "R3"
    ],
    [
      "T3",
      "R2"
    ],
    [
      "T3",
      "R5"
    ],
    [
      "T4",
      "R4"
    ],
    [
      "T5",
      "R1"
    ],
    [
      "T5",
      "R2"
    ],
    [
      "H1",
      "R1"
    ],
    [
      "H1",
      "R2"
    ],
    [
      "H1",
      "R3"
    ],
    [
      "H1",
      "R4"
    ],
    [
      "H1",
      "R5"
    ],
    [
      "H2",
      "R1"
    ],
    [
      "H2",
      "R3"
    ],
    [
      "H2",
      "R4"
    ],
    [
      "H3",
      "R3"
    ],
    [
      "H4",
      "R4"
    ],
    [
      "H5",
      "R1"
    ],
    [
      "H5",
      "R2"
    ],
    [
      "H5",
      "R5"
    ]
  ]
};

  var mouvementReduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Bascule de thème ---------- */
  function initTheme() {
    var bouton = document.getElementById("bouton-theme");
    if (!bouton) { return; }
    bouton.addEventListener("click", function () {
      var racine = document.documentElement;
      var clair = racine.getAttribute("data-theme") === "clair";
      if (clair) {
        racine.removeAttribute("data-theme");
      } else {
        racine.setAttribute("data-theme", "clair");
      }
      try { localStorage.setItem("theme", clair ? "sombre" : "clair"); } catch (e) { /* stockage indisponible */ }
    });
  }

  /* ---------- Menu : burger et sous-menus ---------- */
  function initMenu() {
    var burger = document.querySelector(".burger");
    var menu = document.getElementById("menu-principal");
    if (burger && menu) {
      burger.addEventListener("click", function () {
        var ouvert = menu.classList.toggle("ouvert");
        burger.setAttribute("aria-expanded", ouvert ? "true" : "false");
      });
    }

    var items = document.querySelectorAll(".a-sous-menu");
    Array.prototype.forEach.call(items, function (item) {
      var bouton = item.querySelector(".bouton-sous-menu");
      if (!bouton) { return; }
      bouton.addEventListener("click", function () {
        var dejaOuvert = item.getAttribute("data-ouvert") === "vrai";
        /* On referme les autres sous-menus avant d'ouvrir celui-ci. */
        Array.prototype.forEach.call(items, function (autre) {
          autre.removeAttribute("data-ouvert");
          var b = autre.querySelector(".bouton-sous-menu");
          if (b) { b.setAttribute("aria-expanded", "false"); }
        });
        if (!dejaOuvert) {
          item.setAttribute("data-ouvert", "vrai");
          bouton.setAttribute("aria-expanded", "true");
        }
      });
    });

    /* Fermeture au clic hors du menu et à la touche Échap. */
    document.addEventListener("click", function (evt) {
      Array.prototype.forEach.call(items, function (item) {
        if (!item.contains(evt.target)) {
          item.removeAttribute("data-ouvert");
          var b = item.querySelector(".bouton-sous-menu");
          if (b) { b.setAttribute("aria-expanded", "false"); }
        }
      });
    });

    document.addEventListener("keydown", function (evt) {
      if (evt.key !== "Escape") { return; }
      Array.prototype.forEach.call(items, function (item) {
        item.removeAttribute("data-ouvert");
        var b = item.querySelector(".bouton-sous-menu");
        if (b) { b.setAttribute("aria-expanded", "false"); }
      });
      if (menu && menu.classList.contains("ouvert")) {
        menu.classList.remove("ouvert");
        if (burger) { burger.setAttribute("aria-expanded", "false"); burger.focus(); }
      }
    });
  }

  /* ---------- Apparition au défilement ---------- */
  function initApparitions() {
    var elements = document.querySelectorAll(".apparition");
    if (!elements.length) { return; }
    if (mouvementReduit || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(elements, function (el) { el.classList.add("visible"); });
      return;
    }
    var observateur = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (entree) {
        if (entree.isIntersecting) {
          entree.target.classList.add("visible");
          observateur.unobserve(entree.target);
        }
      });
    }, { threshold: 0.15 });
    Array.prototype.forEach.call(elements, function (el) { observateur.observe(el); });
  }

  /* ---------- Filtres de la page compétences ---------- */
  function initFiltres() {
    var boutons = document.querySelectorAll(".filtre");
    if (!boutons.length) { return; }
    var cibles = document.querySelectorAll("[data-domaine]");
    var sections = document.querySelectorAll("[data-section-domaine]");
    Array.prototype.forEach.call(boutons, function (bouton) {
      bouton.addEventListener("click", function () {
        var filtre = bouton.getAttribute("data-filtre");
        Array.prototype.forEach.call(boutons, function (b) {
          b.setAttribute("aria-pressed", b === bouton ? "true" : "false");
        });
        Array.prototype.forEach.call(cibles, function (cible) {
          var visible = filtre === "tous" || cible.getAttribute("data-domaine") === filtre;
          cible.classList.toggle("masque-filtre", !visible);
        });
        Array.prototype.forEach.call(sections, function (section) {
          var visible = filtre === "tous" || section.getAttribute("data-section-domaine") === filtre;
          section.classList.toggle("masque-filtre", !visible);
        });
      });
    });
  }

  /* ---------- Détails de la frise du parcours ---------- */
  function initDialogues() {
    var boutons = document.querySelectorAll("[data-dialogue]");
    if (!boutons.length) { return; }
    Array.prototype.forEach.call(boutons, function (bouton) {
      var dialogue = document.getElementById(bouton.getAttribute("data-dialogue"));
      if (!dialogue) { return; }
      bouton.addEventListener("click", function () {
        if (typeof dialogue.showModal === "function") {
          dialogue.showModal();
        } else {
          dialogue.setAttribute("open", "open");
        }
      });
    });
    Array.prototype.forEach.call(document.querySelectorAll(".fermer-dialogue"), function (bouton) {
      bouton.addEventListener("click", function () {
        var dialogue = bouton.closest("dialog");
        if (dialogue) { dialogue.close ? dialogue.close() : dialogue.removeAttribute("open"); }
      });
    });
    /* Fermeture au clic sur l'arrière-plan. */
    Array.prototype.forEach.call(document.querySelectorAll("dialog.detail-etape"), function (dialogue) {
      dialogue.addEventListener("click", function (evt) {
        if (evt.target === dialogue && dialogue.close) { dialogue.close(); }
      });
    });
  }

  /* ---------- Formulaire de contact ---------- */
  function initFormulaire() {
    var formulaire = document.getElementById("formulaire-contact");
    if (!formulaire) { return; }
    var message = document.getElementById("message-formulaire");

    function erreurDe(champ) {
      return document.getElementById("erreur-" + champ.id);
    }

    function valider(champ) {
      var zone = erreurDe(champ);
      var texte = "";
      if (champ.validity.valueMissing) {
        texte = "Ce champ est obligatoire.";
      } else if (champ.validity.typeMismatch && champ.type === "email") {
        texte = "Merci d'indiquer une adresse e-mail valide.";
      } else if (champ.validity.tooShort) {
        texte = "Ce message est un peu court (" + champ.minLength + " caractères minimum).";
      }
      if (zone) { zone.textContent = texte; }
      return texte === "";
    }

    Array.prototype.forEach.call(formulaire.querySelectorAll("input:not([type=hidden]), textarea"), function (champ) {
      champ.addEventListener("blur", function () { valider(champ); });
    });

    formulaire.addEventListener("submit", function (evt) {
      evt.preventDefault();
      /* Champ pot de miel : un humain ne le voit pas, un robot le remplit. */
      var miel = formulaire.querySelector("[name=site_web]");
      if (miel && miel.value !== "") { return; }

      var valide = true;
      Array.prototype.forEach.call(formulaire.querySelectorAll("[required]"), function (champ) {
        if (!valider(champ)) { valide = false; }
      });
      if (!valide) {
        if (message) {
          message.textContent = "Certains champs demandent une correction avant l'envoi.";
          message.classList.remove("succes");
        }
        return;
      }

      var nom = document.getElementById("champ-nom").value.trim();
      var email = document.getElementById("champ-email").value.trim();
      var sujet = document.getElementById("champ-sujet").value.trim();
      var corps = document.getElementById("champ-message").value.trim() +
        "\n\n— " + nom + " (" + email + ")";
      window.location.href = "mailto:rai.patrice.pro@gmail.com" +
        "?subject=" + encodeURIComponent("[Portfolio] " + sujet) +
        "&body=" + encodeURIComponent(corps);
      if (message) {
        message.textContent = "Votre logiciel de messagerie va s'ouvrir avec le message prérempli. Merci !";
        message.classList.add("succes");
      }
    });
  }

  /* ---------- Diaporamas (une image à la fois, flèches de navigation) ---------- */
  function initDiaporamas() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-diaporama]"), function (diaporama) {
      var vues = diaporama.querySelectorAll("figure");
      var precedent = diaporama.querySelector(".fleche-prec");
      var suivant = diaporama.querySelector(".fleche-suiv");
      if (vues.length < 2) {
        if (precedent) { precedent.style.display = "none"; }
        if (suivant) { suivant.style.display = "none"; }
        return;
      }
      var courant = 0;
      function montrer(i) {
        courant = (i + vues.length) % vues.length;
        Array.prototype.forEach.call(vues, function (vue, j) {
          vue.classList.toggle("actif", j === courant);
        });
      }
      if (precedent) { precedent.addEventListener("click", function () { montrer(courant - 1); }); }
      if (suivant) { suivant.addEventListener("click", function () { montrer(courant + 1); }); }
    });
  }

  /* ---------- Visionneuse d'images (clic pour agrandir, flèches pour défiler) ---------- */
  function initVisionneuse() {
    var liens = Array.prototype.slice.call(document.querySelectorAll("a.zoom-image"));
    if (!liens.length) { return; }

    var chevronGauche = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>';
    var chevronDroit = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>';

    var dialogue = document.createElement("dialog");
    dialogue.className = "visionneuse";
    dialogue.innerHTML =
      '<button class="fermer-visionneuse" type="button" aria-label="Fermer l\'aperçu">✕</button>' +
      '<img alt="">' +
      '<p class="legende-visionneuse"></p>' +
      '<button class="fleche-visionneuse prec" type="button" aria-label="Image précédente">' + chevronGauche + '</button>' +
      '<button class="fleche-visionneuse suiv" type="button" aria-label="Image suivante">' + chevronDroit + '</button>';
    document.body.appendChild(dialogue);

    var image = dialogue.querySelector("img");
    var legende = dialogue.querySelector(".legende-visionneuse");
    var precedent = dialogue.querySelector(".prec");
    var suivant = dialogue.querySelector(".suiv");
    var indexCourant = 0;

    if (liens.length < 2) {
      precedent.style.display = "none";
      suivant.style.display = "none";
    }

    function afficher(i) {
      indexCourant = (i + liens.length) % liens.length;
      var lien = liens[indexCourant];
      var vignette = lien.querySelector("img");
      image.src = lien.getAttribute("href");
      image.alt = vignette ? vignette.alt : "";
      var figure = lien.closest("figure");
      var figcaption = figure ? figure.querySelector("figcaption") : null;
      legende.textContent = figcaption ? figcaption.textContent : (vignette ? vignette.alt : "");
    }

    dialogue.querySelector(".fermer-visionneuse").addEventListener("click", function () {
      dialogue.close();
    });
    precedent.addEventListener("click", function () { afficher(indexCourant - 1); });
    suivant.addEventListener("click", function () { afficher(indexCourant + 1); });
    /* Fermeture au clic sur l'arrière-plan (Échap est géré nativement) ;
       défilement aux flèches du clavier. */
    dialogue.addEventListener("click", function (evt) {
      if (evt.target === dialogue) { dialogue.close(); }
    });
    dialogue.addEventListener("keydown", function (evt) {
      if (evt.key === "ArrowLeft") { afficher(indexCourant - 1); }
      if (evt.key === "ArrowRight") { afficher(indexCourant + 1); }
    });

    liens.forEach(function (lien, i) {
      lien.addEventListener("click", function (evt) {
        /* Repli sans showModal : le lien ouvre l'image telle quelle. */
        if (typeof dialogue.showModal !== "function") { return; }
        evt.preventDefault();
        afficher(i);
        dialogue.showModal();
      });
    });
  }

  /* ---------- Constellation compétences ↔ réalisations ---------- */

  var SVG_NS = "http://www.w3.org/2000/svg";

  function creerSvg(nom, attributs) {
    var el = document.createElementNS(SVG_NS, nom);
    Object.keys(attributs).forEach(function (cle) { el.setAttribute(cle, attributs[cle]); });
    return el;
  }

  function liensDe(code) {
    return DONNEES.liens.filter(function (l) { return l[0] === code || l[1] === code; });
  }

  function construireConstellation(conteneur) {
    var prefixe = conteneur.getAttribute("data-prefixe") || "";
    var focus = conteneur.getAttribute("data-focus") || null;

    var competences = DONNEES.competences;
    var realisations = DONNEES.realisations;
    var liens = DONNEES.liens;

    if (focus) {
      /* Mini-constellation : le nœud courant et ses seuls liens. */
      liens = liensDe(focus);
      var codesVisibles = {};
      codesVisibles[focus] = true;
      liens.forEach(function (l) { codesVisibles[l[0]] = true; codesVisibles[l[1]] = true; });
      competences = competences.filter(function (c) { return codesVisibles[c.code]; });
      realisations = realisations.filter(function (r) { return codesVisibles[r.code]; });
    }

    var largeur = 900;
    var gauche = 210;
    var droite = 690;
    var pas = focus ? 64 : 56;
    var lignes = Math.max(competences.length, realisations.length);
    var hauteur = Math.max(240, lignes * pas + 60);

    function ordonnees(nombre) {
      var positions = [];
      var espace = hauteur / (nombre + 1);
      for (var i = 1; i <= nombre; i += 1) { positions.push(Math.round(espace * i)); }
      return positions;
    }

    var svg = creerSvg("svg", {
      viewBox: "0 0 " + largeur + " " + hauteur,
      role: "img",
      "aria-label": "Schéma reliant les compétences aux réalisations qui les mettent en œuvre"
    });

    var positions = {};
    var yCompetences = ordonnees(competences.length);
    var yRealisations = ordonnees(realisations.length);
    competences.forEach(function (c, i) { positions[c.code] = { x: gauche, y: yCompetences[i] }; });
    realisations.forEach(function (r, i) { positions[r.code] = { x: droite, y: yRealisations[i] }; });

    /* Arêtes d'abord (sous les nœuds). */
    var groupeAretes = creerSvg("g", {});
    liens.forEach(function (l) {
      var a = positions[l[0]];
      var b = positions[l[1]];
      if (!a || !b) { return; }
      var arete = creerSvg("line", {
        x1: a.x + 14, y1: a.y, x2: b.x - 14, y2: b.y,
        "class": "arete", "data-de": l[0], "data-vers": l[1]
      });
      if (!mouvementReduit) {
        var longueur = Math.hypot(b.x - a.x - 28, b.y - a.y);
        arete.style.strokeDasharray = longueur;
        arete.style.strokeDashoffset = longueur;
        arete.style.transition = "stroke-dashoffset 1.2s ease " + (Math.random() * 0.25) + "s";
      }
      groupeAretes.appendChild(arete);
    });
    svg.appendChild(groupeAretes);

    function creerNoeud(donnee, type) {
      var pos = positions[donnee.code];
      var estCompetence = type === "competence";
      var page = estCompetence ? "competences/" : "realisations/";
      var lien = creerSvg("a", { href: prefixe + page + donnee.slug + ".html" });
      lien.setAttribute("class", "noeud" + (focus === donnee.code ? " actif" : ""));
      lien.setAttribute("data-code", donnee.code);
      var titre = creerSvg("title", {});
      titre.textContent = donnee.nom + (estCompetence ? " — voir la compétence" : " — voir la réalisation");
      lien.appendChild(titre);
      lien.appendChild(creerSvg("circle", { cx: pos.x, cy: pos.y, r: 9 }));
      var code = creerSvg("text", {
        x: pos.x, y: pos.y + 3.5, "text-anchor": "middle", "class": "code-noeud"
      });
      code.textContent = donnee.code;
      lien.appendChild(code);
      var etiquette = creerSvg("text", {
        x: estCompetence ? pos.x - 18 : pos.x + 18,
        y: pos.y + 4,
        "text-anchor": estCompetence ? "end" : "start"
      });
      etiquette.textContent = donnee.court;
      lien.appendChild(etiquette);

      function activer() {
        var codesLies = {};
        liensDe(donnee.code).forEach(function (l) { codesLies[l[0]] = true; codesLies[l[1]] = true; });
        Array.prototype.forEach.call(svg.querySelectorAll(".arete"), function (arete) {
          var concernee = arete.getAttribute("data-de") === donnee.code || arete.getAttribute("data-vers") === donnee.code;
          arete.classList.toggle("active", concernee);
          arete.classList.toggle("estompee", !concernee);
        });
        Array.prototype.forEach.call(svg.querySelectorAll(".noeud"), function (noeud) {
          var codeNoeud = noeud.getAttribute("data-code");
          noeud.classList.toggle("estompe", codeNoeud !== donnee.code && !codesLies[codeNoeud]);
        });
      }

      function desactiver() {
        Array.prototype.forEach.call(svg.querySelectorAll(".arete"), function (arete) {
          arete.classList.remove("active", "estompee");
        });
        Array.prototype.forEach.call(svg.querySelectorAll(".noeud"), function (noeud) {
          noeud.classList.remove("estompe");
        });
      }

      lien.addEventListener("mouseenter", activer);
      lien.addEventListener("mouseleave", desactiver);
      lien.addEventListener("focus", activer);
      lien.addEventListener("blur", desactiver);
      return lien;
    }

    competences.forEach(function (c) { svg.appendChild(creerNoeud(c, "competence")); });
    realisations.forEach(function (r) { svg.appendChild(creerNoeud(r, "realisation")); });

    conteneur.appendChild(svg);

    /* Tracé progressif des lignes, une seule fois, au chargement. */
    if (!mouvementReduit) {
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          Array.prototype.forEach.call(svg.querySelectorAll(".arete"), function (arete) {
            arete.style.strokeDashoffset = "0";
          });
        });
      });
    }
  }

  function initConstellations() {
    var conteneurs = document.querySelectorAll("[data-constellation]");
    Array.prototype.forEach.call(conteneurs, function (c) { construireConstellation(c); });
  }

  /* ---------- Lancement ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initMenu();
    initApparitions();
    initFiltres();
    initDialogues();
    initFormulaire();
    initDiaporamas();
    initVisionneuse();
    initConstellations();
  });
}());
