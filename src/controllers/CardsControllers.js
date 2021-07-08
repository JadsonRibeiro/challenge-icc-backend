import { getPgClient } from "../database/connection.js";

export default {
  async index(req, res) {
    const { listId } = req.params;

    const client = getPgClient();
    
    const sql = 'SELECT * FROM cards WHERE list_id=$1 ORDER BY position;';
    const values = [listId];

    const { rows } = await client.query(sql, values);
    client.end();

    res.json(rows);
  },
  async show(req, res) {
    const { listId, cardId } = req.params;
    
    const client = getPgClient();
    
    const sql = 'SELECT * FROM cards WHERE list_id = $1 AND card_id = $2 ORDER BY position;';
    const values = [listId, cardId];

    const { rows } = await client.query(sql, values);

    client.end();

    res.json(rows[0]);
  },
  async create(req, res) {
    const { listId } = req.params;

    const { title, position } = req.body;

    const client = getPgClient();

    const sql = 'INSERT INTO cards(title, position, list_id) VALUES($1, $2, $3);';
    const values = [title, position, listId];

    try {
      await client.query(sql, values);
      res.status(201).json({ message: "Card add successfully!" });
    } catch(e) {
      console.log("Erro on inserting card", e)
      res.status(500).json({ message: "Erro on inserting card" });
    }
    
    client.end();
  },
  async delete(req, res) {
    const { listId, cardId } = req.params;

    const client = getPgClient();

    const sql = 'DELETE FROM cards WHERE list_id = $1 AND card_id = $2;';
    const values = [listId, cardId];

    try {
      await client.query(sql, values);
      res.json({ message: "Card deleted successfully" });
    } catch(e) {
      res.status(500).json({ message: "Erro on deleting card" });
    }

    client.end();
  },
  async update(req, res) {
    const { listId, cardId } = req.params;
    const { title, position } = req.body;

    const client = getPgClient();

    const sql = 'UPDATE cards SET title=$1, position=$2 WHERE list_id = $3 AND card_id = $4;';
    const values = [title, position, listId, cardId];

    try {
      const result = await client.query(sql, values);
      res.json({ message: "Card updated successfully" });
    } catch(e) {
      res.status(500).json({ message: "Erro on updating card" });
    }
    
    client.end();
  }
}