import React,{useEffect,useState} from "react";
import axios from "axios";
import { useParams } from "react-router";
import Swal from "sweetalert2";

const Edit = () => {
    let { id } = useParams();
    let intialValues = {
        first_name: "",
        last_name: "",
        email: "",
        present_address: "",
        permanent_address: "",
        phone: "",
        nid: "",
        date_of_birth: "",
    };

    const getProfile = () => {
        const BASEURL = `http://127.0.0.1:8000/api/users/${id}/edit`
        axios.get(BASEURL)
        .then((response) => {
            console.log(response.data.message);
            setFormValues({
                first_name: response.data.message.first_name,
                last_name: response.data.message.last_name,
                email: response.data.message.email,
                present_address: response.data.message.present_address,
                permanent_address: response.data.message.permanent_address,
                phone: response.data.message.phone,
                nid: response.data.message.NID,
                date_of_birth: response.data.message.date_of_birth,
            });
        }
        )
        .catch((error) => {
            console.log(error);
        }
        );
    };

    useEffect(() => {
        getProfile();
    }, []);
    
    const [formValues, setFormValues] = useState(intialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    //form validation handler
    const validate = (values) => {
        let errors = {};
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        
        if (!values.first_name) {
            errors.first_name = "First Name Required";
        }
        if (!values.last_name) {
            errors.last_name = "Last Name Required";
        }
        if (!values.email) {
            errors.email = "Email Required";
        } else if (!regex.test(values.email)) {
            errors.email = "Invalid Email";
        }
        
        return errors;
    };
    
    //input change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
    //form submission handler
    const handleSubmit = (e) => {
        const BASEURL = `http://127.0.0.1:8000/api/profile/edit/${id}`;
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmitting(true);
        if (formValues.first_name && formValues.last_name && formValues.email) {
            axios.put(BASEURL, formValues)
            .then((response) => {
                console.log(response.data);
                if(response.data.status===200){
                    Swal.fire({
                        icon: 'success',
                        title: 'Booom!!',
                        text: response.data.message,
                        button: 'OK'
                    })
                    intialValues = {
                        username: "",
                        email: "",
                        password: "",
                        date_of_birth: "",
                        first_name: "",
                        last_name: "",
                        nid: "",
                        phone:"",
                        present_address: "",
                        permanent_address: "",
                        role: "",
                    };
                }
                else if(response.data.status===400){
                    setFormErrors(...response.data.message)
                    Swal.fire({
                        icon: 'error',
                        title: 'Update Failed',
                        button: 'Try Again'
                    })
                }
            }
            )
            .catch((error) => {
                console.log(error);
            }
            );
        }
    };

    const TOKEN = localStorage.getItem("token");
    if (!TOKEN) {
        return(
            <div className="container mt-3">
                <div className="row">
                    <h3>Please Login First</h3>
                </div>
            </div>
        )
    }
    else{
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-header">
                                <h3>Edit Profile</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="first_name">First Name</label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            id="first_name"
                                            className="form-control"
                                            value={formValues.first_name}
                                            onChange={handleChange}
                                        />
                                        {formErrors.first_name && (
                                            <span className="text-danger">{formErrors.first_name}</span>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="last_name">Last Name</label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            id="last_name"
                                            className="form-control"
                                            value={formValues.last_name}
                                            onChange={handleChange}
                                        />
                                        {formErrors.last_name && (
                                            <span className="text-danger">{formErrors.last_name}</span>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="form-control"
                                            value={formValues.email}
                                            onChange={handleChange}
                                            disabled={true}
                                        />
                                        {formErrors.email && (
                                            <span className="text-danger">{formErrors.email}</span>
                                        )}
                                    </div>
    
                                    <div className="form-group">
                                        <label htmlFor="present_address">Present Address</label>
                                        <input
                                            type="text"
                                            name="present_address"
                                            id="present_address"
                                            className="form-control"
                                            value={formValues.present_address}
                                            onChange={handleChange}
                                        />
                                    </div>
    
                                    <div className="form-group">
                                        <label htmlFor="permanent_address">Permanent Address</label>
                                        <input
                                            type="text"
                                            name="permanent_address"
                                            id="permanent_address"
                                            className="form-control"
                                            value={formValues.permanent_address}
                                            onChange={handleChange}
                                        />
                                    </div>
    
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            className="form-control"
                                            value={formValues.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
    
                                    <div className="form-group">
                                        <label htmlFor="nid">NID</label>
                                        <input
                                            type="text"
                                            name="nid"
                                            id="nid"
                                            className="form-control"
                                            value={formValues.nid}
                                            onChange={handleChange}
                                        />
                                    </div>
    
                                    <div className="form-group mt-2">
                                        <button type="submit" className="btn btn-primary">
                                            Update
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Edit;