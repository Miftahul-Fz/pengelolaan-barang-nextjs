import { useEffect, useState } from "react";

type Barang = {
    id: number;
    nama: string;
    stok: number;
}

export default function indexBarang() {
    const [barangs, setBarangs] = useState<Barang[]>([]);

    const fetchBarang = async () => {
        try {
            const Response= await fetch('http://localhost:3000/api/barang')
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

    return (
        <div className="main-content mt-5">
            <div>
                <h1 className="text-primary text-center">Data Barang Gudang</h1>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card">
                            <div className="card-body">
                                <table className="table table-borderedx" >
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Nama</th>
                                            <th>Stok</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {barangs.map((item, index) => (
                                        <tr key={item.id}>
                                            <td> {index + 1} </td>
                                            <td> {item.nama} </td>
                                            <td> {item.stok} </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>       
        </div>
    )
}
