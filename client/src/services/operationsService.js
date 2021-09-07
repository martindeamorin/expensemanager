import axios from "axios";

class OperationsService{
    instance = axios.create({
        baseURL: "http://localhost:4000",
    })

    getOperations = async (token, offset) => {
        return await this.instance.get(`/operations?offset=${offset}`, {headers: {Authorization: `Bearer ${token}`}})
    }

    createOperation = async (token, operation) => {
        return await this.instance.post("/operations", operation,{headers: {Authorization: `Bearer ${token}`}})
    }

    updateOperation = async (token, operation) => {
         return await this.instance.put(`/operations/${operation.id}`, operation,{headers: {Authorization: `Bearer ${token}`}})
    }
    deleteOperation = async (token, id) => {
         return await this.instance.delete(`/operations/${id}`, {headers: {Authorization: `Bearer ${token}`}})
    }
    getBalance = async (token) => {
         return await this.instance.get(`/operations/balance`, {headers: {Authorization: `Bearer ${token}`}})
    }
}


export default new OperationsService();