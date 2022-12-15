import axios from "axios";
import React from "react";
const Header = () => {

    const [token, setToken] = React.useState(null);
    const [roles, setRoles] = React.useState([]);

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
        setToken(token);
        axios.get('http://localhost:8000/api/roles?api_token='+token)
        .then(res => {
            setRoles(...res.data.message);
        })
        .catch(err => {
            console.log(err);
        })
        }
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand">
                    Bariwala
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/about">
                                About
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/contact">
                                Contact
                            </a>
                        </li>
                        {
                            token ? (
                                <li className="nav-item">
                                    <a className="nav-link" href="/dashboard">
                                        Dashboard
                                    </a>
                                </li>
                            ) : null
                        }
                        {
                            roles.includes('ADMIN') ? (
                                <>
                                    <li className="nav-item">
                                    <a className="nav-link" href="/admin">
                                            User Panel
                                    </a>
                                    </li>
                                </>
                            ) : null
                        }
                        {
                            roles.includes('OWNER') ? (
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/add-flat">
                                            Flat
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/show-flat">
                                            Control Flats
                                        </a>
                                    </li>
                                </>
                            ) : null
                        }
                        {
                            roles.includes('TENANT') ? (
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/owner">
                                            See Flats
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/owner">
                                            Flat Utils
                                        </a>
                                    </li>
                                </>
                            ) : null
                        }
                    </ul>
                </div>
                <div className="d-flex">
                    {
                        localStorage.getItem("token") ? (
                            <a href="/logout" className="btn btn-danger">Logout</a>
                        ) : (
                            <>
                                <a href="/login" className="btn btn-primary me-2">Login</a>
                                <a href="/register" className="btn btn-success">Register</a>
                            </>
                        )
                    }
                </div>
            </div>
        </nav>
    );
};

export default Header;