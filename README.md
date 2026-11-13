# Royal Group — site vitrine

Site d'une seule page pour **Royal Group** (concerts, spectacles, soirées festives, grandes rencontres) :
accueil, à propos, événements passés, prochains événements, réservation par WhatsApp, contact et
partenariat MAFLYT (ordinateurs en promotion + formations informatiques).

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
css/style.css         Mise en forme
js/script.js          Configuration, événements et interactions
assets/
  images/             Photos du Hero, de la section « À propos », image de partage, flyers MAFLYT
  events/             Photos et affiches des événements
  logo/               Logo, symbole, favicons
  fonts/              Polices (hébergées avec le site) et leurs licences
  videos/             Emplacement pour une vidéo d'arrière-plan (facultatif)
```

## 3. Mettre le site à jour

Presque tout se règle **en tête du fichier `js/script.js`** (le bloc de configuration).

### Numéro WhatsApp

```js
const WHATSAPP_NUMBER = "2290144603910";   // format international, sans espace ni « + »
```

Les boutons de réservation et de contact utilisent ce numéro. Le message propre à chaque action
est prérempli et encodé dans l’URL WhatsApp.

Un bouton peut viser un autre numéro (cas du partenaire) avec l’attribut `data-whatsapp-number` :

```html
<a href="https://wa.me/2290146834697" data-whatsapp="maflytFormations" data-whatsapp-number="2290146834697">
```

Le message reste lu dans `WHATSAPP_MESSAGES` ; seul le destinataire change.

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

Les textes sont écrits directement dans `index.html`, une section par bloc
(`#accueil`, `#a-propos`, `#evenements-passes`, `#prochains-evenements`, `#reservation`,
`#contact`, `#partenariat-maflyt`). Les tarifs et les programmes MAFLYT de la section 07
viennent des flyers officiels : pensez à les actualiser à chaque nouvelle promotion.

### Images

- Déposez vos photos dans `assets/events/` (événements) ou `assets/images/` (accueil, à propos),
  puis indiquez leur chemin dans `EVENTS` ou dans `index.html`.
- Formats acceptés : `.webp`, `.jpg`, `.png`. Visez moins de 300 Ko par image
  (environ 1 000 px de large pour une affiche, 1 920 px pour le Hero).
- Les affiches et les flyers sont des visuels officiels : ils ne sont **pas recadrés**, seulement
  compressés. Les cartes d’événement étant plus larges que les affiches, une affiche carrée est
  posée sur un fond flouté (bandes hautes et basses) plutôt que rognée.

Recette utilisée pour régénérer un visuel (ImageMagick) :

```bash
# compression simple d'un flyer
convert entree.jpg -colorspace sRGB -strip -quality 80 -define webp:method=6 sortie.webp

# affiche carrée -> format 4:5 des cartes, sur fond flouté
convert entree.jpg -colorspace sRGB -strip -resize 928x928 poster.png
convert entree.jpg -colorspace sRGB -resize 928x1160^ -gravity center -extent 928x1160 \
  -blur 0x22 -evaluate multiply 0.55 fond.png
convert fond.png poster.png -gravity center -composite -quality 82 \
  -define webp:method=6 assets/events/summer-night.webp
```

### Vidéo d'arrière-plan (facultatif)

Placez un fichier dans `assets/videos/` et renseignez `SETTINGS.heroVideo`
(ex. `"assets/videos/hero.mp4"`). Vide = la photographie est conservée.

### Couleurs et polices

Variables au début de `css/style.css` (partie « Variables »).

## 4. Événement et contenus actuels

- **Événement à venir :** SUMMER NIGHT, le 31 décembre 2026 à 22 h au Terrain Classico Barça Réal,
  Porto-Novo. La programmation, les quatre contacts de réservation et le passe unique à 1 000 FCFA
  sont configurés dans `EVENTS`. Le site classe automatiquement l’événement, affiche le compte à
  rebours et prépare la réservation WhatsApp ; à moins de 30 jours de la date, la carte ajoute
  seule la pastille « Bientôt ». Les événements passés restent vides jusqu’à la publication de
  souvenirs.
