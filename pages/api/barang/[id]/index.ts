import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../db";

export default async(req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const {id} = req.query;
        if (!id) {
            return res.status(400).json({ error: 'ID is required' });
        }
        try {
            const connection = await connect();
            const [rows] = await connection.execute('SELECT * FROM barang WHERE id  = ?', [id]);
            connection.release();
            res.status(200).json({data: rows, message : 'data barang bedasarkan id' })
        } catch (error) {
            res.status(500).json({error: 'internal server error'})
        }
    } else if (req.method === 'PATCH') {
        const { nama, stok } = req.body, {id} = req.query;
        if (!id) {
          return res.status(400).json({ error: 'ID is required' });
        }
        try {
          const connection = await connect();
          await connection.execute('UPDATE barang SET nama = ?, stok = ? WHERE id = ?', [nama, stok, id]);
          res.status(200).json({ data: { id, nama, stok }, message: 'Data telah berhasil diupdate' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
    } else if (req.method === 'DELETE') {
        const {id} = req.query;
        if (!id) {
            return res.status(400).json({ error: 'ID is required' });
        }
        try {
            const connection = await connect();
            await connection.execute('DELETE FROM barang WHERE id = ?', [id])
            res.status(200).json({ message: 'data telah berhasil di hapus'})
        } catch (error) {
            res.status(500).json({error: 'internal server error'})
        }
    } else {
        return res.status(405).end();
    }
}