-- =============================================================
-- Module 01 — Schéma PostgreSQL NikeBasket
-- =============================================================
-- Objectif : modéliser la base de données d'un site e-commerce
-- de chaussures en PostgreSQL.
--
-- Conventions PostgreSQL importantes :
--   INT AUTO_INCREMENT  → SERIAL (génère un id auto-incrémenté)
--   VARCHAR + UNIQUE    → contrainte d'unicité
--   REFERENCES          → clé étrangère
--   CHECK (... IN ...)  → liste blanche de valeurs autorisées
--   TIMESTAMPTZ         → date + heure + fuseau horaire
--
-- Pour chaque table, un commentaire décrit les colonnes attendues.
-- Votre mission : écrire le SQL à la place des TODO.
-- =============================================================

-- =============================================================
-- EXEMPLE — Lisez ceci avant de commencer
-- Voici comment créer une table PostgreSQL correctement :
-- =============================================================
--
--   CREATE TABLE "marque" (
--     id         SERIAL PRIMARY KEY,               -- identifiant auto-incrémenté
--     nom        VARCHAR(100) NOT NULL,             -- texte obligatoire
--     pays       VARCHAR(50)  NOT NULL DEFAULT 'FR',-- valeur par défaut
--     actif      BOOLEAN      NOT NULL DEFAULT TRUE,-- booléen
--     created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()-- date + heure + fuseau
--   );
--
-- Puis pour ajouter une clé étrangère (relation vers "marque") :
--
--   CREATE TABLE "produit" (
--     id        SERIAL PRIMARY KEY,
--     nom       VARCHAR(100) NOT NULL,
--     marque_id INTEGER      NOT NULL REFERENCES "marque"(id) ON DELETE CASCADE,
--     prix      DECIMAL(10,2) NOT NULL CHECK (prix >= 0)
--   );
--   CREATE INDEX idx_produit_marque ON "produit"(marque_id);
--
-- ON DELETE CASCADE = si on supprime une marque, tous ses produits sont supprimés.
-- CHECK (prix >= 0) = PostgreSQL refuse les valeurs négatives.
-- UNIQUE = une seule ligne peut avoir cette valeur (ex: email).
--
-- À vous maintenant — reproduisez ce pattern pour les 12 tables ci-dessous.
-- =============================================================

-- Suppression dans l'ordre inverse des dépendances (donné)
DROP TABLE IF EXISTS "paiement"            CASCADE;
DROP TABLE IF EXISTS "commande_historique" CASCADE;
DROP TABLE IF EXISTS "commande_produits"   CASCADE;
DROP TABLE IF EXISTS "commande"            CASCADE;
DROP TABLE IF EXISTS "panier"              CASCADE;
DROP TABLE IF EXISTS "stock"               CASCADE;
DROP TABLE IF EXISTS "produit_images"      CASCADE;
DROP TABLE IF EXISTS "produits"            CASCADE;
DROP TABLE IF EXISTS "taille"              CASCADE;
DROP TABLE IF EXISTS "couleur"             CASCADE;
DROP TABLE IF EXISTS "categorie"           CASCADE;
DROP TABLE IF EXISTS "user"               CASCADE;

-- =============================================================
-- TODO 1 — Table "user"
-- Colonnes :
--   id                    → SERIAL PRIMARY KEY
--   nom                   → VARCHAR(100) NOT NULL
--   email                 → VARCHAR(100) NOT NULL UNIQUE
--   password              → VARCHAR(255) NOT NULL
--   created_at            → TIMESTAMPTZ NOT NULL DEFAULT NOW()
--   role                  → VARCHAR(20) NOT NULL DEFAULT 'client'
--                           CHECK (role IN ('client', 'admin', 'employe'))
--   secret                → VARCHAR(32)              (null par défaut)
--   reset_token_hash      → VARCHAR(64) UNIQUE       (null par défaut)
--   reset_token_expires_at→ TIMESTAMPTZ              (null par défaut)
--   password_changed      → BOOLEAN DEFAULT FALSE
-- Après la table : créer un index sur la colonne email
-- =============================================================
-- Écrivez votre SQL ici :


