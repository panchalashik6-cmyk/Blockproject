import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Blog() {

    const [state, setState] = useState([])
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        Gender: ""
    })
    const [editId, setEditId] = useState(null)

    const API = "http://localhost:3004/data"

    const getData = async () => {
        const res = await axios.get(API)
        setState(res.data)
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (editId) {
            await axios.put(`${API}/${editId}`, form)
            setEditId(null)
        } else {
            await axios.post(API, form)
        }

        setForm({
            name: "",
            email: "",
            password: "",
            Gender: ""
        })

        getData()
    }

    const deleteData = async (id) => {
        await axios.delete(`${API}/${id}`)
        getData()
    }

    const editData = (el) => {
        setForm({
            name: el.name,
            email: el.email,
            password: el.password,
            Gender: el.Gender
        })
        setEditId(el.id)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="container mt-5">

            <div className="card p-4 shadow col-md-4 mx-auto">
                <h3 className="text-center mb-3">
                    {editId ? "Update User" : "Add User"}
                </h3>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={form.name}
                        onChange={handleChange}
                        className="form-control mb-2"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={form.email}
                        onChange={handleChange}
                        className="form-control mb-2"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={form.password}
                        onChange={handleChange}
                        className="form-control mb-2"
                    />

    
                    <div className="mb-3 text-start">
                        <label className="form-label"><b>Select Gender:</b></label>

                        <div>
                            <input
                                type="radio"
                                name="gender"
                                value="React"
                                checked={form.gender === "Male"}
                                onChange={handleChange}
                            /> Male
                        </div>

                        <div>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={form.gender === "female"}
                                onChange={handleChange}
                            /> female
                        </div>

                        <div>
                            <input
                                type="radio"
                                name="gender"
                                value="other"
                                checked={form.gender === "other"}
                                onChange={handleChange}
                            /> other
                        </div>
                    </div>

                    <button className="btn btn-primary w-100">
                        {editId ? "Update" : "Add"}
                    </button>
                </form>
            </div>

            <div className="mt-5">
                <table className="table table-bordered table-hover text-center">
                    <thead className="table-primary">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Gender</th>
                            <th>button</th>
                        
                        </tr>
                    </thead>

                    <tbody>
                        {state.map((el) => (
                            <tr key={el.id}>
                                <td>{el.name}</td>
                                <td>{el.email}</td>
                                <td>{el.password}</td>
                                <td>{el.subject}</td>

                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => editData(el)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteData(el.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

        </div>
    )
}