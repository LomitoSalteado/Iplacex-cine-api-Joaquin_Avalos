import express from 'express';
import peliculaController from './controller.js';

const router = express.Router();


router.post('/', peliculaController.handleInsertPeliculaRequest);
router.get('/', peliculaController.handleGetPeliculasRequest);
router.get('/:id', peliculaController.handleGetPeliculaRequest);
router.put('/:id', peliculaController.handleUpdatePeliculaRequest);
router.delete('/:id', peliculaController.handleDeletePeliculaRequest);
router.post('/search', peliculaController.handleSearchPeliculaRequest);

export default router;
