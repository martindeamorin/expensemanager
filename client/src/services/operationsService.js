import InstanceAxios from "./instanceAxios";

class OperationsService extends InstanceAxios{

    constructor(){
        super()
    }

    getOperations = async (offset) => {
        return await this.instance.get(`/operations?offset=${offset}`)
    }

    createOperation = async (operation) => {
        return await this.instance.post("/operations", operation)
    }

    updateOperation = async (operation) => {
         return await this.instance.put(`/operations/${operation.id}`, operation)
    }
    deleteOperation = async (id) => {
         return await this.instance.delete(`/operations/${id}`)
    }
    getBalance = async () => {
         return await this.instance.get(`/operations/balance`)
    }

}


export default new OperationsService();