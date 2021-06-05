import * as express from 'express';
import * as compression from 'compression';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as expressValidator from 'express-validator';
import { AppConst } from '../common/constants/app.const';
import { SessionConfig } from '../libs/auth/session-auth/session.config';

export default function (app: express.Express) {
  if (process.env.NODE_ENV !== AppConst.NODE_ENV.PRODUCTION
    && process.env.NODE_ENV !== AppConst.NODE_ENV.TEST) {
    app.use(morgan('dev'));
  }

  /**
   * @description Middleware here
   */
  app.use(helmet());  // protected http header
  app.use(cors(SessionConfig.corsConfig())); // control cross resources
  app.use(bodyParser.json({ limit: '30mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
  app.use(compression());
  app.use(expressValidator());

  /**
   * Handle request errors
   * these middleware will be registered after all routes & other middleware
   */
  setImmediate(() => {
    app.use(function (err: Error, req: express.Request, res: express.Response,
      next: express.NextFunction) {
      res.bad(err);
    });
    app.use(function (req: express.Request, res: express.Response,
      next: express.NextFunction) {
      res.status(404).bad();
    });
  });
}
