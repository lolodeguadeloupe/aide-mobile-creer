# Scripts de Gestion de Base de Données

Ce dossier contient des scripts pour gérer le schéma public de votre base de données Supabase.

## Prérequis

1. **Clé de Service Supabase** : Vous avez besoin de la `service_role` key de votre projet Supabase
   - Allez sur https://supabase.com/dashboard/project/psryoyugyimibjhwhvlh/settings/api
   - Copiez la clé **service_role** (gardez-la secrète !)

2. **Dépendances installées** :
   ```bash
   npm install
   ```

## Scripts Disponibles

### 1. Lister les Tables

Affiche toutes les tables présentes dans le schéma public.

```bash
SUPABASE_SERVICE_KEY=votre_clé npm run db:list
```

**Exemple de sortie :**
```
📋 Tables dans le schéma public (15):
   - profiles
   - partners
   - restaurants
   - accommodations
   - activities
   ...
```

---

### 2. Exporter le Schéma

Exporte la liste des tables et crée un fichier de référence.

```bash
SUPABASE_SERVICE_KEY=votre_clé npm run db:export
```

**Sortie :**
- Fichier créé dans : `supabase/backups/schema-YYYY-MM-DD.sql`

**Note :** Ce script exporte uniquement la liste des tables. Pour un export complet (structure + données), utilisez :

#### Export complet avec pg_dump :

```bash
pg_dump "postgresql://postgres:[VOTRE-MOT-DE-PASSE]@db.psryoyugyimibjhwhvlh.supabase.co:5432/postgres" \
  --schema=public \
  --schema-only \
  > supabase/schema.sql
```

Ou via le Dashboard Supabase :
- https://supabase.com/dashboard/project/psryoyugyimibjhwhvlh/settings/database

---

### 3. Supprimer toutes les Tables

⚠️ **ATTENTION : Cette opération est IRREVERSIBLE !**

Supprime toutes les tables du schéma public.

```bash
CONFIRM_DROP=yes SUPABASE_SERVICE_KEY=votre_clé npm run db:drop
```

**Sécurité :**
- Nécessite `CONFIRM_DROP=yes` pour confirmer l'opération
- Suppression en CASCADE (supprime aussi les contraintes de clés étrangères)

**Utilisation typique :**
```bash
# Étape 1 : Lister les tables à supprimer
SUPABASE_SERVICE_KEY=votre_clé npm run db:list

# Étape 2 : Confirmer et supprimer
CONFIRM_DROP=yes SUPABASE_SERVICE_KEY=votre_clé npm run db:drop
```

---

### 4. Importer un Schéma SQL

Importe un fichier SQL dans la base de données, avec option de suppression préalable des tables existantes.

#### Import avec suppression des tables existantes (recommandé) :

```bash
CONFIRM_DROP=yes SUPABASE_SERVICE_KEY=votre_clé npm run db:import supabase/schema.sql
```

#### Import sans suppression :

```bash
DROP_TABLES=no SUPABASE_SERVICE_KEY=votre_clé npm run db:import supabase/schema.sql
```

**Options :**
- `CONFIRM_DROP=yes` : Supprime les tables existantes avant l'import (évite les conflits)
- `DROP_TABLES=no` : Import sans suppression (peut causer des erreurs si les tables existent déjà)

---

## Workflow Complet

### Scénario 1 : Sauvegarder et Restaurer

```bash
# 1. Exporter le schéma actuel (via pg_dump)
pg_dump "postgresql://postgres:[MOT-DE-PASSE]@db.psryoyugyimibjhwhvlh.supabase.co:5432/postgres" \
  --schema=public --schema-only > backup.sql

# 2. Plus tard, restaurer le schéma
CONFIRM_DROP=yes SUPABASE_SERVICE_KEY=votre_clé npm run db:import backup.sql
```

### Scénario 2 : Réinitialiser la Base de Données

```bash
# 1. Lister les tables actuelles
SUPABASE_SERVICE_KEY=votre_clé npm run db:list

# 2. Supprimer toutes les tables
CONFIRM_DROP=yes SUPABASE_SERVICE_KEY=votre_clé npm run db:drop

# 3. Importer un nouveau schéma
SUPABASE_SERVICE_KEY=votre_clé npm run db:import nouveau-schema.sql
```

### Scénario 3 : Import avec remplacement automatique

```bash
# Import direct avec suppression et réimport
CONFIRM_DROP=yes SUPABASE_SERVICE_KEY=votre_clé npm run db:import schema.sql
```

---

## Sécurité

### Protection de la Clé de Service

**Ne commitez JAMAIS la clé de service dans Git !**

Créez un fichier `.env.local` (déjà dans `.gitignore`) :

```bash
# .env.local
SUPABASE_SERVICE_KEY=votre_clé_secrète
```

Puis utilisez :

```bash
source .env.local
npm run db:list
```

Ou avec `dotenv-cli` :

```bash
npm install -D dotenv-cli

# Ajouter dans package.json :
"db:list:safe": "dotenv -e .env.local -- npm run db:list"
```

---

## Alternatives

### Via le Dashboard Supabase

Pour les opérations manuelles, vous pouvez utiliser :
- **SQL Editor** : https://supabase.com/dashboard/project/psryoyugyimibjhwhvlh/editor
- **Database Settings** : https://supabase.com/dashboard/project/psryoyugyimibjhwhvlh/settings/database

### Via psql

```bash
# Connexion directe
psql "postgresql://postgres:[MOT-DE-PASSE]@db.psryoyugyimibjhwhvlh.supabase.co:5432/postgres"

# Lister les tables
\dt public.*

# Supprimer toutes les tables
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
```

---

## Dépannage

### Erreur : "SUPABASE_SERVICE_KEY est requis"

Solution : Assurez-vous de passer la clé de service :
```bash
SUPABASE_SERVICE_KEY=votre_clé npm run db:list
```

### Erreur : "exec_sql n'existe pas"

Les scripts tentent d'utiliser une fonction RPC `exec_sql`. Si elle n'existe pas, le script utilise des méthodes alternatives.

Pour créer la fonction (optionnel) :

```sql
CREATE OR REPLACE FUNCTION exec_sql(sql text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  EXECUTE sql;
END;
$$;
```

### Import échoue avec des erreurs

- Vérifiez que le fichier SQL est valide
- Utilisez `CONFIRM_DROP=yes` pour supprimer les tables existantes avant l'import
- Importez manuellement via le Dashboard Supabase si les scripts ne fonctionnent pas

---

## Support

Pour plus d'informations :
- [Documentation Supabase](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
