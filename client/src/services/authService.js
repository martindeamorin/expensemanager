import InstanceAxios from "./instanceAxios";
class AuthService extends InstanceAxios{

    constructor(){
        super()
    }

    register = async (body) => {
        return await this.instance.post("/auth/register", body)
    }

    login = async (body) => {
        return await this.instance.post("/auth/login", body)
    }

    logout = async () => {
        return await this.instance.get("/auth/logout")
    }
}

export default new AuthService();