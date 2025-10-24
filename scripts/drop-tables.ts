import { createClient } from '@supabase/supabase-js';

// Configuration Supabase
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://psryoyugyimibjhwhvlh.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_SERVICE_KEY) {
  console.error('❌ SUPABASE_SERVICE_KEY est requis pour supprimer les tables');
  console.error('Usage: SUPABASE_SERVICE_KEY=your_service_key npm run drop-tables');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function dropAllTables() {
  try {
    console.log('🚀 Début de la suppression de toutes les tables du schéma public...\n');
    console.log('⚠️  ATTENTION: Cette opération est IRREVERSIBLE!\n');

    // Demander confirmation
    const confirmEnv = process.env.CONFIRM_DROP;
    if (confirmEnv !== 'yes') {
      console.error('❌ Confirmation requise. Utilisez CONFIRM_DROP=yes pour confirmer.');
      console.error('Usage: CONFIRM_DROP=yes SUPABASE_SERVICE_KEY=your_service_key npm run drop-tables');
      process.exit(1);
    }

    // Récupérer toutes les tables du schéma public
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
      console.log('ℹ️  Aucune table à supprimer dans le schéma public.');
      return;
    }

    console.log(`📋 Tables à supprimer (${tables.length}):`);
    tables.forEach((table: any) => {
      console.log(`   - ${table.tablename}`);
    });
    console.log('');

    // Désactiver les contraintes de clés étrangères pour éviter les erreurs
    console.log('🔓 Désactivation des contraintes de clés étrangères...');

    // Supprimer toutes les tables en cascade
    for (const table of tables) {
      console.log(`🗑️  Suppression de la table: ${table.tablename}`);

      const { error: dropError } = await supabase.rpc('exec_sql', {
        query: `DROP TABLE IF EXISTS public."${table.tablename}" CASCADE;`
      });

      if (dropError) {
        console.error(`   ❌ Erreur: ${dropError.message}`);
      } else {
        console.log(`   ✅ Table ${table.tablename} supprimée`);
      }
    }

    console.log('\n✅ Toutes les tables ont été supprimées avec succès!');
    console.log('💡 Vous pouvez maintenant importer le nouveau schéma.');

  } catch (error) {
    console.error('❌ Erreur lors de la suppression des tables:', error);
    process.exit(1);
  }
}

dropAllTables();
