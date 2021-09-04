import { createContext, useContext, useEffect, useState } from 'react';
import AuthService from '../services/authService';
import { decode } from "jsonwebtoken";
import OperationService from '../services/operationsService';

export const StoreContext = createContext();
export const useStore = () => useContext(StoreContext)

export default function StoreProvider({ children }) {
    
    const [user, setUser] = useState()
    const [token, setToken] = useState()
    const [data, setData] = useState()
    const [balance, setBalance] = useState()

    const getOperations = async () => {
        const response = await OperationService.getOperations(token)
        setData(response.data.data)
    }

    const getBalance = async () => {
        const response = await OperationService.getBalance(token)
        setBalance(response.data.data)
    }

    useEffect( () => {
        if(typeof(token) !== "undefined"){
            getBalance()
            getOperations()
        }
    }, [token])

    const contextValue = {
        user,
        token,
        data,
        balance,
        login: async (formData) => {
            const response = await AuthService.login(formData)
            if (response.data.code === 200) {
                let decodedUser = decode(response.data.token)
                setUser(decodedUser)
                setToken(response.data.token)
            }
            return response.data
        },
        register: async (formData) => {
            const response = await AuthService.register(formData)
            return response.data
        },
        updateStoreData: async () => {
            getOperations()
            getBalance()
        }
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}
