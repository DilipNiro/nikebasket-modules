# Module 01 — Solution : Schéma de base de données

## Ce que vous deviez implémenter

12 tables PostgreSQL constituant le schéma complet de NikeBasket :

| Table | Rôle |
|-------|------|
| `user` | Utilisateurs (clients, admins, employés) |
| `categorie` | Catégories de produits |
| `couleur` | Couleurs disponibles |
| `taille` | Pointures disponibles |
| `produits` | Catalogue de chaussures |
| `produit_images` | Images supplémentaires par produit |
| `stock` | Stock par produit × taille × couleur |
| `panier` | Articles en panier par utilisateur |
| `commande` | Commandes passées |
| `commande_produits` | Lignes de détail d'une commande |
| `commande_historique` | Journal des changements de statut |
| `paiement` | Enregistrement des paiements |

---

## Points clés à retenir

### SERIAL vs INT
`SERIAL` est un raccourci PostgreSQL pour `INTEGER NOT NULL DEFAULT nextval(...)`.  
Il crée automatiquement une séquence pour générer les identifiants.

### ON DELETE CASCADE
Quand on supprime un utilisateur, toutes ses commandes, son panier et ses paiements sont automatiquement supprimés.  
Cela évite les orphelins en base (données incohérentes).

### Pourquoi stocker prix_unitaire dans commande_produits ?
Le prix d'un produit peut changer dans le temps. En stockant le prix au moment de l'achat dans `commande_produits`, on conserve un historique fidèle même si le prix est modifié plus tard.

### Les index
Les index accélèrent les recherches. On les crée sur les colonnes utilisées dans les `WHERE` fréquents :
- `idx_user_email` → lookups de login
- `idx_produits_categorie` → filtrer par catégorie
- `idx_panier_user` → récupérer le panier d'un utilisateur

---

## Erreurs fréquentes

| Erreur | Cause | Solution |
|--------|-------|----------|
| `relation "categorie" does not exist` | Table créée dans le mauvais ordre | Respectez l'ordre du README (pas de REFERENCES avant la table cible) |
| `ERROR: syntax error at or near "user"` | `user` est un mot réservé PostgreSQL | Toujours écrire `"user"` avec guillemets |
| `ERROR: null value in column violates not-null constraint` | Oubli d'un `NOT NULL` ou `DEFAULT` | Relisez le commentaire du TODO |
| `duplicate key value violates unique constraint` | INSERT sans `DROP TABLE IF EXISTS` avant | Le fichier commence par des `DROP TABLE` — ils nettoient la base avant chaque exécution |

---

## Pour aller plus loin

- Comparez votre solution avec `database/schema.sql`
- Testez avec : `psql -U postgres -d ecommerce -c "\dt"` (doit lister 12 tables)

---

**Module suivant → `module-02-starter` : Serveur Express**
