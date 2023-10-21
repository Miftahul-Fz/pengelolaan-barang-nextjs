import { NextApiRequest, NextApiResponse } from "next";
import {connect} from "../db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const connection = await connect();
            const [rows] = await connection.query('SELECT * FROM barang');
            connection.release();
            res.status(200).json({data: rows, message: 'daftar data barang' });
        } catch (error) {
            res.status(500).json({error: 'internal server error'})
        }
    } else if (req.method === 'POST'){
        const {nama, stok} = req.body;
        if (!nama || !stok) {
            res.status(400).json({ error: 'Data sudah ada' });
            return;
        }

        try {
            const connection = await connect();
            await connection.execute('INSERT INTO barang (nama, stok) VALUES (?, ?)', [nama, stok]);
            res.status(201).json({data: {nama, stok}, message: 'tambah data berhasil' });
        } catch (error) {
            res.status(500).json({error: 'internal server error'})
        }
    }  else {
        return res.status(450).end;
    }
}