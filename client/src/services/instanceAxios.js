import axios from "axios";


class InstanceAxios{
    instance;
    constructor(){
        this.instance = axios.create({
            baseURL: "http://localhost:4000",
            withCredentials: true,
            headers:{
                "Access-Control-Allow-Origin" : "http://localhost:4000"
            }
        })
    }
}

export default InstanceAxios;