-- =============================================================
-- TODO 2 — Table "categorie"
-- Colonnes : id (SERIAL PK), nom VARCHAR(50) NOT NULL UNIQUE
-- =============================================================


-- =============================================================
-- TODO 3 — Table "couleur"
-- Colonnes : id (SERIAL PK), nom VARCHAR(50) NOT NULL UNIQUE
-- =============================================================


-- =============================================================
-- TODO 4 — Table "taille"
-- Colonnes : id (SERIAL PK), valeur VARCHAR(50) NOT NULL UNIQUE
-- =============================================================


-- =============================================================
-- TODO 5 — Table "produits"
-- Colonnes :
--   id              → SERIAL PRIMARY KEY
--   nom             → VARCHAR(50) NOT NULL
--   categorie_id    → INTEGER NOT NULL REFERENCES "categorie"(id) ON DELETE CASCADE
--   description     → TEXT
--   prix            → DECIMAL(10,2) NOT NULL CHECK (prix >= 0)
--   image_url       → VARCHAR(255) NOT NULL
--   image_hover_url → VARCHAR(255) NOT NULL
--   date_sortie     → TIMESTAMPTZ NOT NULL DEFAULT NOW()
--   quantite        → INTEGER NOT NULL DEFAULT 0 CHECK (quantite >= 0)
--   statut          → VARCHAR(20) NOT NULL DEFAULT 'actif'
--                     CHECK (statut IN ('actif', 'archive', 'en_rupture'))
-- Après la table : créer des index sur categorie_id, statut, prix
-- =============================================================


