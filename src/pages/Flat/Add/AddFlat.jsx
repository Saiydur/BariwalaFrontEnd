import axios from "axios";
import React from "react";
import Swal from "sweetalert2";

const AddFlat = () => {
    const TOKEN = localStorage.getItem('token');

    let initialValues = {
        description: '',
        monthly_rent: '',
        size: '',
        street: '',
        road: '',
        city: '',
        state: '',
        postal_code: '',
        api_token: TOKEN
    }

    const [values, setValues] = React.useState(initialValues);
    const [errors, setErrors] = React.useState({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
        if (Object.keys(errors).length === 0 && isSubmitting) {
            const BASEURL = "http://127.0.0.1:8000/api/flat/create";
            axios.post(BASEURL, values)
                .then((response) => {
                    if (response.data.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: response.data.message,
                            showConfirmButton: false,
                            timer: 2000
                        })
                        initialValues = {
                            description: '',
                            monthly_rent: '',
                            size: '',
                            street: '',
                            road: '',
                            city: '',
                            state: '',
                            postal_code: '',
                            api_token: TOKEN
                        }
                    }
                    else if (response.data.status === 400){
                        setErrors(...response.data.message);
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

    const validate = (values) => {
        let errors = {};

        if (!values.description) {
            errors.description = "Description Required";
        }

        if (!values.monthly_rent) {
            errors.monthly_rent = "Monthly Rent Required";
        }

        if (!values.size) {
            errors.size = "Size Required";
        }

        if (!values.street) {
            errors.street = "Street Required";
        }

        if (!values.road) {
            errors.road = "Road Required";
        }

        if (!values.city) {
            errors.city = "City Required";
        }

        if (!values.state) {
            errors.state = "State Required";
        }

        if (!values.postal_code) {
            errors.postal_code = "Postal Code Required";
        }

        return errors;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input type="text" className="form-control" id="description" name="description" value={values.description} onChange={handleChange} />
                            {errors.description && <p className="text-danger">{errors.description}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="monthly_rent">Monthly Rent</label>
                            <input type="text" className="form-control" id="monthly_rent" name="monthly_rent" value={values.monthly_rent} onChange={handleChange} />
                            {errors.monthly_rent && <p className="text-danger">{errors.monthly_rent}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="size">Size</label>
                            <input type="text" className="form-control" id="size" name="size" value={values.size} onChange={handleChange} />
                            {errors.size && <p className="text-danger">{errors.size}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="street">Street</label>
                            <input type="text" className="form-control" id="street" name="street" value={values.street} onChange={handleChange} />
                            {errors.street && <p className="text-danger">{errors.street}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="road">Road</label>
                            <input type="text" className="form-control" id="road" name="road" value={values.road} onChange={handleChange} />
                            {errors.road && <p className="text-danger">{errors.road}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input type="text" className="form-control" id="city" name="city" value={values.city} onChange={handleChange} />
                            {errors.city && <p className="text-danger">{errors.city}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="state">State</label>
                            <input type="text" className="form-control" id="state" name="state" value={values.state} onChange={handleChange} />
                            {errors.state && <p className="text-danger">{errors.state}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="postal_code">Postal Code</label>
                            <input type="text" className="form-control" id="postal_code" name="postal_code" value={values.postal_code} onChange={handleChange} />
                            {errors.postal_code && <p className="text-danger">{errors.postal_code}</p>}
                        </div>
                        <button type="submit" className="btn btn-primary mt-3 w-100 btn-lg">Add Flat</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddFlat;