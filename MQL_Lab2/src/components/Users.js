import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";

function Users() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:3001/')
            .then(res => {
                console.log(res);
                setData(res.data);
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deleteuser/' + id)
            .then(res => {
                console.log(res);
                fetchData(); // Trigger re-fetch after deletion
            })
            .catch(err => console.log(err));
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter data based on search query
    const filteredData = data.filter(user => {
        return user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
               user.age.toString().includes(searchQuery);
    });

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <Link to="/create" className="btn btn-success btn-sm">
                    Add Data
                </Link>
                <input
                    type="text"
                    placeholder="Search users"
                    className="form-control mt-3"
                    value={searchQuery}
                    onChange={handleSearch}
                />
                {filteredData.length === 0 && (
                    <p>No results found</p>
                )}
                {filteredData.length > 0 && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Age</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.age}</td>
                                        <td>
                                            <Link to={`/edit/${user._id}`} className="btn btn-sm btn-success me-2">Update</Link>
                                            <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default Users;
