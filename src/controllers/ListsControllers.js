import { CardsManager } from "../database/CardsManager.js";
import { getPgClient } from "../database/connection.js";

export default {
  async index(req, res) {
    const client = getPgClient();
    
    const sql = 'SELECT * FROM lists ORDER BY position';
    const { rows: lists } = await client.query(sql);

    if(lists) {
      for (const list of lists) {
        const result = await CardsManager.getCards(list.list_id);
        list.cards = result;
      }
    }

    client.end();

    res.json(lists);
  },
  async show(req, res) {
    const { listId } = req.params;
    
    const client = getPgClient();
    
    const sql = 'SELECT * FROM lists WHERE list_id=$1 ORDER BY position;';
    const values = [listId];

    const { rows } = await client.query(sql, values);
    client.end();

    res.json(rows[0]);
  },
  async create(req, res) {
    const {name, position} = req.body;

    const client = getPgClient();

    const sql = 'INSERT INTO lists(name, position) VALUES($1, $2);';
    const values = [name, position];

    try {
      const result = await client.query(sql, values);
      res.status(201).json({ message: "List add successfully!" });
    } catch(e) {
      res.status(500).json({ message: "Erro on inserting list" });
    }
    
    client.end();
  },
  async delete(req, res) {
    const { listId } = req.params;

    const client = getPgClient();

    const deleteListsSQL = 'DELETE FROM lists WHERE list_id=$1;';
    const deleteCardsSQL = 'DELETE FROM cards WHERE list_id=$1;';

    const values = [listId];

    try {
      await client.query(deleteCardsSQL, values);
      await client.query(deleteListsSQL, values);
      res.json({ message: "List deleted successfully" });
    } catch(e) {
      console.log("Errron on deleting list", e);
      res.status(500).json({ message: "Erro on deleting list" });
    }

    client.end();
  },
  async update(req, res) {
    const { listId } = req.params;
    const { name, position } = req.body;

    const client = getPgClient();

    const sql = 'UPDATE lists SET name=$1, position=$2 WHERE list_id=$3;';
    const values = [name, position, listId];

    try {
      const result = await client.query(sql, values);
      res.json({ message: "List updated successfully" });
    } catch(e) {
      res.status(500).json({ message: "Erro on updating list" });
    }
    
    client.end();
  }
}