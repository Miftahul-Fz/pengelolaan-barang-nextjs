import React from 'react';
import { useState } from 'react';

export const inputBarang = () => {
    const [inputBarang, setInputBarang] = useState({
        nama: "",
        stok: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.defaultPrevented;
        const { name, value } = e.target;
        setInputBarang({ ...inputBarang, [name]: value });
    };

    const handleSubmit = async (e:  React.FormEvent<HTMLFormElement>) => {
        e.defaultPrevented;
        try {
            const Response = await fetch('http://localhost:3000/api/barang', {
                method: "POST",
            headers: {
            "Content-Type": "application/json",
            Accept: 'aplication/json',
            // Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(inputBarang),
            })
            if (Response.ok) {
                console.log("Data berhasil ditambahkan");
            } else {
                console.error('gagal menambahkan data')
            }
        }catch (error) {
            console.error('Terjadi kesalahan', Error)
        }
    }

    return (
        <div>
            <div className="header">
                <h1 style={{textAlign: 'center', fontFamily: 'Times New Roman'}} className="text-Primary"> Form Tambah Data </h1>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label> Nama Barang </label>
                    <input 
                        className='form-control'
                        type="text"
                        name='nama'
                        value={inputBarang.nama}
                        onChange={handleChange}
                    />
                    <label> Stok Barang </label>
                    <input 
                        className='form-control'
                        type="text"
                        name='stok'
                        value={inputBarang.stok}
                        onChange={handleChange}
                    />
                    <button type="submit" className="btn btn-primary btn-sm"> SIMPAN</button>
               </form>
            </div>
        </div>
    )
}

export default inputBarang;