import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from "react-hook-form";

interface BarangForm {
    nama: string;
    stok: number;
} 
interface Barang{
    id: number;
    nama: string;
    stok: number
}

const EditBarang = () => {
    const Router = useRouter();
    const { id } = Router.query;
    const { register, handleSubmit, formState: { errors } } = useForm<BarangForm>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [editBarang, setEditBarang] = useState<Barang>();

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:3000/api/barang/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }
            })
            .then((Response) => Response.json())
            .then((barang) => {
                console.log('data from api: ', barang.data); 
                setEditBarang(barang.data);
                console.log('barang: ', barang);
                console.log('is loading:',isLoading)
            })
            .catch((error) => {
                console.log(error);
            });
        }
        setIsLoading(false);
    }, [id]);
    

    const onSubmit: SubmitHandler<BarangForm> = async (data) => {
        try {
            if (id) {
                const Response = await fetch(`http://localhost:3000/api/barang/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(data)
                });
                if (Response.ok) {
                    console.log('Data berhasil diperbarui');
                    window.location.href = "/barang";
                } else {
                    console.error("Gagal memperbarui data");
                }
            }
        } catch (error) {
            console.error('Terjadi kesalahan', error);
        }
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div className="header">
                <h1 style={{textAlign: 'center', fontFamily: 'Times New Roman'}} className="text-Primary">Form Tambah Data</h1>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Nama Barang:</label>
                        <div className="col-sm-10">
                            <input
                            className="form-control"
                            type="text"
                            {...register('nama', { required: true })}
                            defaultValue={editBarang?.nama}
                            />
                            {errors.nama && <span>Mohon masukan nama barang</span>}
                        </div>
                    </div>
                    <br />
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Stok:</label>
                        <div className="col-sm-10">
                            <input
                                className="form-control"
                                type="number"
                                {...register('stok', { required: true })}
                                defaultValue={editBarang?.stok}
                                />
                                {errors.stok && <span>Mohon masukan stok barang</span>}
                        </div>
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary btn-sm">SIMPAN</button>
                </form>
                <br />
            </div>
        </div>
    )
}

export default EditBarang;
