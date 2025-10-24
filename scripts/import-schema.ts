import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Configuration Supabase
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://psryoyugyimibjhwhvlh.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_SERVICE_KEY) {
  console.error('❌ SUPABASE_SERVICE_KEY est requis pour importer le schéma');
  console.error('Usage: SUPABASE_SERVICE_KEY=your_service_key npm run import-schema <fichier.sql>');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function dropAllTables() {
  console.log('🗑️  Suppression des tables existantes...\n');

  try {
    // Récupérer toutes les tables
    const { data: tables, error: tablesError } = await supabase.rpc('exec_sql', {
      query: `
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public'
        ORDER BY tablename;
      `
    });

    if (tablesError) {
      throw new Error(`Erreur lors de la récupération des tables: ${tablesError.message}`);
    }

    if (!tables || tables.length === 0) {
      console.log('ℹ️  Aucune table existante à supprimer.\n');
      return;
    }

    console.log(`📋 Suppression de ${tables.length} table(s)...`);

    // Supprimer toutes les tables en cascade
    for (const table of tables) {
      const { error: dropError } = await supabase.rpc('exec_sql', {
        query: `DROP TABLE IF EXISTS public."${table.tablename}" CASCADE;`
      });

      if (dropError) {
        console.error(`   ❌ Erreur lors de la suppression de ${table.tablename}: ${dropError.message}`);
      } else {
        console.log(`   ✅ ${table.tablename}`);
      }
    }

    console.log('✅ Tables supprimées avec succès!\n');
  } catch (error) {
    console.error('❌ Erreur lors de la suppression des tables:', error);
    throw error;
  }
}

async function importSchema(sqlFilePath: string) {
  try {
    console.log('🚀 Début de l\'import du schéma...\n');

    // Vérifier si le fichier existe
    if (!fs.existsSync(sqlFilePath)) {
      throw new Error(`Le fichier ${sqlFilePath} n'existe pas`);
    }

    // Demander confirmation pour la suppression
    const dropTables = process.env.DROP_TABLES !== 'no';

    if (dropTables) {
      console.log('⚠️  Mode: Suppression des tables existantes avant import');
      const confirmEnv = process.env.CONFIRM_DROP;
      if (confirmEnv !== 'yes') {
        console.error('❌ Confirmation requise pour supprimer les tables.');
        console.error('Usage: CONFIRM_DROP=yes SUPABASE_SERVICE_KEY=your_service_key npm run import-schema <fichier.sql>');
        console.error('Ou utilisez DROP_TABLES=no pour importer sans supprimer les tables existantes.');
        process.exit(1);
      }

      // Supprimer toutes les tables existantes
      await dropAllTables();
    } else {
      console.log('ℹ️  Mode: Import sans suppression des tables existantes\n');
    }

    // Lire le fichier SQL
    console.log(`📖 Lecture du fichier: ${sqlFilePath}`);
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf-8');

    // Exécuter le script SQL
    console.log('⚙️  Exécution du script SQL...\n');

    // Diviser le script en commandes individuelles (séparées par ;)
    const commands = sqlContent
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'));

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < commands.length; i++) {
      const command = commands[i];

      // Ignorer les commentaires et les commandes vides
      if (!command || command.startsWith('--')) continue;

      try {
        const { error } = await supabase.rpc('exec_sql', {
          query: command + ';'
        });

        if (error) {
          console.error(`❌ Erreur commande ${i + 1}:`, error.message);
          errorCount++;
        } else {
          successCount++;
          if (successCount % 10 === 0) {
            console.log(`   ✅ ${successCount} commandes exécutées...`);
          }
        }
      } catch (err) {
        console.error(`❌ Exception commande ${i + 1}:`, err);
        errorCount++;
      }
    }

    console.log(`\n📊 Résumé:`);
    console.log(`   ✅ Commandes réussies: ${successCount}`);
    console.log(`   ❌ Commandes échouées: ${errorCount}`);

    if (errorCount === 0) {
      console.log('\n✅ Schéma importé avec succès!');
    } else {
      console.log('\n⚠️  Import terminé avec des erreurs. Vérifiez les messages ci-dessus.');
    }

  } catch (error) {
    console.error('❌ Erreur lors de l\'import du schéma:', error);
    process.exit(1);
  }
}

// Récupérer le chemin du fichier SQL depuis les arguments
const sqlFilePath = process.argv[2];

if (!sqlFilePath) {
  console.error('❌ Chemin du fichier SQL requis');
  console.error('Usage: CONFIRM_DROP=yes SUPABASE_SERVICE_KEY=your_service_key npm run import-schema <fichier.sql>');
  console.error('Exemple: npm run import-schema ./supabase/schema.sql');
  process.exit(1);
}

// Résoudre le chemin relatif
const resolvedPath = path.resolve(process.cwd(), sqlFilePath);
importSchema(resolvedPath);
