import React, { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ShowFlat = () => {
    const TOKEN = localStorage.getItem('token');
    const [flats, setFlats] = React.useState([]);
    
    useEffect(() => {
        const BASEURL = "http://127.0.0.1:8000/api/flats?api_token=" + TOKEN;
        axios.get(BASEURL)
            .then((response) => {
                console.log(response.data.message);
                setFlats(response.data.message);
            }
            )
            .catch((error) => {
                console.log(error);
            }
            )
    }, []);

    const handleDelete = (e) => {
        e.preventDefault();
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
                const BASEURL = "http://127.0.0.1:8000/api/flat/" + e.target.id;
        axios.delete(BASEURL)
            .then((response) => {
                if (response.data.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: response.data.message,
                        showConfirmButton: false,
                        timer: 2000
                    })
                    window.location.href = "/show-flat";
                }
                else if (response.data.status === 400) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
            }
            )
            .catch((error) => {
                console.log(error);
            }
            );
            }
        })
    }

    const handleEdit = (e) => {
        e.preventDefault();
        window.location.href = "/edit-flat/" + e.target.id;
    }

    return (
        <div>
            <h1>Flats</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Description</th>
                        <th scope="col">Monthly Rent</th>
                        <th scope="col">Size</th>
                        <th scope="col">Street</th>
                        <th scope="col">Road</th>
                        <th scope="col">City</th>
                        <th scope="col">State</th>
                        <th scope="col">Postal Code</th>
                        <th scope="col">Rented</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        flats.map((flat) => {
                            return (
                                <tr key={flat.id}>
                                    <td>{flat.description}</td>
                                    <td>{flat.monthly_rent}</td>
                                    <td>{flat.size}</td>
                                    <td>{flat.street}</td>
                                    <td>{flat.road}</td>
                                    <td>{flat.city}</td>
                                    <td>{flat.state}</td>
                                    <td>{flat.postal_code}</td>
                                    <td>{flat.is_rented===1? "YES":"NO"}</td>
                                    <td>
                                        <button className="btn btn-primary mx-2" id={flat.id} onClick={handleEdit}>Edit</button>
                                        <button className="btn btn-danger" id={flat.id} onClick={handleDelete}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ShowFlat;