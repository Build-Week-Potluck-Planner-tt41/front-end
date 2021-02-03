import axios from "axios";



export const axiosWithAuth= () => {

    const token=localStorage.getItem("token")
    return axios.create({
        baseURL:"https://cors-anywhere.herokuapp.com/https://backend-potlucks.herokuapp.com/api",
        headers:{
            Authorization:token
        }
    })
}
