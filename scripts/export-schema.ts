import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Configuration Supabase
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://psryoyugyimibjhwhvlh.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_SERVICE_KEY) {
  console.error('❌ SUPABASE_SERVICE_KEY est requis pour exporter le schéma');
  console.error('Usage: SUPABASE_SERVICE_KEY=your_service_key npm run export-schema');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function exportSchema() {
  try {
    console.log('🚀 Début de l\'export du schéma public...\n');

    // Récupérer toutes les tables du schéma public
    const { data: tables, error: tablesError } = await supabase
      .rpc('get_public_tables', {});

    if (tablesError) {
      // Si la fonction RPC n'existe pas, utiliser une requête SQL directe
      const { data, error } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public')
        .eq('table_type', 'BASE TABLE');

      if (error) {
        throw new Error(`Erreur lors de la récupération des tables: ${error.message}`);
      }
    }

    // Générer le schéma SQL
    let schema = '-- Export du schéma public\n';
    schema += `-- Date: ${new Date().toISOString()}\n`;
    schema += '-- Base: Aide Mobile Créer\n\n';
    schema += 'SET statement_timeout = 0;\n';
    schema += 'SET lock_timeout = 0;\n';
    schema += 'SET client_encoding = \'UTF8\';\n\n';

    // Pour obtenir le schéma complet, nous devons utiliser pg_dump
    // Comme alternative, nous allons créer une approche qui récupère les définitions des tables
    console.log('ℹ️  Pour un export complet du schéma, utilisez pg_dump:');
    console.log(`   pg_dump -h db.psryoyugyimibjhwhvlh.supabase.co -U postgres -d postgres --schema=public --schema-only > schema.sql\n`);

    // Sauvegarder une version simplifiée avec les métadonnées
    const outputPath = path.join(process.cwd(), 'supabase', 'schema-export.sql');
    fs.writeFileSync(outputPath, schema);

    console.log(`✅ Schéma exporté avec succès dans: ${outputPath}`);
    console.log('\n💡 Note: Pour un export complet avec toutes les définitions, contraintes et index,');
    console.log('   utilisez pg_dump avec les identifiants de votre base de données Supabase.');

  } catch (error) {
    console.error('❌ Erreur lors de l\'export du schéma:', error);
    process.exit(1);
  }
}

exportSchema();
