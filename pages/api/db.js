import mysql from 'mysql2/promise'
import { NextApiRequest, NextApiResponse } from 'next'

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

export default db;

export const connect = async () => {
    return await db.getConnection();
};