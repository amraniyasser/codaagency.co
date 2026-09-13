# Coda Agency — Design System

Version: 1.0
Status: Foundation

## 1. Direction visuelle

Coda Agency doit rester premium, minimal, sobre et éditorial. L’interface doit donner une impression de maîtrise, de clarté et de précision. Éviter les effets gadgets, les couleurs trop saturées et les variations incohérentes d’une section à l’autre.

Principes:
- palette neutre, chaude et nuancée
- contraste fort entre surfaces claires et sections sombres
- typographie nette et contemporaine
- grands espaces respirants
- boutons arrondis type pill
- animations discrètes et fluides
- cohérence stricte des composants

## 2. Typographie

Police principale: General Sans

Usage recommandé:
- H1: 500–700
- H2/H3: 500–600
- Body: 400
- Labels / navigation: 500
- CTA: 500–600

Les tailles doivent être fluides avec `clamp()` quand pertinent.

## 3. Palette

Les couleurs officielles sont centralisées dans `css/tokens.css`.

Rôles principaux:
- Background principal: warm off-white
- Background soft: beige / gris chaud léger
- Background dark: noir doux
- Texte principal: presque noir
- Texte secondaire: gris bleuté discret
- Texte sur fond sombre: blanc cassé

Aucune couleur HEX ne doit être ajoutée directement dans un composant si une variable existe déjà dans `tokens.css`.

## 4. Thèmes de sections

Le site peut alterner les backgrounds tout en restant cohérent.

Thèmes prévus:
- `light`: surface principale claire
- `soft`: surface légèrement contrastée
- `dark`: surface sombre
- `accent`: surface neutre plus marquée si nécessaire

Chaque section choisit un thème. Les composants restent les mêmes.

Exemple de rythme:
- Hero → soft
- Services → light
- Portfolio → dark
- Process → soft
- Contact → dark ou accent

## 5. Boutons

Le système doit rester limité à quelques variantes:
- Primary: fond sombre, texte clair
- Secondary: transparent / border
- Light: fond clair sur section sombre
- Text link: lien éditorial simple

Règles:
- forme pill
- même hauteur par niveau de bouton
- même easing de hover
- pas de style de bouton inventé localement dans une section

## 6. Espacements

Les espacements utilisent une échelle commune définie dans `tokens.css`.

Règle générale:
- petits écarts: éléments internes
- moyens écarts: groupes de contenu
- grands écarts: blocs / sections
- très grands écarts: respiration entre sections principales

## 7. Containers

Le contenu principal doit utiliser une largeur maximale commune.

Règles:
- largeur desktop contrôlée
- gutters latéraux adaptatifs
- aucune section ne crée son propre système de largeur sans raison

## 8. Border radius

Niveaux prévus:
- small: petits éléments
- medium: cartes
- large: grandes surfaces
- pill: CTA et contrôles arrondis

## 9. Ombres

Les ombres doivent rester subtiles et réalistes.

Usage:
- mockups flottants
- cartes importantes
- éléments superposés

Éviter les grosses ombres très opaques.

## 10. Animations

Signature Coda:
- fade + translate vertical subtil
- reveal au scroll
- micro-translation sur hover
- mouvements de mockups très légers

Règles:
- une seule logique d’easing globale
- transitions courtes sur interactions
- transitions plus lentes sur reveals
- respecter `prefers-reduced-motion`

## 11. Responsive

Breakpoints centralisés dans les tokens / documentation:
- Mobile: < 768px
- Tablet: 768px–1023px
- Desktop: >= 1024px
- Large desktop: >= 1440px

Chaque composant doit être validé en desktop, tablet et mobile avant de passer au composant suivant.

## 12. Règles de développement

- `tokens.css` contient les valeurs globales.
- `global.css` contiendra le reset, body, typography et containers.
- Chaque composant important a son fichier CSS dédié.
- Les couleurs et espacements doivent utiliser les variables globales.
- Ne pas dupliquer une règle déjà disponible globalement.
- Ne pas ajouter un style temporaire directement dans le HTML.
- Une section validée ne doit pas être modifiée indirectement par une autre section.

## 13. Ordre de construction

1. Design system + tokens
2. Global styles
3. Navbar
4. Hero
5. Animations communes
6. Sections suivantes
7. Responsive complet
8. SEO / GEO technique
9. Performance
10. QA finale

Ce document est la référence visuelle et technique du projet Coda Agency.