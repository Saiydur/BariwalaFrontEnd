import React, {useEffect,useState} from "react";
import axios from "axios";
import Swal from 'sweetalert2'

const Login = () => {
    const intialValues = { usernameOrEmail: "", password: "" };
  
    const [formValues, setFormValues] = useState(intialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    // const submit = () => {
    //   console.log(formValues);
    // };
  
    //input change handler
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    };
  
    //form submission handler
    const handleSubmit = (e) => {
      const BASEURL = "http://127.0.0.1:8000/api/login";
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmitting(true);
        if (formValues.usernameOrEmail && formValues.password) {
          axios.post(BASEURL, formValues)
          .then((response) => {
            if(response.status === 200){
              localStorage.setItem('token', response.data);
              window.location.href = "/dashboard";
            }
          }
          )
          .catch((error) => {
            // alert(error.response.data.err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.response.data.err,
            })
          }
          );
          }
    };
  
    //form validation handler
    const validate = (values) => {
      let errors = {};
      const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
      if (!values.usernameOrEmail) {
        errors.usernameOrEmail = "Email Required";
      } else if (!regex.test(values.usernameOrEmail)) {
        errors.usernameOrEmail = "Invalid Email";
      }
  
      if (!values.password) {
        errors.password = "Password Required";
      } else if (values.password.length < 4) {
        errors.password = "Password must be more than 4 characters";
      }
  
      return errors;
    };
  
    useEffect(() => {
      if (Object.keys(formErrors).length === 0 && isSubmitting) {
        // submit();
      }
    }, [formErrors]);
  
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-header">Login</div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="usernameOrEmail">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="usernameOrEmail"
                      name="usernameOrEmail"
                      value={formValues.usernameOrEmail}
                      onChange={handleChange}
                    />
                    {formErrors.usernameOrEmail && (
                      <span className="text-danger">{formErrors.usernameOrEmail}</span>
                    )}
                  </div>
                  <div className="form-group">
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
                      <span className="text-danger">{formErrors.password}</span>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Login;