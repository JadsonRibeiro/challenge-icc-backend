import { getPgClient } from "./connection.js"

export const CardsManager = {
  async getCards(listId) {
    const client = getPgClient();
    
    const sql = 'SELECT * FROM cards WHERE list_id=$1 ORDER BY position';
    const values = [listId];

    const { rows } = await client.query(sql, values);
    client.end();

    return rows;
  }
}