# Module 01 — Schéma de base de données

## Objectif

Concevoir et implémenter le schéma de données d'un site e-commerce de chaussures en **PostgreSQL**.

Ce schéma est le socle de tout le projet — chaque table que vous créerez ici sera utilisée dans tous les modules suivants.

---

## Ce que vous allez apprendre

- Créer des tables PostgreSQL avec les bons types (`SERIAL`, `VARCHAR`, `DECIMAL`, `TIMESTAMPTZ`, `BOOLEAN`)
- Définir des **clés étrangères** (`REFERENCES`) avec `ON DELETE CASCADE`
- Écrire des **contraintes** (`CHECK`, `UNIQUE`, `NOT NULL`)
- Créer des **index** pour optimiser les requêtes
- Comprendre les relations entre entités (1-N, N-N via table de jonction)

---

## Structure du projet à la fin de ce module

```
nikebasket/
└── database/
    └── schema.sql   ← votre mission
```

---

## Rappel SQL — La syntaxe de base

Si vous n'avez jamais écrit de SQL, voici les éléments essentiels :

```sql
CREATE TABLE "nom_table" (
  id         SERIAL PRIMARY KEY,                -- identifiant auto-incrémenté
  nom        VARCHAR(100)  NOT NULL,            -- texte, obligatoire
  statut     VARCHAR(20)   NOT NULL DEFAULT 'actif'
                           CHECK (statut IN ('actif', 'inactif')),
  created_at TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  -- Clé étrangère : référence une autre table
  categorie_id INTEGER NOT NULL REFERENCES "categorie"(id) ON DELETE CASCADE
);

-- Index : accélère les recherches sur cette colonne
CREATE INDEX idx_nom_table_categorie ON "nom_table"(categorie_id);
```

Un exemple complet est aussi fourni en commentaire dans le fichier `schema.sql` — **lisez-le avant de commencer**.

---

## Votre mission

Ouvrez `database/schema.sql`.

12 `TODO` vous attendent — chaque TODO correspond à une table à créer.  
Les colonnes attendues sont décrites en commentaires au-dessus de chaque TODO.

> Commencez par les tables simples (TODO 2, 3, 4) avant d'attaquer TODO 1 qui a plus de colonnes.

### Ordre de création (important !)

PostgreSQL vérifie les références au moment de la création. Respectez cet ordre :
1. `user` — aucune dépendance
2. `categorie`, `couleur`, `taille` — aucune dépendance
3. `produits` → dépend de `categorie`
4. `produit_images`, `stock` → dépendent de `produits`, `taille`, `couleur`
5. `panier` → dépend de `user`, `produits`, `couleur`, `taille`
6. `commande` → dépend de `user`
7. `commande_produits` → dépend de `commande`, `produits`, `taille`, `couleur`
8. `commande_historique` → dépend de `commande`, `user`
9. `paiement` → dépend de `user`, `commande`

---

## Tester votre travail

```bash
# Créer la base de données
psql -U postgres -c "CREATE DATABASE ecommerce;"

# Exécuter le schéma
psql -U postgres -d ecommerce -f database/schema.sql

# Vérifier les tables créées
psql -U postgres -d ecommerce -c "\dt"
```

Résultat attendu : 12 tables listées.

---

## Questions de compréhension

1. Pourquoi utilise-t-on `SERIAL` plutôt que `INT` pour les identifiants ?
2. Pourquoi stocke-t-on `prix_unitaire` dans `commande_produits` et non dans `produits` directement ?
3. Que se passe-t-il en base quand on supprime un utilisateur (grâce à `ON DELETE CASCADE`) ?
4. Pourquoi crée-t-on des index sur `email`, `categorie_id`, `statut` ?

---

## Passage au module suivant

Une fois votre schéma validé → consultez `module-01-solution` pour comparer, puis passez à **module-02-starter**.
