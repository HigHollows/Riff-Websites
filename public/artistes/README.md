# Médias des artistes

Un dossier par groupe : `public/artistes/<slug>/` (le slug est celui de `src/data/artists.ts`).

Exemple pour DEBATONIC (`public/artistes/debatonic/`) :
- `logo.svg` (ou `logo.png` fond transparent)
- `photo-1.jpg`, `photo-2.jpg`, `photo-3.jpg` (JPG/WebP, ~1600 px de large, crédit photo à renseigner)
- `titre-1.mp3` (les extraits audio doivent être libres de droits pour l'usage web)

Puis déclarer ces fichiers dans `src/data/artists.ts` (champs `logo`, `photos`, `tracks`, `links`).
