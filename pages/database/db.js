const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    databasae: 'pengelola_barang',
})

module.exports = db;