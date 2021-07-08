import { Router } from 'express';

import CardsController from './controllers/CardsControllers.js';
import ListsController from './controllers/ListsControllers.js';

import { createTables, dropTables } from './database/actions.js';

const routes = Router();

routes.post('/lists', ListsController.create);
routes.get('/lists', ListsController.index);
routes.get('/lists/:listId', ListsController.show);
routes.delete('/lists/:listId', ListsController.delete);
routes.put('/lists/:listId', ListsController.update);

routes.post('/lists/:listId/cards', CardsController.create);
routes.get('/lists/:listId/cards', CardsController.index);
routes.get('/lists/:listId/cards/:cardId', CardsController.show);
routes.delete('/lists/:listId/cards/:cardId', CardsController.delete);
routes.put('/lists/:listId/cards/:cardId', CardsController.update);

// To test
routes.delete('/database', (_, res) => {
  try {
    dropTables();
    res.json('Tables droped');
  } catch(e) {
    console.log('Error on tables drop', e);
    res.json('Erron on tables drop');
  }
});

routes.post('/database', (_, res) => {
  try {
    createTables();
    res.json('Tables created');
  } catch(e) {
    console.log('Erron on create tables', e);
    res.json('Erron on create tables')
  }
})


export default routes;