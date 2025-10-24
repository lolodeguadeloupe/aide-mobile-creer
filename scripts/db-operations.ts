import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Configuration Supabase
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://psryoyugyimibjhwhvlh.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_SERVICE_KEY) {
  console.error('❌ SUPABASE_SERVICE_KEY est requis');
  console.error('Obtention de la clé:');
  console.error('1. Allez sur https://supabase.com/dashboard/project/psryoyugyimibjhwhvlh/settings/api');
  console.error('2. Copiez la clé "service_role" (secret)');
  console.error('3. Utilisez: SUPABASE_SERVICE_KEY=votre_clé npm run <commande>');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Fonction pour récupérer toutes les tables
async function getAllTables(): Promise<string[]> {
  const { data, error } = await supabase
    .from('pg_tables')
    .select('tablename')
    .eq('schemaname', 'public')
    .order('tablename');

  if (error) {
    throw new Error(`Erreur lors de la récupération des tables: ${error.message}`);
  }

  return data.map((row: any) => row.tablename);
}

// Fonction pour supprimer toutes les tables
async function dropAllTables(): Promise<void> {
  console.log('🗑️  Suppression de toutes les tables du schéma public...\n');

  try {
    const tables = await getAllTables();

    if (tables.length === 0) {
      console.log('ℹ️  Aucune table à supprimer.\n');
      return;
    }

    console.log(`📋 Tables à supprimer (${tables.length}):`);
    tables.forEach(table => console.log(`   - ${table}`));
    console.log('');

    // Construire la requête DROP pour toutes les tables
    const dropQueries = tables.map(table => `DROP TABLE IF EXISTS public."${table}" CASCADE`);
    const fullQuery = dropQueries.join('; ') + ';';

    console.log('⚙️  Exécution de la suppression...');

    // Exécuter via une requête SQL brute
    const { error } = await supabase.rpc('exec_sql' as any, {
      sql: fullQuery
    });

    if (error) {
      // Si exec_sql n'existe pas, essayer une approche différente
      console.log('ℹ️  Tentative de suppression table par table...');

      for (const table of tables) {
        try {
          // Utiliser l'API REST pour supprimer les données
          await supabase.from(table).delete().neq('id', 0);
          console.log(`   ✅ ${table} vidée`);
        } catch (err) {
          console.error(`   ⚠️  ${table}: ${err}`);
        }
      }

      console.log('\n⚠️  Note: Les tables n\'ont pas pu être supprimées, seulement vidées.');
      console.log('Pour supprimer complètement les tables, utilisez le Dashboard Supabase:');
      console.log('https://supabase.com/dashboard/project/psryoyugyimibjhwhvlh/editor');
    } else {
      console.log('✅ Toutes les tables ont été supprimées!\n');
    }
  } catch (error) {
    throw new Error(`Erreur lors de la suppression: ${error}`);
  }
}

// Fonction pour exporter le schéma
async function exportSchema(): Promise<void> {
  console.log('📤 Export du schéma public...\n');

  try {
    const tables = await getAllTables();

    console.log(`📋 Tables trouvées (${tables.length}):`);
    tables.forEach(table => console.log(`   - ${table}`));
    console.log('');

    // Créer le fichier de sortie
    const outputDir = path.join(process.cwd(), 'supabase', 'backups');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const outputFile = path.join(outputDir, `schema-${timestamp}.sql`);

    let content = `-- Export du schéma public\n`;
    content += `-- Date: ${new Date().toISOString()}\n`;
    content += `-- Tables: ${tables.join(', ')}\n\n`;
    content += `-- Pour importer ce schéma:\n`;
    content += `-- CONFIRM_DROP=yes SUPABASE_SERVICE_KEY=your_key npm run import-schema ${outputFile}\n\n`;

    fs.writeFileSync(outputFile, content);

    console.log(`✅ Liste des tables exportée: ${outputFile}`);
    console.log('\n💡 Pour un export complet avec structure et données:');
    console.log('   Utilisez pg_dump ou le Dashboard Supabase:');
    console.log('   https://supabase.com/dashboard/project/psryoyugyimibjhwhvlh/settings/database');
    console.log('\n   Commande pg_dump:');
    console.log('   pg_dump "postgresql://postgres:[YOUR-PASSWORD]@db.psryoyugyimibjhwhvlh.supabase.co:5432/postgres" \\');
    console.log('     --schema=public --schema-only > schema.sql');
  } catch (error) {
    throw new Error(`Erreur lors de l\'export: ${error}`);
  }
}

// Fonction pour importer un schéma SQL
async function importSchema(sqlFilePath: string): Promise<void> {
  console.log('📥 Import du schéma...\n');

  try {
    // Vérifier que le fichier existe
    if (!fs.existsSync(sqlFilePath)) {
      throw new Error(`Fichier introuvable: ${sqlFilePath}`);
    }

    console.log(`📖 Lecture: ${sqlFilePath}`);
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf-8');

    console.log('⚙️  Exécution du script SQL...\n');

    // Essayer d'exécuter le script SQL
    const { error } = await supabase.rpc('exec_sql' as any, {
      sql: sqlContent
    });

    if (error) {
      throw new Error(`Erreur SQL: ${error.message}`);
    }

    console.log('✅ Schéma importé avec succès!');
  } catch (error) {
    console.error('❌ Erreur lors de l\'import:', error);
    console.log('\n💡 Alternative: Importez manuellement via le Dashboard Supabase:');
    console.log('   https://supabase.com/dashboard/project/psryoyugyimibjhwhvlh/editor');
    throw error;
  }
}

// Router les commandes
const command = process.argv[2];

async function main() {
  try {
    switch (command) {
      case 'export':
        await exportSchema();
        break;

      case 'drop':
        const confirmDrop = process.env.CONFIRM_DROP;
        if (confirmDrop !== 'yes') {
          console.error('❌ Confirmation requise pour supprimer les tables.');
          console.error('Usage: CONFIRM_DROP=yes SUPABASE_SERVICE_KEY=key npm run db:drop');
          process.exit(1);
        }
        await dropAllTables();
        break;

      case 'import':
        const sqlFile = process.argv[3];
        if (!sqlFile) {
          console.error('❌ Fichier SQL requis');
          console.error('Usage: SUPABASE_SERVICE_KEY=key npm run db:import <fichier.sql>');
          process.exit(1);
        }

        const confirmImport = process.env.CONFIRM_DROP;
        if (confirmImport === 'yes') {
          console.log('🗑️  Suppression des tables existantes...\n');
          await dropAllTables();
        }

        await importSchema(path.resolve(sqlFile));
        break;

      case 'list':
        const tables = await getAllTables();
        console.log(`📋 Tables dans le schéma public (${tables.length}):\n`);
        tables.forEach(table => console.log(`   - ${table}`));
        break;

      default:
        console.error('❌ Commande inconnue:', command);
        console.error('\nCommandes disponibles:');
        console.error('  export  - Exporter la liste des tables');
        console.error('  drop    - Supprimer toutes les tables (CONFIRM_DROP=yes requis)');
        console.error('  import  - Importer un fichier SQL (optionnel: CONFIRM_DROP=yes pour supprimer avant)');
        console.error('  list    - Lister toutes les tables');
        process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Erreur:', error);
    process.exit(1);
  }
}

main();