-- =============================================================
-- TODO 6 — Table "produit_images" (galerie d'images)
-- Colonnes :
--   id         → SERIAL PRIMARY KEY
--   produit_id → INTEGER NOT NULL REFERENCES "produits"(id) ON DELETE CASCADE
--   image_url  → VARCHAR(255) NOT NULL
--   ordre      → INTEGER NOT NULL DEFAULT 0
-- Créer un index sur produit_id
-- =============================================================


-- =============================================================
-- TODO 7 — Table "stock"
-- Stock par combinaison produit × taille × couleur
-- Colonnes :
--   id         → SERIAL PRIMARY KEY
--   produit_id → INTEGER NOT NULL REFERENCES "produits"(id) ON DELETE CASCADE
--   taille_id  → INTEGER NOT NULL REFERENCES "taille"(id)   ON DELETE CASCADE
--   couleur_id → INTEGER NOT NULL REFERENCES "couleur"(id)  ON DELETE CASCADE
--   quantite   → INTEGER NOT NULL DEFAULT 0 CHECK (quantite >= 0)
-- Contrainte : UNIQUE (produit_id, taille_id, couleur_id)
-- Créer un index sur produit_id
-- =============================================================


-- =============================================================
-- TODO 8 — Table "panier"
-- Colonnes :
--   id         → SERIAL PRIMARY KEY
--   user_id    → INTEGER NOT NULL REFERENCES "user"(id)     ON DELETE CASCADE
--   produit_id → INTEGER NOT NULL REFERENCES "produits"(id) ON DELETE CASCADE
--   couleur_id → INTEGER NOT NULL REFERENCES "couleur"(id)  ON DELETE CASCADE
--   taille_id  → INTEGER NOT NULL REFERENCES "taille"(id)   ON DELETE CASCADE
--   quantite   → INTEGER NOT NULL DEFAULT 1 CHECK (quantite > 0)
--   prix       → DECIMAL(10,2) NOT NULL
--   ajout_date → TIMESTAMPTZ NOT NULL DEFAULT NOW()
-- Contrainte : UNIQUE (user_id, produit_id, couleur_id, taille_id)
-- Créer un index sur user_id
-- =============================================================


-- =============================================================
-- TODO 9 — Table "commande"
-- Colonnes :
--   id            → SERIAL PRIMARY KEY
--   user_id       → INTEGER NOT NULL REFERENCES "user"(id) ON DELETE CASCADE
--   montant_total → DECIMAL(10,2) NOT NULL CHECK (montant_total >= 0)
--   commandee_le  → TIMESTAMPTZ NOT NULL DEFAULT NOW()
--   statut        → VARCHAR(20) NOT NULL DEFAULT 'en_attente'
--                   CHECK (statut IN ('en_attente', 'payee', 'en_preparation',
--                                     'expediee', 'livree', 'annulee'))
-- Créer des index sur user_id et statut
-- =============================================================


-- =============================================================
-- TODO 10 — Table "commande_produits" (lignes de commande)
-- Colonnes :
--   id            → SERIAL PRIMARY KEY
--   commande_id   → INTEGER NOT NULL REFERENCES "commande"(id)  ON DELETE CASCADE
--   produit_id    → INTEGER NOT NULL REFERENCES "produits"(id)  ON DELETE CASCADE
--   taille_id     → INTEGER NOT NULL REFERENCES "taille"(id)    ON DELETE CASCADE
--   couleur_id    → INTEGER NOT NULL REFERENCES "couleur"(id)   ON DELETE CASCADE
--   quantite      → INTEGER NOT NULL CHECK (quantite > 0)
--   prix_unitaire → DECIMAL(10,2) NOT NULL CHECK (prix_unitaire >= 0)
-- ⚠ On stocke prix_unitaire ici (et non dans produits) car le prix peut changer
-- Créer un index sur commande_id
-- =============================================================


-- =============================================================
-- TODO 11 — Table "commande_historique"
-- Journal des changements de statut d'une commande
-- Colonnes :
--   id             → SERIAL PRIMARY KEY
--   commande_id    → INTEGER NOT NULL REFERENCES "commande"(id) ON DELETE CASCADE
--   ancien_statut  → VARCHAR(20) (peut être NULL pour le premier statut)
--   nouveau_statut → VARCHAR(20) NOT NULL
--   modifie_par    → INTEGER REFERENCES "user"(id) ON DELETE SET NULL
--   modifie_le     → TIMESTAMPTZ NOT NULL DEFAULT NOW()
-- Créer un index sur commande_id
-- =============================================================


-- =============================================================
-- TODO 12 — Table "paiement"
-- Colonnes :
--   id              → SERIAL PRIMARY KEY
--   user_id         → INTEGER NOT NULL REFERENCES "user"(id)     ON DELETE CASCADE
--   commande_id     → INTEGER NOT NULL REFERENCES "commande"(id) ON DELETE CASCADE
--   mode_paiement   → VARCHAR(50) NOT NULL DEFAULT 'carte'
--   montant         → DECIMAL(10,2) NOT NULL CHECK (montant >= 0)
--   date_paiement   → TIMESTAMPTZ NOT NULL DEFAULT NOW()
--   statut_paiement → VARCHAR(20) NOT NULL DEFAULT 'en_attente'
--                     CHECK (statut_paiement IN ('en_attente','succes','echec','rembourse'))
--   transaction_id  → VARCHAR(255) UNIQUE (Stripe PaymentIntent ID)
-- Créer des index sur commande_id et user_id
-- =============================================================


-- =============================================================
-- Données de référence (donné — ne pas modifier)
-- =============================================================
INSERT INTO "categorie" (nom) VALUES ('Lifestyle'),('Running'),('Basketball'),('Training'),('Casual');
INSERT INTO "couleur"   (nom) VALUES ('Rouge'),('Noir'),('Blanc'),('Bleu');
INSERT INTO "taille" (valeur) VALUES
    ('40'),('40.5'),('41'),('41.5'),('42'),('42.5'),
    ('43'),('43.5'),('44'),('44.5'),('45'),('45.5'),
    ('46'),('47'),('47.5'),('48'),('48.5'),('49'),
    ('49.5'),('50'),('50.5');
