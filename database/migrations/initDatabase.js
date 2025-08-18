const { readFileSync } = require('fs');
const { join } = require('path');
const connection = require('../connection');

const sqlPath = join(__dirname, '../build.sql');
let sql;

try {
  sql = readFileSync(sqlPath, 'utf8');
  console.log(`Successfully loaded SQL file from: ${sqlPath}`);
} catch (error) {
  console.error(`Failed to read SQL file at ${sqlPath}`);
  console.error(error.message);
  process.exit(1);
}

connection
  .query(sql)
  .then(() => {
    console.log('Database schema built successfully.');
    console.log('All tables created as defined in build.sql');
  })
  .catch((err) => {
    console.error('Migration failed while executing SQL script.');
    console.error('Error details:', err.stack);
    process.exit(1);
  });
