import axios from "axios";
import React,{useState} from "react";
import Swal from "sweetalert2";

const Registration = () => {

    let stateValues = {
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

    const [formValues, setFormValues] = useState(stateValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const validate = (values) => {
        let errors = {};

        if (!values.username) {
            errors.username = "Username Required";
        }

        if (!values.email) {
            errors.email = "Email Required";
        }

        if (!values.password) {
            errors.password = "Password Required";
        }

        if (!values.date_of_birth) {
            errors.date_of_birth = "Date of Birth Required";
        }

        if (!values.first_name) {
            errors.first_name = "First Name Required";
        }

        if (!values.last_name) {
            errors.last_name = "Last Name Required";
        }

        if (!values.nid) {
            errors.nid = "NID Required";
        }

        if (!values.phone) {
            errors.phone = "Phone Required";
        }

        if (!values.present_address) {
            errors.present_address = "Present Address Required";
        }

        if (!values.permanent_address) {
            errors.permanent_address = "Permanent Address Required";
        }

        if (!values.role) {
            errors.role = "Role Required";
        }

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmitting(true);
        axios.post("http://127.0.0.1:8000/api/signup", formValues)
            .then((response) => {
                if(response.data.status===200){
                    Swal.fire({
                        icon: 'success',
                        title: 'Registration Successful',
                        text: response.data.message,
                        button: 'OK'
                    })
                    stateValues = {
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
                        title: 'Registration Failed',
                        button: 'OK'
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header">
                            <h3>Registration</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <div>
                                        <label htmlFor="username">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            name="username"
                                            value={formValues.username}
                                            onChange={handleChange}
                                        />
                                        {formErrors.username && (
                                            <span className="text-danger">
                                                {formErrors.username}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={formValues.email}
                                            onChange={handleChange}
                                        />
                                        {formErrors.email && (
                                            <span className="text-danger">
                                                {formErrors.email}
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            value={formValues.password}
                                            onChange={handleChange}
                                        />
                                        {formErrors.password && (
                                            <span className="text-danger">
                                                {formErrors.password}
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="date_of_birth">Date of Birth</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="date_of_birth"
                                            name="date_of_birth"
                                            value={formValues.date_of_birth}
                                            onChange={handleChange}
                                        />
                                        {formErrors.date_of_birth && (
                                            <span className="text-danger">
                                                {formErrors.date_of_birth}
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="first_name">First Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="first_name"
                                            name="first_name"
                                            value={formValues.first_name}
                                            onChange={handleChange}
                                        />
                                        {formErrors.first_name && (
                                            <span className="text-danger">
                                                {formErrors.first_name}
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="last_name">Last Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="last_name"
                                            name="last_name"
                                            value={formValues.last_name}
                                            onChange={handleChange}
                                        />
                                        {formErrors.last_name && (
                                            <span className="text-danger">
                                                {formErrors.last_name}
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="nid">NID</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nid"
                                            name="nid"
                                            value={formValues.nid}
                                            onChange={handleChange}
                                        />
                                        {formErrors.nid && (
                                            <span className="text-danger">
                                                {formErrors.nid}
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="phone">Phone</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phone"
                                            name="phone"
                                            value={formValues.phone}
                                            onChange={handleChange}
                                        />
                                        {formErrors.phone && (
                                            <span className="text-danger">
                                                {formErrors.phone}
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="present_address">Present Address</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="present_address"
                                            name="present_address"
                                            value={formValues.present_address}
                                            onChange={handleChange}
                                        />
                                        {formErrors.present_address && (
                                            <span className="text-danger">
                                                {formErrors.present_address}
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="permanent_address">Permanent Address</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="permanent_address"
                                            name="permanent_address"
                                            value={formValues.permanent_address}
                                            onChange={handleChange}
                                        />
                                        {formErrors.permanent_address && (
                                            <span className="text-danger">
                                                {formErrors.permanent_address}
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="role">Role</label>
                                        <select
                                            className="form-control"
                                            id="role"
                                            name="role"
                                            value={formValues.role}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Role</option>
                                            <option value="OWNER">HOUSE OWNER</option>
                                            <option value="TENANT">TENANT</option>
                                        </select>
                                        {formErrors.role && (
                                            <span className="text-danger">
                                                {formErrors.role}
                                            </span>
                                        )}
                                    </div>

                                    <button type="submit" className="btn btn-primary mt-3">
                                        Register Now
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;