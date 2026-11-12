# Royal Group — site vitrine

Site d'une seule page pour **Royal Group** (concerts, spectacles, soirées festives, grandes rencontres) :
accueil, à propos, événements passés, prochains événements, réservation par WhatsApp, contact et partenariat MAFLYT.

Le site est écrit en HTML, CSS et JavaScript simples : **aucune installation, aucune dépendance**.

---

## 1. Ouvrir le site

- **Le plus simple :** double-cliquez sur `index.html`.
- **Ou avec un petit serveur local** (depuis ce dossier) :

  ```bash
  python3 -m http.server 8080
  ```

  puis ouvrez <http://localhost:8080>.

## 2. Organisation des fichiers

```
index.html            Structure et textes de la page
css/style.css         Mise en forme (20 parties commentées, sommaire en tête de fichier)
js/script.js          Configuration, événements et interactions
assets/
  images/             Photos du Hero et de la section « À propos », image de partage
  events/             Photos et affiches des événements
  logo/               Logo, symbole, favicons
  fonts/              Polices (hébergées avec le site) et leurs licences
  videos/             Emplacement pour une vidéo d'arrière-plan (facultatif)
```

## 3. Mettre le site à jour

Presque tout se règle **en haut du fichier `js/script.js`** (parties 1 et 2).

### Numéro WhatsApp

```js
const WHATSAPP_NUMBER = "2290144603910";   // format international, sans espace ni « + »
```

Les boutons de réservation et de contact utilisent ce numéro. Le message propre à chaque action
est prérempli et encodé dans l’URL WhatsApp.

### Coordonnées

Objet `CONTACT` : téléphone, e-mail, Facebook, Instagram, autres réseaux.
Une valeur laissée vide (`""`) affiche « Bientôt disponible ».

### Messages WhatsApp

Objet `WHATSAPP_MESSAGES`. Dans le message `event`, le repère `{event}` est remplacé
par le nom de l'événement choisi.

### Événements

Un seul tableau, `EVENTS`, pour tous les événements. Le classement est automatique :

- date à venir (ou date vide) → « Nos prochains événements » ;
- date passée → « Nos événements passés » (bascule le lendemain de l'événement).

Le premier événement à venir est mis en avant (compte à rebours, rappel dans l'accueil).

```js
{
  id: "concert-nouvel-an",            // unique, sans espace ni accent
  title: "Nom de l'événement",
  category: "Concert",
  date: "2027-12-31",                 // AAAA-MM-JJ, ou "" si la date n'est pas fixée
  endDate: "",                        // facultatif : dernier jour
  time: "21:00",                      // facultatif
  location: "Lieu",
  description: "Courte description.",
  image: "assets/events/mon-affiche.webp",
  thumb: "",                          // facultatif : version réduite
  imageAlt: "Description de l'image",
  gallery: [],                        // facultatif : photos supplémentaires (galerie agrandie)
  tickets: [{ name: "Standard", price: "5 000 FCFA" }],
  ticketNote: ""                      // facultatif
}
```

### Textes

Dans `index.html`, les passages à personnaliser sont repérés par le commentaire
`<!-- TEXTE MODIFIABLE … -->`.

### Images

- Déposez vos photos dans `assets/events/` (événements) ou `assets/images/` (accueil, à propos),
  puis indiquez leur chemin dans `EVENTS` ou dans `index.html`.
- Formats acceptés : `.webp`, `.jpg`, `.png`. Visez moins de 300 Ko par image
  (environ 1 000 px de large pour une affiche, 1 920 px pour le Hero).

### Vidéo d'arrière-plan (facultatif)

Placez un fichier dans `assets/videos/` et renseignez `SETTINGS.heroVideo`
(ex. `"assets/videos/hero.mp4"`). Vide = la photographie est conservée.

### Couleurs et polices

Variables au début de `css/style.css` (partie « Variables »).

## 4. Événement et contenus actuels

- **Événement à venir :** SUMMER NIGHT, le 31 décembre 2026 à 22 h au Terrain Classico Barça Réal,
  Porto-Novo. La programmation, les quatre contacts de réservation et le passe unique à 1 000 FCFA
  sont configurés dans `EVENTS`. Le site classe automatiquement l’événement, affiche le compte à
  rebours et prépare la réservation WhatsApp. Les événements passés restent vides jusqu’à la
  publication de souvenirs.
- **Visuels :** les images de fond et les photos d’illustration du site restent des illustrations.
  Les affiches SUMMER NIGHT et le flyer de promotion MAFLYT sont des visuels officiels, et non des
  photographies d’illustration. Leurs fichiers optimisés sont attendus sous `assets/events/`
  (`summer-night.webp`, `summer-night-vignette.webp`) et `assets/images/`
  (`maflyt-promotion.webp`).
- **Partenariat MAFLYT :** la section 07 présente la promotion d’ordinateurs, les huit tarifs,
  les coordonnées de MAFLYT et son flyer. Le bouton principal ouvre WhatsApp au numéro Royal Group
  avec le message « Je viens de la part de ROYAL GROUPE ».
- **Coordonnées Royal Group :** téléphone / WhatsApp : +229 01 44 60 39 10, e-mail :
  duhameldemesse@gmail.com, page Facebook. Instagram et les autres réseaux restent vides ; le site
  affiche « Bientôt disponible » à leur place.

## 5. Mise en ligne

Le dossier se dépose tel quel sur n'importe quel hébergement statique
(GitHub Pages, Netlify, hébergement mutualisé…).

Après la mise en ligne, dans l'en-tête de `index.html`, remplacez le chemin de l'image de partage
par son adresse complète, sinon l'aperçu ne s'affichera pas sur WhatsApp et les réseaux sociaux :

```html
<meta property="og:image" content="https://votre-domaine.com/assets/images/partage-royal-group.jpg">
```

## 6. Crédits

- **Polices :** Anton, Manrope et Playfair Display — licence SIL Open Font License 1.1
  (textes dans `assets/fonts/`).
- **Icônes :** [Lucide](https://lucide.dev) (licence ISC) ; logos de marques issus de
  [Simple Icons](https://simpleicons.org) (CC0 1.0) — ces logos restent la propriété de leurs marques.
