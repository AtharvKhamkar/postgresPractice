const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "db",
    database: "stdinfo",
    password: "mysecretpassword",
});

module.exports = pool;