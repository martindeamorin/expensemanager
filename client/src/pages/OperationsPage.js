import { useState } from "react"
import OperationsTable from "../components/OperationsTable"
import { useStore } from "../store/StoreProvider";
import BalanceDisplay from '../components/BalanceDisplay';
import OperationModal from "../components/OperationModal";


export default function OperationsPage() {
    const { data, balance, logout } = useStore();
    const [selectedOperation, setSelectedOperation] = useState(undefined);
    const [edit, setEdit] = useState(false);


    const modalAdd = () => {
        setSelectedOperation({})
    }

    const modalEdit = (operation) => {
        setEdit(true)
        setSelectedOperation(operation)
    }

    const closeModal = async () => {
        setSelectedOperation(undefined)
        setEdit(false)
    }

    const handleLogout = () => {
        logout()
    }

    return (
        <div className="container">
            <h1>Gestor de gastos</h1>
            <button onClick={() => handleLogout()} style={{backgroundColor : "red", color : "white"}}>Cerrar sesion</button>
            {
                balance &&
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <BalanceDisplay text="Total" total={balance.balance} style={{ backgroundColor: "#614E82" }} />
                    <BalanceDisplay text="Ingreso" total={balance.income} style={{ backgroundColor: "#044D29" }} />
                    <BalanceDisplay text="Egreso" total={balance.egress} style={{ backgroundColor: "#8C0808" }} />

                </div>
            }
            <button onClick={() => modalAdd()}>Agregar operación</button>
            {
                selectedOperation &&
                <OperationModal
                    edit={edit}
                    operation={selectedOperation}
                    onClose={closeModal}
                />
            }
            {
                data &&

                <OperationsTable
                    handleEdit={modalEdit}
                    data={data} />
            }

        </div>
    )
}