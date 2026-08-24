# Portfolio de Patrice RAÏ — Expert en Ingénierie du Logiciel (ISCOD)

Site statique multi-pages : **HTML5 + CSS3 + JavaScript vanilla**, sans framework ni
outil de build. Il peut être ouvert en local et hébergé tel quel sur GitHub Pages.

## Contenu du dossier

```
portfolio/
├── index.html               Accueil (accroche, constellation, appels à l'action)
├── presentation.html        Article de présentation générale
├── competences.html         Les 10 compétences (schéma comparatif + filtres)
├── competences/             1 page de détail par compétence (10 pages)
├── realisations.html        Les 5 réalisations (pavés)
├── realisations/            1 page de détail par réalisation (5 pages)
├── parcours.html            Frise antichronologique (pop-ups « Détail »)
├── contact.html             Coordonnées + formulaire (validation JS + honeypot)
├── css/style.css            Feuille de style unique (thème sombre/clair)
├── js/main.js               Menu, thème, filtres, pop-ups, constellation, formulaire
├── img/                     Photo, avatar, logos, illustrations (SVG)
├── favicon.ico              Icône du site
├── robots.txt / sitemap.xml Fichiers SEO
├── _generateur/             Sources du site (générateur Python + articles) — à garder
│                            sur votre ordinateur, inutile de le mettre en ligne
└── README.md                Ce guide
```

> `img/_sources/` contient les captures d'écran originales et la photo en pleine
> résolution : gardez ce dossier en local, il n'a pas besoin d'être mis en ligne.

> Pour modifier un texte du site : éditez le fichier correspondant dans
> `_generateur/content/`, puis lancez `python _generateur/build.py` — toutes les
> pages sont régénérées d'un coup, avec la typographie et les liens vérifiés.

## Avant la mise en ligne : 2 personnalisations

1. **La photo** — remplacez `img/photo.jpg` par votre vraie photo professionnelle
   (format carré conseillé, 600 × 600 pixels minimum, nom de fichier identique).
   En attendant, une image de substitution est en place et un avatar SVG prend
   le relais si le fichier venait à manquer.
