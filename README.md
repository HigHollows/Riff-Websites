# RIFF — site vitrine

Agence indépendante de booking, de management et d'accompagnement d'artistes rock et metal (Auvergne-Rhône-Alpes).

## Commandes

```bash
npm install
npm run dev        # développement
npm run build      # typecheck + build de production (dist/)
npm run preview    # prévisualiser le build
```

## Ce qui reste à renseigner

| Élément | Où | État |
|---|---|---|
| Email de réception | `src/config/site.ts` → `contact.email` | `null` |
| Endpoint de formulaire (optionnel) | variable `VITE_FORM_ENDPOINT` ou `contact.formEndpoint` | `null` |
| Téléphone, ville | `src/config/site.ts` → `contact.phone`, `contact.city` | `null` |
| Réseaux sociaux | `src/config/site.ts` → `socials` | vide |
| Mentions légales, confidentialité | `src/config/site.ts` → `legal` | `null` |
| Roster | `src/data/artists.ts` | vide (ne rien inventer) |
| Photographies live | `public/` + `artists.ts` / hero | visuels générés de démonstration |
| URL du site (canonical, og:url, og:image) | variable `VITE_SITE_URL` | non définie |

## Formulaire de contact

Ordre de priorité : endpoint (POST JSON) > `mailto:` > message explicite « non relié ». Aucun envoi n'est simulé.

## Ajouter un groupe

Ajouter un objet dans `src/data/artists.ts` (nom, genre, description, image avec crédit, liens). Tant que le tableau est vide, la section affiche l'état « roster en construction ». En dev, `?roster=preview` affiche des données fictives pour tester la mise en page.

## Pages et routage

Deux pages : `/` (`src/pages/Home.tsx`) et `/smalf` (`src/pages/Smalf.tsx`). Le routage est un petit module maison (`src/router.tsx`, history API, aucune dépendance).
Pour ajouter une page : créer `src/pages/<Nom>.tsx`, la déclarer dans `routes` (`src/App.tsx`), copier `smalf/index.html` en `<nom>/index.html` (titre, description et Open Graph propres, utiles aux robots et aux partages), l'ajouter à `build.rollupOptions.input` (`vite.config.ts`), puis l'ajouter dans `src/config/navigation.ts`.

## SMALF — Scène Musicale À La Française

Contenu de la page : `src/data/smalf.ts` (textes, objectifs, piliers, pistes d'action). Rien n'y affirme de résultat ni de partenariat : les éléments non confirmés sont des « ambitions ».
Pour annoncer un artiste ou une initiative réellement associés à SMALF, ajouter un objet à `smalfInitiatives` : la section bascule d'« Une scène en construction » à « Les initiatives SMALF ».

## Design

Tokens (couleurs, polices, espacements, durées, courbes) : `src/styles/tokens.css`. Polices auto-hébergées (Climate Crisis, Hanken Grotesk, DM Mono) via `@fontsource` : aucune requête tierce.
