import axios from "axios";
import React,{useState,Component} from "react";

class Dashboard extends Component{

    constructor(props){
        super(props);
        this.state={
            user:[]
        }
    }
    componentDidMount(){
    axios.get("http://127.0.0.1:8000/api/profile?api_token="+localStorage.getItem("token"))
    .then((response)=>{
        if(response.data.status===200){
            console.log(response.data.message);
            this.setState({
                user:response.data.message
            })
            console.log(
                this.state.user.id
            );
        }
    }
    )
    .catch((error)=>{
        console.log(error);
    })
    }

    render(){
        if(this.state.user.length===0){
            return(
                <div>
                    <h1>Please Login First</h1>
                </div>
            )
        }
        else{
            return(
                <>
                   <div className="container mt-4">
                       <div className="row">
                           <div className="col-md-12">
                               <div className="card">
                                   <div className="card-header">
                                       <h3>Profile</h3>
                                       <div className="d-flex">
                                           <a href={`/profile/edit/${this.state.user.id}`} className="btn btn-primary me-2">Edit Profile</a>
                                           <a href="/change-password" className="btn btn-primary">Change Password</a>
                                       </div>
                                   </div>
                                   <div className="card-body">
                                       <table className="table table-bordered">
                                           <tr>
                                               <th>Id</th>
                                               <td>{this.state.user.id}</td>
                                           </tr>
                                           <tr>
                                               <th>First Name</th>
                                               <td>{this.state.user.first_name}</td>
                                           </tr>
                                           <tr>
                                               <th>Last Name</th>
                                               <td>{this.state.user.last_name}</td>
                                           </tr>
                                           <tr>
                                               <th>Email</th>
                                               <td>{this.state.user.email}</td>
                                           </tr>
                                           <tr>
                                               <th>Date Of Birth</th>
                                               <td>{this.state.user.date_of_birth}</td>
                                           </tr>
                                           <tr>
                                               <th>NID Number</th>
                                               <td>{this.state.user.NID}</td>
                                           </tr>
                                           <tr>
                                               <th>Phone Number</th>
                                               <td>{this.state.user.phone}</td>
                                           </tr>
                                           <tr>
                                               <th>Username</th>
                                               <td>{this.state.user.username}</td>
                                           </tr>
                                           <tr>
                                               <th>Present Address</th>
                                               <td>{this.state.user.present_address}</td>
                                           </tr>
                                           <tr>
                                               <th>Permanent Address</th>
                                               <td>{this.state.user.permanent_address}</td>
                                           </tr>
                                       </table>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
                </>   
               )
            }
    }
}

export default Dashboard;
    
