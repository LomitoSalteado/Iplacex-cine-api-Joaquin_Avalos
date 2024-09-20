import express from 'express';
import actorController from './controller.js';

const router = express.Router();


router.post('/', actorController.handleInsertActorRequest);
router.get('/', actorController.handleGetActoresRequest);  
router.get('/:id', actorController.handleGetActorRequest); 
router.put('/:id', actorController.handleUpdateActorRequest);
router.delete('/:id', actorController.handleDeleteActorRequest); 
router.post('/search', actorController.handleSearchActorRequest); 

export default router;
