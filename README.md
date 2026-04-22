# Module 08 — Frontend React : Setup & Composants

## Objectif

Initialiser le projet frontend React et créer les 4 composants réutilisables de base.

---

## Ce que vous allez apprendre

- Initialiser un projet React avec **Vite**
- La notion de **composant** React (fonction qui retourne du JSX)
- Passer des **props** à un composant
- Utiliser le **JSX** : HTML dans JavaScript
- Les classes CSS existantes (l'interface est déjà stylée dans `index.css`)
- Importer des fichiers images dans React

---

## Structure ajoutée dans ce module

```
frontend/
├── package.json         ← donné
├── vite.config.js       ← donné (proxy vers le backend)
├── index.html           ← donné
├── public/images/       ← donné (toutes les images)
└── src/
    ├── main.jsx         ← donné (point d'entrée React)
    ├── index.css        ← donné (styles complets)
    ├── App.jsx          ← donné (affiche les composants pour tester)
    └── components/
        ├── Navbar.jsx      ← TODO 1 : barre de navigation
        ├── Footer.jsx      ← TODO 2 : pied de page
        ├── ProductCard.jsx ← TODO 3 : carte produit dans le catalogue
        └── CartItem.jsx    ← TODO 4 : article dans le panier
```

---

## Mise en place

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

---

## Votre mission

4 composants à implémenter. Chaque fichier contient un TODO détaillé avec la structure HTML exacte à produire.

### Concept clé : les props

```jsx
// Dans App.jsx : on passe les données au composant
<ProductCard product={testProduct} />

// Dans ProductCard.jsx : on reçoit et utilise les données
function ProductCard({ product }) {
  return <div>{product.nom}</div>;
}
```

### Concept clé : JSX

JSX ressemble à du HTML mais c'est du JavaScript :
- `class` → `className` (car `class` est réservé en JS)
- `{expression}` → pour insérer du JS dans le HTML
- Les attributs d'événements : `onClick`, `onChange` (camelCase)

---

## Tester votre travail

```bash
npm run dev
# Ouvrir http://localhost:5173
# Vous devez voir la Navbar, 2 ProductCard, et le Footer
```

---

## Questions de compréhension

1. Quelle est la différence entre un composant et une fonction JavaScript classique ?
2. Pourquoi utilise-t-on `className` au lieu de `class` en JSX ?
3. Que se passe-t-il si une prop requise n'est pas passée au composant ?
4. Comment React sait-il re-rendre un composant quand ses données changent ?

---

**Module suivant → `module-09-starter` : React Router & Pages**
