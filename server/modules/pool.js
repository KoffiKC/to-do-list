const pg = require('pg');
const Pool = pg.Pool;

const config = {
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
};

const pool = new Pool(config);

pool.on('connect', () => {
    console.log('notepad online');
})


pool.on('error', (error) => {
    console.log('not even a post-it is present', error);
})

module.exports = pool;