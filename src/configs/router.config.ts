import { Request, Response } from 'express';
import * as glob from 'glob';
import * as path from 'path';
import * as chalk from 'chalk';
import * as express from 'express';

import { router } from '../libs/standard';
import APP_CONFIG from './app.config';
import { AppConst } from '../common/constants/app.const';
import { setLanguage, removeLanguage } from '../common/constants';

//import folderRoutes = require('../routes/folderRoutes');
//import itemRoutes = require('../routes/itemRoutes');
import itemRoutes = require('../api/item-api/item.routes');
import folderRoutes = require('../api/folder-api/folder.routes');





/**
 * @method registerRoutes
 * @description register router application
 * @param {e.Express} app
 */
export default function (app: express.Express) {
  const routes = glob.sync(path.normalize(APP_CONFIG.ROOT + `/api/**/*.route.{ts,js}`));
  const routesAdmin = glob.sync(path.normalize(APP_CONFIG.ROOT + `/api-admin/**/*.route.{ts,js}`));
  // basic router ******
  app.use('/api/folder', folderRoutes);
  app.use('/api/item', itemRoutes);
  //app.use('/api/example', example);



  app.use('/apidocs', (req, res, next) => {
    express.static(path.join(__dirname, '../public'))(req, res, next);
  });

  


  app.use((req: any, res: any, next: any) => {
    if (req.query.lang) setLanguage(req);
    else removeLanguage();
    next();
});
  // api router ********
  routes.forEach((route) => {
    const routerChild = require(route).default;
    if (routerChild) console.log(chalk.yellow(`Router "/${AppConst.API_PREFIX}/${AppConst.API_VERSION}/${routerChild}" has been registered!`));
  });
  routesAdmin.forEach((route) => {
    const routerChild = require(route).default;
    if (routerChild)
      console.log(chalk.yellow(`Router "/${AppConst.API_PREFIX}/${AppConst.API_VERSION}/admin/${routerChild}" has been registered!`));
  });
  app.use(`/${AppConst.API_PREFIX}/${AppConst.API_VERSION}`, router);
}
