import axios from "axios";

class AuthService {
    instance = axios.create({
        baseURL: "http://localhost:4000"
    })

    register = async (body) => {
        return await this.instance.post("/auth/register", body)
    }

    login = async (body) => {
        return await this.instance.post("/auth/login", body)
    }
}

export default new AuthService();