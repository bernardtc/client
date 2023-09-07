import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5005"
});



const signUp = ({email, password, username, country, state}) => {
    return api.post('/auth/signup', {email, password, username, country, state})
    .then(response => response.data)
    .catch(err => console.error(err))
}


const logIn = ({email, username, password}) => {
return api.post("/auth/login", {email, username, password})
.then(response => response.data)
.catch(err => console.error(err))
}

const verifyToken = (storedToken) => {
    return api.get("/auth/verify", { headers: { Authorization: `Bearer ${storedToken}`} })
    .then(response => response.data)
    .catch(err => console.error(err))
}


const uploadPhoto = (uploadData) => {
    return api.post("/api/upload", uploadData)
                .then(response => response.data)
                .catch(err => console.error(err))
}


const getCurrentUser = () => {
    const storedToken = localStorage.getItem('authToken')
    return api.get("/api/users", { headers: { Authorization: `Bearer ${storedToken}`} })
    .then(response => response.data)
    .catch(err => console.error(err))
}


const authMethods = {
    signUp,
    logIn,
    verifyToken,
    uploadPhoto,
    getCurrentUser,
    // editUser
}


export default authMethods; 