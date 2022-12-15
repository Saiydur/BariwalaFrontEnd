import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";

const Delete = () => {
    let {id} = useParams();

    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/users/"+id+"/delete")
        .then(res => {
            setUser(res.data.message);
        }
        )
        .catch(err => {
            console.log(err);
        }
        )
    }, []);

    const DeleteNow = (e) => {
        e.preventDefault();
        let id = e.target.id;
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.isConfirmed) {
                axios.delete("http://127.0.0.1:8000/api/users/"+id)
                .then(res => {
                    Swal.fire(
                        {
                            icon: 'success',
                            title: 'Deleted!',
                            text: 'User has been deleted.',
                            timer: 2000
                        }
                    )
                    window.location.href = "/admin/users";
                }
                )
                .catch(err => {
                    console.log(err);
                }
                )
            }
        })
    }

    return (
        <div className="container">
            <h1>Delete User</h1>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{user.first_name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                            <button className="btn btn-danger" id={user.id} onClick={DeleteNow}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Delete;