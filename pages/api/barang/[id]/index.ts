import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../db";


export default async(req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const {id} = req.query;
        try {
            const connection = await connect();
            const [rows]: any[] = await connection.execute('SELECT * FROM barang WHERE id  = ? limit 1', [id]);
            console.log('rows', rows[0])
            connection.release();
            if (rows.length === 1) {
                res.status(200).json({data: rows[0], message : 'data barang bedasarkan id' })
            } else {
                res.status(404).json({message: 'barang tidak di temukan'})
            }
        } catch (error) {
            res.status(500).json({error: 'internal server error'})
        }
        
    } else if (req.method === 'PATCH') {
        const { nama, stok } = req.body, {id} = req.query;
        try {
            const connection = await connect();
            const [rows]: any[] = await connection.execute('UPDATE barang SET nama = ?, stok = ? WHERE id = ?', [nama, stok, id]);
            if (rows.affectedRows > 0) {
              res.status(200).json({ data: { id, nama, stok }, message: 'Data barang telah berhasil diupdate' });
            } else {
            res.status(404).json({message: 'barang tidak di temukan'})
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else if (req.method === 'DELETE') {
        const {id} = req.query;
        try {
            const connection = await connect();
            const [rows]: any[] = await connection.execute('DELETE FROM barang WHERE id = ?', [id])
            if (rows.affectedRows > 0) {
                res.status(200).json({ message: 'data telah berhasil di hapus'})
            } else {
                res.status(404).json({ error: 'barang tidak ditemukan' });
            }
        } catch (error) {
            res.status(500).json({error: 'internal server error'})
        }
    } else {
        return res.status(405).end();
    }
}