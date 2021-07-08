import { getPgClient } from "./connection.js";

export async function dropTables() {
  const client = getPgClient();
  await client.query("DROP TABLE cards, lists;");
  client.end();
}

export async function createTables() {
  const client = getPgClient();

  await client.query("CREATE TABLE lists (" 
    + "list_id SERIAL PRIMARY KEY,"
    + "position INT NOT NULL,"
    + "name varchar(150) NOT NULL);");
    
  await client.query("CREATE TABLE cards (" 
    + "card_id SERIAL PRIMARY KEY, "
    + "title VARCHAR(150) NOT NULL, "
    + "position INT NOT NULL,"
    + "list_id INT NOT NULL, "
    + "FOREIGN KEY (list_id)"
    + "    REFERENCES lists (list_id)"
    + ");");

  client.end();
}