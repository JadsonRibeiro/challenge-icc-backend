import pg from "pg";

export function getPgClient() {
  const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  
  client.connect();

  return client;
}