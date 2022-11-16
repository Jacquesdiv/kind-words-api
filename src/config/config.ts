import * as dotenv from 'dotenv';

const env = dotenv.config();
if (env.error) {
  console.warn('No .env file found');
}

function getEnvironmentalVar(varName, fallback = null) {
  return process.env[varName] || env?.parsed?.[varName] || fallback;
}

const config = {
  port: getEnvironmentalVar('PORT', 3000),
  databaseUri: getEnvironmentalVar('DATABASE_URL', ''),
  databaseType: getEnvironmentalVar('DATABASE_TYPE', ''),

  validConfig: function (): boolean {
    return this.databaseType && this.databaseUri;
  },
};

export default config;
