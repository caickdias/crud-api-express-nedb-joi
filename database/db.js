
const nedb = require('nedb-async').AsyncNedb;
const DB_PATH = process.env.DB_PATH || '../data.db';

const db = new nedb({ filename: DB_PATH, autoload: true});

module.exports = db;