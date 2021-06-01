import React, {useState} from "react";
import Base from "../core/Base";
import { signup } from "../auth/helper";
import {Link} from "react-router-dom";

const Signup = () => {

        const [values, setValues] = useState({
            name: "",
            email: "",
            password: "",
            error: "",
            success: false
        });
    
        //destructuring
     const {name, email, password, error, success} = values

     //higher order function hitesh chau. channel
     const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
     }

     const onSubmit = event => {
         event.preventDefault();
         setValues({...values, error: false})
         signup({name, email, password})
         .then(data=>{
             if(data.error){
                 setValues({...values, error: data.error, success, success:false})

             }else{
                 setValues({
                     ...values,
                     name:"",
                     email: "",
                     password: "",
                     error: "",
                     success: true
                 });
             }
         })
         .catch(console.log("Error in signup"));
     }

    const signUpForm = () => {

        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input onChange={handleChange("name")} className="form-control" type="text" value={name} />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input onChange={handleChange("email")} className="form-control" type="email" value={email}/>
                        </div>
                         <div className="form-group">
                            <label className="text-light">Password</label>
                            <input onChange={handleChange("password")} className="form-control" type="password" value={password} />
                        </div>
                        <br/>
                        
                        <button onClick={onSubmit} className="btn btn-success btn-block btn-lg form-control">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    const successMessage = () => {
      return( 
          <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
      <div className="alert alert-success" 
        style={{display: success ? "" : "none"}}>

        New account was created successfully.Please
        <Link to= "/signin">Login Here</Link>
        </div>
        </div>
        </div>
        ) 
    }
     const errorMessage = () => {
        return(
             <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
            <div className="alert alert-danger" 
        style={{display: error ? "" : "none"}}>

        {error}
        </div>
        </div>
        </div>
        )
    }


    // onSubmit means wait for more stuff and onSubmit() means immediate working 
    return (
        <Base title = "Sign up Page" description="A page for user to Sign up!">
            {successMessage()}
            {errorMessage()}
            {signUpForm()} 
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    );
};

export default Signup;