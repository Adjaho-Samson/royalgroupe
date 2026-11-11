# Royal Group — site vitrine

Site d'une seule page pour **Royal Group** (concerts, spectacles, soirées festives, grandes rencontres) :
accueil, à propos, événements passés, prochains événements, réservation par WhatsApp et contact.

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

### Numéro WhatsApp — à faire en premier

```js
const WHATSAPP_NUMBER = "";   // format international, sans espace ni « + ». Ex. : "229XXXXXXXXXX"
```

Tant que cette valeur est vide, le site est en **mode démonstration** : les boutons ouvrent
WhatsApp avec le message prérempli mais sans destinataire, et un message l'indique au visiteur.
Dès que le numéro est renseigné, tous les boutons de réservation et de contact pointent vers lui.

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

## 4. Contenu de démonstration — à remplacer

- **Événements :** les cinq événements fournis sont des exemples (noms, dates, lieux et tarifs
  fictifs). Ils portent `demo: true` et s'affichent avec l'étiquette « Démo ».
  Remplacez-les par les événements officiels, sans la ligne `demo`.
  Les deux exemples « à venir » (27 février et 15 mai 2027) passeront d'eux-mêmes
  dans les événements passés après ces dates.
- **Photos :** tous les visuels sont des **images d'illustration générées par IA**,
  pas des photos d'événements Royal Group. Remplacez-les par de vraies photos dès que possible.
- **Coordonnées :** renseignées (téléphone / WhatsApp : +229 01 44 60 39 10, e-mail : duhameldemesse@gmail.com, page Facebook).
  Instagram et les autres réseaux restent vides : le site affiche « Bientôt disponible » à leur place.

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
