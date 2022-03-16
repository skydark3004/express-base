import * as ctrl from './item.controller';
import * as express from 'express';
const router = express.Router();

router.get('/', ctrl.getAll);

router.post('/upload', ctrl.uploadFileMulter, ctrl.uploadFile);

router.patch('/softDelete/:id', ctrl.softDelete);
router.patch('/restore/:id', ctrl.restore);

router.delete('/:id', ctrl.destroy);

export = router;
