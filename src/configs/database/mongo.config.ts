import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
import * as chalk from 'chalk';

import APP_CONFIG from '../app.config';

export default function () {
  (<any>mongoose).Promise = Promise;
  connectDb(() => {
    if (!APP_CONFIG.IS_TESTING)
      seed();
    if (APP_CONFIG.IS_PRODUCTION)
      seedProd();
    if (APP_CONFIG.IS_STAGING)
      seedDev();
  });
}

/**
 * @method connectDb
 * @description connection database
 * @param {Function} callback
 */
function connectDb(callback?: Function) {
  if ('function' !== typeof callback) callback = function () {
  };
  let isConnectedBefore = false;
  const uri = `mongodb://${APP_CONFIG.ENV.DATABASE.MONGODB.HOST}:${APP_CONFIG.ENV.DATABASE.MONGODB.PORT}/`
    + `${APP_CONFIG.ENV.DATABASE.MONGODB.NAME}`;
  const connectionOptions: mongoose.ConnectionOptions = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  };
  if (APP_CONFIG.ENV.DATABASE.MONGODB.USERNAME) {
    connectionOptions.user = APP_CONFIG.ENV.DATABASE.MONGODB.USERNAME;
    connectionOptions.pass = APP_CONFIG.ENV.DATABASE.MONGODB.PASSWORD;
  }

  connect();

  function connect() {
    if (isConnectedBefore) {
      console.info('Db reconnecting...');
    }
    mongoose.connect(uri, connectionOptions).done();
  }

  mongoose.connection.on('error', function (err) {
    console.log('Could not connect to Mongodb: ', err);
  });

  mongoose.connection.on('disconnected', function () {
    console.log('Db has lost connection...');
    if (!isConnectedBefore) {
      setTimeout(connect, 5000);
    }
  });

  mongoose.connection.on('connected', function () {
    isConnectedBefore = true;
    console.info(chalk.blue.bgBlack(`[Mongodb] "${APP_CONFIG.ENV.DATABASE.MONGODB.NAME}" has connected successfully!`));
    callback();
  });

  mongoose.connection.on('reconnected', function () {
    console.log('Db has reconnected!');
  });

  process.on('SIGINT', function () {
    mongoose.connection.close()
      .then(() => {
        console.log('Mongoose default connection disconnected through app terminal!');
        process.exit(0);
      });
  });
}

function seed() { }
function seedProd() { }
function seedDev() { }