- **Visuels officiels intégrés :** les quatre flyers fournis ont été compressés et déposés dans le
  site (plus aucune image « attendue »).
  - `assets/events/summer-night.webp` — affiche « Tout le monde sera au Summer Night » (carrée,
    posée sur fond flouté au format 4:5 des cartes) : carte mise en avant et galerie.
  - `assets/events/summer-night-vignette.webp` — même affiche en 640 px : miniature de l’accueil.
  - `assets/events/summer-night-affiche-bis.webp` — seconde affiche officielle (« Entrée 1000 F »,
    DJ LIBOZO, MCI KARL et LiLä), consultable en grand depuis la carte.
  - `assets/images/maflyt-promotion.webp` et `assets/images/maflyt-formations.webp` — les deux
    flyers MAFLYT (promotion des ordinateurs, formations + catalogue).
  Les images de fond et les photos « À propos » restent des photographies d’illustration.
- **Partenariat MAFLYT :** la section 07 présente la promotion d’ordinateurs (les huit tarifs du
  flyer, prix barrés et prix promo), puis les **formations MAFLYT** : quatre filières (informatique,
  secrétariat bureautique, maintenance, sérigraphie), les parcours, les durées (3 / 6 / 12 mois),
  le rythme et les horaires, avec le flyer des formations à agrandir. Les deux flyers s’ouvrent en
  galerie ; le bouton principal ouvre WhatsApp au numéro Royal Group avec le message
  « Je viens de la part de ROYAL GROUPE », celui des formations au secrétariat MAFLYT
  (+229 01 46 83 46 97). Coordonnées reprises des deux flyers : comptoir +229 01 03 03 30 44 et
  +229 01 04 63 45 67 (maflyt4@gmail.com), secrétariat +229 01 43 20 20 44 (maflyt24@gmail.com,
  www.maflyt.net).
- **Coordonnées Royal Group :** téléphone / WhatsApp : +229 01 44 60 39 10, e-mail :
  duhameldemesse@gmail.com, page Facebook. Instagram et les autres réseaux restent vides ; le site
  affiche « Bientôt disponible » à leur place.

## 5. Mise en ligne

Le dossier se dépose tel quel sur n'importe quel hébergement statique
(GitHub Pages, Netlify, hébergement mutualisé…).

### Aperçu de partage (Open Graph)

L'adresse publique référencée dans `index.html` est **https://royalgroupe.vercel.app/**.
Les balises sont présentes dans le HTML initial : aucun JavaScript n'est nécessaire
pour les robots de WhatsApp, Facebook, LinkedIn ou X.

- `canonical` et `og:url` désignent l'accueil public.
- `og:title` / `og:description` et leurs équivalents `twitter:*` définissent le texte.
- `og:image`, `og:image:secure_url` et `twitter:image` utilisent la même URL HTTPS absolue.
- Le visuel `assets/images/partage-royal-group.jpg` est un JPEG **1200 × 630**
  (environ 140 Ko) : photographie du hero du site, **logo officiel**
  (`assets/logo/royal-group-logo.svg`) en haut à gauche et slogan de la marque en
  bas, dans la police Anton et les ors de la charte. Des textes alternatifs
  accompagnent Open Graph et X. Pour refaire ce visuel, repartez du logo et des
  polices du dossier `assets/` afin de rester fidèle à l'identité du site.

**En cas de changement de domaine**, mettez à jour les cinq URL ci-dessus dans
`index.html` (canonical, og:url et les trois références d'image). N'utilisez pas
l'adresse temporaire d'une prévisualisation. L'image doit rester publique, sans connexion,
et être servie avec le type `image/jpeg` ; la page doit être accessible aux robots.

Vérification locale (sans dépendance supplémentaire) :

```bash
python3 -m unittest discover -s tests -v
```

Après déploiement, vérifiez l'URL de la page dans le **Sharing Debugger de Facebook**
et le **Post Inspector de LinkedIn**, puis demandez une nouvelle collecte si un ancien
aperçu reste en cache. Testez aussi un nouveau partage WhatsApp. La présentation exacte
dépend de chaque application ; les anciens messages ne sont pas forcément actualisés.
Si le visuel est remplacé et reste en cache, utilisez un nouveau nom de fichier et
mettez à jour les trois références d'image ensemble.

## 6. Crédits

- **Polices :** Anton, Manrope et Playfair Display — licence SIL Open Font License 1.1
  (textes dans `assets/fonts/`).
- **Icônes :** [Lucide](https://lucide.dev) (licence ISC) ; logos de marques issus de
  [Simple Icons](https://simpleicons.org) (CC0 1.0) — ces logos restent la propriété de leurs marques.
