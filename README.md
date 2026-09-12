# Coda Agency

Nouvelle homepage pour une agence de création de sites web au Maroc, destinée aux entreprises de tous secteurs. Direction artistique crème et noir, accent prune, typographie Geist et quatre concepts web originaux en français.

## Développer

Node.js 22 ou plus récent.

```sh
npm ci
npm run dev
```

Le site est accessible sous `/codaagency.co/`. Le script accepte les options `--host`, `--hostname`, `--port` et `--strictPort` des outils d’aperçu.

```sh
npm run build
npm run verify
npm run check
```

`npm run build` compile Next.js en export statique puis copie le résultat à la racine du dépôt. La publication GitHub Pages existante sert ainsi la branche `main`, dossier racine, sans changer les paramètres du dépôt. **Après toute modification de `src/` ou `public/`, reconstruire et committer également l’export généré.** `.static-export.json` permet de retirer uniquement les anciens fichiers générés. `.nojekyll` conserve l’accès à `_next/`.

## Organisation

- `src/app/` : page, layout, métadonnées, styles et page 404.
- `src/components/` : navigation, galerie, carrousel, formulaire et maquettes.
- `src/lib/site.ts` : identité, URL, email de contact, concepts et composition du message.
- `public/assets/` : sources des logos, icônes, favicons, photos, image Open Graph, documentation des maquettes et licence de police.
- `assets/`, `_next/`, `index.html` : export généré, servi par GitHub Pages.
- `scripts/` : développement, préparation de l’export et vérifications.

Stack : Next.js, React, TypeScript, Tailwind CSS et Framer Motion. HTML pré-rendu ; photos originales locales AVIF et WebP en 640 et 1280 px ; Geist hébergée localement. Framer Motion est chargé à la demande sous le premier écran. Aucun traqueur ni police distante.

## Expérience

Le carrousel propose sélection manuelle et pause ; il s’arrête au survol, au focus, hors écran et lorsque l’onglet est masqué. `prefers-reduced-motion` désactive autoplay et animations. Chaque concept peut être agrandi dans une boîte de dialogue native, fermable avec Échap, avec restitution du focus. Les accordéons utilisent du HTML natif. Le contenu, les liens et les accordéons fonctionnent sans JavaScript.

Maison Azur, Aura Botanique, Studio Élan et Tempo sont des marques fictives, explicitement présentées comme des concepts créatifs, sans références clients ni résultats inventés. Les maquettes sont des composants HTML/CSS ; leurs photographies originales ont été créées pour ce projet.

## Contact

Le formulaire **prépare un email** dans l’application du visiteur. Il ne prétend pas envoyer ou stocker une demande côté serveur. Un lien direct, un bouton pour rouvrir le message et la copie du texte sont disponibles.

L’adresse initiale est celle de l’auteur public de ce dépôt : `amrani.nejjar.yasser@gmail.com`. Remplacer `site.email` dans `src/lib/site.ts` par la boîte professionnelle souhaitée, puis reconstruire. Aucune adresse `@codaagency.co` non vérifiée ni plateforme de collecte tierce n’est utilisée.

## SEO et futur domaine

Une seule page indexable : l’accueil. H1 principal, canonical, description, Open Graph et Twitter Card avec image, JSON-LD Organization, WebSite, WebPage et Service. Le sitemap et `llms.txt` décrivent seulement le contenu disponible.

Les anciennes URL deviennent de petits ponts `noindex` vers l’accueil ou la section correspondante ; ce ne sont pas des pages SEO de remplacement. GitHub Pages n’offrant pas de redirections serveur configurables dans ce mode, remplacer ces ponts par des redirections HTTP adaptées lors d’un changement d’hébergement.

La canonical correspond actuellement à l’URL publique existante : `https://amraniyasser.github.io/codaagency.co/`.

Lorsque le domaine sera connecté, définir dans `.env.local`, reconstruire et publier :

```dotenv
NEXT_PUBLIC_SITE_URL=https://codaagency.co
NEXT_PUBLIC_BASE_PATH=
```

Configurer alors le domaine dans GitHub Pages et le DNS, avec le `CNAME` adéquat. Ne pas basculer la canonical tant que le domaine ne sert pas réellement le site. Sur GitHub Pages, `robots.txt` dans un sous-répertoire ne contrôle pas le robot à la racine du domaine ; il sera pleinement exploitable sur le domaine propre.

`llms.txt` est un descriptif facultatif, pas un facteur de classement garanti. L’accueil constitue une base technique ; le travail éditorial et les pages services/locales utiles viendront dans la prochaine phase.

## Vérifications

Compilation de production, TypeScript, chemins des ressources, ancres, métadonnées, JSON-LD, 404, sitemap et encodage du message de contact vérifiés. Le contrôle de navigation de l’environnement a bloqué l’accès du navigateur d’aperçu à `/codaagency.co/`. Aucun score Lighthouse ni audit visuel complet n’est annoncé comme mesuré. Mesurer la version publique sur mobile et ordinateur après publication.

Références : [exports statiques Next.js](https://nextjs.org/docs/app/guides/static-exports), [fonctionnalités IA et sites web](https://developers.google.com/search/docs/appearance/ai-features).
