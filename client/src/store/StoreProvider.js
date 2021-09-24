import { createContext, useContext, useEffect, useState } from 'react';
import AuthService from '../services/authService';
import OperationService from '../services/operationsService';
import tokenParser from '../utils/tokenParser';


export const StoreContext = createContext();
export const useStore = () => useContext(StoreContext)

export default function StoreProvider({ children }) {
    
    const [persist, setPersist] = useState(tokenParser())
    const [data, setData] = useState()
    const [balance, setBalance] = useState()


    const getOperations = async (offset = 0) => {
        const response = await OperationService.getOperations(offset)
        response.data.code === 401 ?  setPersist(undefined) : setData(response.data.data);
    }

    const getBalance = async () => {
        const response = await OperationService.getBalance()
        response.data.code === 401 ?  setPersist(undefined) : setBalance(response.data.data);
    }

    useEffect( () => {
        if(typeof(persist) !== "undefined"){
            getBalance()
            getOperations()
        } 

    }, [persist])



    const contextValue = {
        persist,
        data,
        balance,
        login: async (formData) => {
            const response = await AuthService.login(formData)
            setPersist(tokenParser());
            return response.data
        },
        register: async (formData) => {
            const response = await AuthService.register(formData)
            return response.data
        },
        updateStoreData: async (offset) => {
            getOperations(offset)
            getBalance()
        },

        logout: async () =>{
            await AuthService.logout()
            setPersist(undefined);
        }
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}
