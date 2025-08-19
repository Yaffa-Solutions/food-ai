require('env2')('.env');

const DB_URL = process.env.DB_URL;
console.log("DB_URL",DB_URL);

if (!DB_URL) throw new Error('DB_URL is not defined in .env');

const config = {
  port: process.env.PORT || 5000,
  database: DB_URL,
};
console.log('config',config);


const AWS_SETTINGS = {
  region: process.env.AWS_REGION,
  destBucket: process.env.AWS_S3_BUCKET,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};
if (!AWS_SETTINGS.region || !AWS_SETTINGS.destBucket || !AWS_SETTINGS.accessKeyId || !AWS_SETTINGS.secretAccessKey) {
  throw new Error('AWS settings are not properly defined in .env');
}

module.exports = { config, AWS_SETTINGS };
