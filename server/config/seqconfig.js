'use strict';

module.exports = {
    development: {
        username: 'development',
        password: 'development',
        database: 'digital-diary',
        host: '127.0.0.1',
        port: 5432,
        dialect: 'postgres'
    },
    production: {
        username: process.env.PROD_DB_USERNAME,
        password: process.env.PROD_DB_PASSWORD,
        database: process.env.PROD_DB_NAME,
        host: process.env.PROD_DB_HOSTNAME,
        port: process.env.PROD_DB_PORT,
        dialect: 'postgres'
    }
};

// I'm sad to duplicate configs, but for now I do not know better solution TODO
// At least it works
// sequelize db:migrate[:undo:all] --env=(development|production)
