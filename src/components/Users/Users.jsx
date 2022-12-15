import React, {useState} from "react";
import axios from "axios";
import Show from "../../pages/Profile/Show/Show";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const TOKEN = localStorage.getItem('token');
    
    const getUsers = async () => {
        try {
        const response = await axios.get("http://127.0.0.1:8000/api/users");
        console.log(response.data.data)
        setUsers(response.data.data);
        } catch (e) {
        setError(true);
        }
        setLoading(false);
    };

    const Edit = (e) => {
        e.preventDefault();
        let id = e.target.id;
        window.location.href = `/profile/edit/${id}}`;
    }

    const Delete = (e) => {
        e.preventDefault();
        let id = e.target.id;
        window.location.href = `/admin/user/delete/${id}`;
    }

    const Show = (e) => {
        e.preventDefault();
        let id = e.target.id;
        window.location.href = `/admin/user/show/${id}`;
    }

    const GoToRegistration = (e) => {
        e.preventDefault();
        window.location.href = "/register";
    }
    
    return (
        <div id="user-data">
            <h1>Users</h1>
            <button className="btn btn-info text-light" onClick={getUsers}>Load User Data</button>
            <button className="btn btn-success mx-2" onClick={GoToRegistration}>Add User</button>
            {error && <p>Error</p>}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Updated At</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        ((user.api_token!==TOKEN) ? (
                            <tr key={user.id}>
                                <th scope="row">{user.id}</th>
                                <td>{user.first_name+" "+ user.last_name}</td>
                                <td>{user.email}</td>
                                <td>{
                                    new Date(user.created_at).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })
                                    }</td>
                                <td>{
                                    new Date(user.updated_at).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })
                                    }</td>
                                <td>
                                    <button className="btn btn-primary mx-2" id={user.id} onClick={Show}>Show Detail</button>
                                    <button className="btn btn-info mx-2" id={user.id} onClick={Edit}>Edit</button>
                                    <button className="btn btn-danger" id={user.id} onClick={Delete}>Delete</button>
                                </td>
                            </tr>
                        ) : (
                            null
                        )
                        )
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;