2. **Les logos et captures** — les fichiers de `img/logos/` sont des monogrammes
   de substitution : remplacez-les par les vrais logos (mêmes noms de fichiers,
   format SVG ou PNG — si PNG, adaptez l'extension dans `parcours.html`).
   De même, remplacez les illustrations `img/realisations/*.svg` par vos vraies
   captures d'écran quand vous les aurez (mêmes noms de fichiers).

## Mettre le site en ligne sur GitHub Pages (recommandé, gratuit)

Le site est configuré pour `https://patrice-rai.github.io` : URL propre, hébergement
gratuit et illimité dans le temps, et un bon signal pour un profil de développeur.

### Étape 1 — Créer un compte GitHub

1. Allez sur [github.com](https://github.com) et cliquez sur **Sign up**.
2. Suivez les étapes (adresse e-mail, mot de passe, nom d'utilisateur).
   Vous avez déjà le compte **patrice-rai** : connectez-vous simplement.

### Étape 2 — Créer un dépôt (repository)

1. Une fois connecté, cliquez sur le bouton **+** en haut à droite, puis **New repository**.
2. Dans **Repository name**, tapez exactement : `patrice-rai.github.io` (votre nom
   d'utilisateur suivi de `.github.io` — c'est ce qui donne l'adresse racine
   `https://patrice-rai.github.io/`, celle pour laquelle le site est configuré).
3. Laissez le dépôt en **Public** (obligatoire pour GitHub Pages gratuit).
4. Ne cochez rien d'autre, puis cliquez sur **Create repository**.

> ⚠️ Au moment de l'envoi des fichiers, n'ajoutez jamais les dossiers `_generateur`
> ni `img/_sources` au dépôt : le dépôt est public, et ces dossiers contiennent
> vos sources de travail et les images non floutées.

### Étape 3 — Envoyer les fichiers du site

Le plus simple, sans rien installer :

1. Sur la page de votre nouveau dépôt, cliquez sur **uploading an existing file**
   (ou **Add file → Upload files**).
2. Ouvrez le dossier du portfolio sur votre ordinateur, sélectionnez **tout son
   contenu** (fichiers ET dossiers `css`, `js`, `img`, `competences`, `realisations`)
   **sauf** les dossiers `_generateur` et `img/_sources` (sources de travail, inutiles
   en ligne), puis glissez-déposez le tout dans la page GitHub.
3. Attendez la fin du transfert, écrivez un petit message en bas
   (par exemple « Première version du portfolio »), puis cliquez sur **Commit changes**.

### Étape 4 — Activer GitHub Pages

1. Dans votre dépôt, cliquez sur l'onglet **Settings** (roue dentée).
2. Dans le menu de gauche, cliquez sur **Pages**.
3. Dans **Build and deployment → Source**, choisissez **Deploy from a branch**.
4. Dans **Branch**, sélectionnez `main`, dossier `/ (root)`, puis **Save**.
5. Patientez 1 à 3 minutes, puis rechargez la page : l'adresse de votre site
   apparaît en haut (`https://patrice-rai.github.io/`).

### Étape 5 — Vérifier

1. Ouvrez l'adresse fournie et testez : le menu (y compris au défilement),
   les sous-menus Compétences et Réalisations, la constellation de l'accueil,
   les boutons « Détail » du parcours, le formulaire de contact, et l'affichage
   sur téléphone (menu burger).
2. Quelle que soit l'option retenue (Hostinger ou GitHub Pages), l'adresse du site
   dans `sitemap.xml`, `robots.txt` et les balises des pages doit correspondre à
   l'adresse réelle : réglez `SITE_URL` dans `_generateur/build.py` et relancez
   `python _generateur/build.py`.

### Mettre à jour le site plus tard

1. Retournez sur le dépôt → **Add file → Upload files**.
2. Glissez les fichiers modifiés (ils remplacent les anciens), puis **Commit changes**.
3. Le site se met à jour tout seul en une à deux minutes.

## Plus tard, avec un budget : un domaine personnalisé

Quand vous pourrez acheter un domaine (par exemple `patricerai.fr`, environ
5-10 € par an), deux options :

- **Rester sur GitHub Pages** (gratuit) : dans les réglages Pages du dépôt,
  renseignez le domaine dans « Custom domain », puis faites pointer le DNS du
  domaine vers GitHub (guide officiel : docs.github.com → Pages → Custom domain).
- **Passer sur Hostinger** : téléversez le contenu du dossier (sans `_generateur`
  ni `img/_sources`) dans `public_html` via le Gestionnaire de fichiers, activez
  le SSL Let's Encrypt et forcez le HTTPS.

Dans les deux cas, mettez à jour `SITE_URL` en tête de `_generateur/build.py`
avec la nouvelle adresse, relancez `python _generateur/build.py`, et renvoyez les
fichiers régénérés.

## Tester en local

Aucun serveur n'est nécessaire : double-cliquez simplement sur `index.html`
pour ouvrir le site dans votre navigateur.

## Notes techniques

- **Navigation circulaire** : toutes les listes « Réalisations rattachées » /
  « Compétences rattachées », les étiquettes cliquables et la constellation sont
  générées depuis une matrice unique de 24 liens — chaque lien existe dans les
  deux sens, aucun lien orphelin.
- **Accessibilité** : lien d'évitement, navigation clavier complète (y compris la
  constellation, dont chaque nœud est un vrai lien), `alt` sur toutes les images,
  `prefers-reduced-motion` respecté, contrastes AA.
- **Thème** : sombre par défaut, bascule clair/sombre mémorisée dans le navigateur.
- **Formulaire** : validation JavaScript + champ « pot de miel » antispam ; l'envoi
  ouvre votre logiciel de messagerie (solution 100 % statique, sans serveur).
