import router from '../../libs/standard/routing.lib';
import * as ctrl from './template-example.controller';
import { AppConst } from '../../common/constants';

router.post('/template-controller', ctrl.create, {
  roles: Object.values(AppConst.ADMIN_ROLES)
});
router.put('/template-controller/:id', ctrl.update, {
  roles: Object.values(AppConst.ADMIN_ROLES)
});
router.get('/template-controller/list', ctrl.getList, {
  roles: Object.values(AppConst.ADMIN_ROLES)
});
router.get('/template-controller/:id', ctrl.getDetailById, {
  roles: Object.values(AppConst.ADMIN_ROLES)
});
router.delete('/template-controller/:id', ctrl.deleteObjById, {
  roles: Object.values(AppConst.ADMIN_ROLES)
});
router.patch('/template-controller/:id/change-status-active', ctrl.changeStatusActive, {
  roles: Object.values(AppConst.ADMIN_ROLES)
});

export = router;
