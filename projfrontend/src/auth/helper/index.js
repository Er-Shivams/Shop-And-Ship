import {API} from "../../backend";
// API = http://localhost:8000/api/

//getting response from the signup form to the backend
export const signup = user => {
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },

        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

export const signin = user => {
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },

        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

//for signining we have to know that user is signed in it will
//be storing in the form of cookies or token here jwt so we are setting it up
export const authenticate = (data, next) => {
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt", JSON.stringify(data))
        next();
    }
}

//here we simply removing those token 
export const signout = next => {
     if(typeof window !== "undefined"){
        localStorage.removeItem("jwt")
        next();
    }
    return fetch(`${API}/signout`, {
        method: "GET" 
    })
    .then(response => console.log("signout success"))
    .catch(err => console.log(err))
}

export const isAuthenticated = ()=> {
    if(typeof window == "undefined"){ //mistake of when we dong signout !== X  ->> ==
        return false;
    }
    //checking two times is token is matching with given user
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"));
    }else{
        return false;
    }
}

