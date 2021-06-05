import * as http from 'http';
import * as express from 'express';
import * as chalk from 'chalk';

import APP_CONFIG from './configs/app.config';
import databaseConfig from './configs/database';
import expressConfig from './configs/express.config';
import configServer from './configs/server.config';
import routerConfig from './configs/router.config';
import bootstrapConfig from './configs/bootstrap.config';
import { Server } from 'http';

const app = express();

databaseConfig();       // config connect db (mongodb & redis)
expressConfig(app);     // config express app
routerConfig(app);    // config register router
bootstrapConfig();      // load bootstrapping config

const server: Server = http.createServer(app);
configServer(server);
server.listen(APP_CONFIG.ENV.APP.PORT, () => {
  const serverAddress: any = server.address();
  console.info(chalk.bgCyan.black(`Server's running at: ${serverAddress.address}/${serverAddress.port}`));
});

export default app;

