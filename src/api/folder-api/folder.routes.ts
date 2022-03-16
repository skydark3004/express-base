import * as ctrl from './folder.controller';
import * as express from 'express';
const router = express.Router();

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.get('/allItems/:id', ctrl.getAllItemsInFolder);

router.post('/create', ctrl.create);

router.patch('/:id', ctrl.editName);
router.patch('/softDelete/:id', ctrl.softDelete);
router.patch('/restore/:id', ctrl.restore);

router.delete('/:id', ctrl.destroy);




export = router;
