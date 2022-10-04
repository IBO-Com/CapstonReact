const maria = require('mysql');

const conn = maria.createConnection({
    host:'43.200.115.198',
    port: 3306,
    user: 'tester',
    password: 'pwd',
    database: 'Capston_Test'
})

module.exports = conn;