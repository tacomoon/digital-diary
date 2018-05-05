'use strict';

module.exports = {
    db: {
        config: {
            username: process.env.PROD_DB_USERNAME,
            password: process.env.PROD_DB_PASSWORD,
            database: process.env.PROD_DB_NAME,
            host: process.env.PROD_DB_HOSTNAME,
            port: process.env.PROD_DB_PORT,
            dialect: 'postgres'
        }
    }
};