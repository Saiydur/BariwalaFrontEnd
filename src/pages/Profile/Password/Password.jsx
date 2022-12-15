import axios from "axios";
import React from "react";
import Swal from "sweetalert2";

const Password = () => {

    const TOKEN = localStorage.getItem("token");

    let intialValues = {
        new_password: "",
        confirm_password: "",
    };

    const [values, setValues] = React.useState(intialValues);
    const [error, setError] = React.useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const validate = () => {
        let temp = {};
        temp.new_password = values.new_password ? "" : "This field is required.";
        temp.confirm_password =
            values.confirm_password ? "" : "This field is required.";
        setError({
            ...temp,
        });
        return Object.values(temp).every((x) => x === "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            axios
                .put(
                    "http://127.0.0.1:8000/api/profile/change-password?api_token=" + TOKEN,
                    values
                )
                .then((response) => {
                    if (response.data.status === 200) {
                        Swal.fire({
                            icon: "success",
                            title: "Password Changed Successfully",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        setValues(intialValues);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header">
                            <h3>Change Password</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <div>
                                        <label htmlFor="new_password" className="form-label">
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="new_password"
                                            name="new_password"
                                            value={values.new_password}
                                            onChange={handleChange}
                                        />
                                        <span className="text-danger">
                                            {error.new_password}
                                        </span>
                                    </div>
                                    <div>
                                        <label htmlFor="confirm_password" className="form-label">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="confirm_password"
                                            name="confirm_password"
                                            value={values.confirm_password}
                                            onChange={handleChange}
                                        />
                                        <span className="text-danger">
                                            {error.confirm_password}
                                        </span>
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-3">
                                        Change Password
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

export default Password;