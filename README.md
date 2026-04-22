# Module 08 — Frontend React : Setup & Composants

## Objectif

Initialiser le projet frontend React et créer les 4 composants réutilisables de base.

---

## Rappel React — Les bases indispensables

> Première fois avec React ? Voici les 3 concepts que vous allez utiliser tout de suite.  
> Documentation officielle : **https://react.dev/learn**

### 1. Un composant = une fonction qui retourne du JSX

```jsx
// ProductCard.jsx
export default function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.image_url} alt={product.nom} />
      <p>{product.nom}</p>        {/* {} = insérer du JS dans le HTML */}
      <p>{product.prix} €</p>
    </div>
  );
}
```

### 2. Les props = les paramètres du composant

```jsx
// Appel du composant avec des données
<ProductCard product={{ nom: "Air Max 90", prix: 129.99, image_url: "/img.jpg" }} />
```

### 3. useState = mémoriser une valeur qui peut changer

```jsx
import { useState } from 'react';

function Compteur() {
  const [count, setCount] = useState(0); // valeur initiale = 0

  return <button onClick={() => setCount(count + 1)}>Clics : {count}</button>;
}
```

> Pour aller plus loin : [react.dev/learn/your-first-component](https://react.dev/learn/your-first-component)

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
