import axios from "axios";

class AuthService {
    instance = axios.create({
        baseURL: "http://localhost:4000",
        withCredentials: true
    })

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