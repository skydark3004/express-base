import * as path from 'path';
import { AppEnvironment } from './../../common/interfaces';
import * as dotenv from 'dotenv';

const ROOT = path.normalize(__dirname + '/../..');
dotenv.config({ path: `${ROOT}/configs/environment/.env` });
const envConfig: AppEnvironment = {
    NAME: process.env.NAME || 'service',
    NODE_ENV: process.env.NODE_ENV || 'local',
    APP: {
        PORT: Number(process.env.APP_PORT || '8888'),
    },
    DATABASE: {
        MONGODB: {
            USERNAME: process.env.DB_MONGO_USER || '',
            PASSWORD: process.env.DB_MONGO_PASS || '',
            HOST: process.env.DB_MONGO_HOST || '127.0.0.1',
            PORT: Number(process.env.DB_MONGO_PORT || '27017'),
            NAME: process.env.DB_MONGO_NAME || 'local-service',
        }
    },
    SECURE: {
        JWT: {
            JWT_SECRET: process.env.SYSTEM_SECRET_JWT || 'token-secret-jwt',
            TOKEN_EXPIRE: 24 * 60 * 60 * 30, // 30 days
        }
    },
    DOCUMENT: {
        DOC_DEV: path.join(__dirname, '../../../', 'public/docdev'),
        DOC_API: path.join(__dirname, '../../../', 'public/docapi'),
    },
    API_RESTRICT: {
        CLIENT_SECRET: process.env.SYSTEM_SECRET_KEY
    }
};
export default envConfig;