import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Swal from "sweetalert2";

const DeleteFlat = () => {
    let { id } = useParams();
    const [flat, setFlat] = React.useState([]);

    useEffect(() => {
        const BASEURL = "http://127.0.0.1:8000/api/flat/" + id;
        axios.get(BASEURL)
            .then((response) => {
                setFlat(response.data.message);
            }
            )
            .catch((error) => {
                console.log(error);
            }
            )
    }, []);

    const deleteFlat = (e) => {
        e.preventDefault();
        const BASEURL = "http://127.0.0.1:8000/api/flat/" + id;
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
}

export default DeleteFlat;