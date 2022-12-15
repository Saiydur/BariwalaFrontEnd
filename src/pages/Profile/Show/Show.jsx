import axios from "axios";
import React,{useEffect,useState} from "react";
import { useParams } from "react-router";

const Show = () => {
    let data = useParams();

    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/users/"+data.id)
        .then((response) => {
                console.log(response.data);
                setUser(response.data.message);
            }
        )
        .catch((error) => {
            console.log(error);
        }
        );
    }, []);

    return (
        <div>
            <h1>Profile</h1>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{user.first_name+ " " + user.last_name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                    <p className="card-text">{user.email_verified_at}</p>
                    <p className="card-text">National Id Number : {user.nid}</p>
                    <p className="card-text">Phone Number : {user.phone}</p>
                    <p className="card-text">Current Address : {user.present_address}</p>
                    <p className="card-text">Permanent Address : {user.permanent_address}</p>
                    <p className="card-text">Date of Birth : {user.date_of_birth}</p>
                    <p className="card-text">Roles:
                        {
                            user.roles.map((role) => {
                                return <span className="badge bg-primary mx-1">{role}</span>
                            })
                        }
                    </p>
                    {
                        user.is_active === 1 ? <p className="card-text badge bg-success">Active 
                        <button className="btn btn-danger">Deactivate Now</button></p> 
                        : <p className="card-text badge bg-danger">Inactive 
                        <button className="btn btn-success">Active Now</button></p>       
                    }
                    {
                        user.is_verified === 1 ? <p className="card-text">Verified</p>
                        : 
                        <div>
                            <p className="card-text badge bg-danger">Not Verified <button className="btn btn-success">Verify</button></p> 
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Show;