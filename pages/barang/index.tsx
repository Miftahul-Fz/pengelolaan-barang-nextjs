import React, { useEffect, useState } from "react";
import Link from "next/link";
import editBarang from "./edit/[id]";
import { useRouter } from 'next/router';

type Barang = {
    id: number;
    nama: string;
    stok: number;
}

export default function indexBarang() {
    const [barangs, setBarangs] = useState<Barang[]>([]);

    const fetchBarang = async () => {
        try {
            const Response= await fetch('http://localhost:3000/api/barang', {
                headers : {
                    Accept: 'aplication/json',
                }
            })
            if (Response.ok) {
                const dataBarang = await Response.json();
                console.log('barang: ', dataBarang);
                return dataBarang;
            } else {
                throw new Error("Gagal mengambil data");
            }
        }catch (error) {
            console.error('terjadi kesalahan', Error);
            return [];
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            fetchBarang().then((dataBarang) => {
                setBarangs(dataBarang.data);
            });
        }
    }, [setBarangs])

    const handleTambah = () => {
        window.location.href= "/barang/store"
    }
    const handleHapus = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/api/barang/${id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(editBarang)
            })
            if (response.ok) {
                setBarangs((prevBarangs) => prevBarangs.filter((barang) => barang.id !== id));
            } else {
                console.error('Gagal menghapus item');
            }
        } catch (error) {
            console.error('terjasi keasalahan', Error)
        }
    }

    return (
        <div>
            <div className="main-content mt-5">
                <h1 className="text-primary text-center">Data Barang Gudang</h1>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div><button onClick={handleTambah}> tambah data </button></div>
                        <div className="card">
                            <div className="card-body">
                                <table className="table table-borderedx" >
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Nama</th>
                                            <th>Stok</th>
                                            <th>Tags</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {barangs.map((barang, index) => (
                                        <tr key={barang.id}>
                                            <td> {index + 1} </td>
                                            <td> {barang.nama} </td>
                                            <td> {barang.stok} </td>
                                            <td>
                                                <Link href={`/barang/edit/${barang.id}`}>
                                                <button>Edit</button>
                                                </Link>
                                                <button onClick={() => handleHapus(barang.id)}>Hapus</button>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />       
        </div>
    )
}
