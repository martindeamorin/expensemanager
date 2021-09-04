import { useState } from "react";
import { MenuItem, FormControl, InputLabel, Select } from "@material-ui/core";
import { useStore } from "../store/StoreProvider";
import operationsService from "../services/operationsService"

export default function OperationModal({ edit, operation, onClose }) {
    const [type, setType] = useState(edit ? operation.type : "default");
    const [amount, setAmount] = useState(edit ? operation.amount : "");
    const [date, setDate] = useState(edit ? operation.date : "");
    const [concept, setConcept] = useState(edit ? operation.concept : "");
    const { token, updateStoreData } = useStore()
    const [error, setError] = useState(undefined);

    const handleAdd = (e, operation) => {
        e.preventDefault()
        operationsService.createOperation(token, operation)
            .then(({ data }) => {
                switch (data.code) {
                    case 201:
                        setError(undefined)
                        updateStoreData();
                        onClose()
                        break;
                    case 400:
                        setError(data.data)
                        break;
                    default:
                        break;
                }
            })
    }

    const handleUpdate = (e, operation) => {
        e.preventDefault()
        operationsService.updateOperation(token, operation)
            .then(({ data }) => {
                switch (data.code) {
                    case 200:
                        setError(undefined)
                        updateStoreData();
                        onClose()
                        break;
                    case 400:
                        setError(data.data)
                        break;
                    default:
                        break;
                }
            })
    }

    return (
        <div className="modal">

            <form className='form modal-main' onSubmit={edit ? (e) => handleUpdate(e, { id: operation.id, type, amount, date, concept }) : (e) => handleAdd(e, { type, amount, date, concept })}>
                <FormControl
                    variant="standard"
                    fullWidth={true}
                    hiddenLabel={true}
                    className="select"
                    disabled={edit}
                >
                    <Select
                        value={type}
                        onChange={e => setType(e.target.value)}
                        disableUnderline
                        margin="dense"
                    >
                        <MenuItem
                            value="default">
                            <span>Seleccione un tipo de operacion</span>
                        </MenuItem>
                        <MenuItem
                            value={1}
                        >
                            Ingreso
                        </MenuItem>
                        <MenuItem
                            value={0}
                        >
                            Egreso
                        </MenuItem>
                    </Select>
                </FormControl>
                {error ? error.map(element => element.param === "type" ? <p className="modalError">{element.msg}</p> : null) : null}
                <input type="number" placeholder="Cantidad" label='Cantidad' value={amount} onChange={e => setAmount(e.target.value)} />
                {error ? error.map(element => element.param === "amount" ? <p className="modalError">{element.msg}</p> : null) : null}
                <input type='text' placeholder="Concepto" value={concept} onChange={e => setConcept(e.target.value)} />
                {error ? error.map(element => element.param === "concept" ? <p className="modalError">{element.msg}</p> : null) : null}
                <input type='date' placeholder="Fecha" value={date} onChange={e => setDate(e.target.value)} />
                {error ? error.map(element => element.param === "date" ? <p className="modalError">{element.msg}</p> : null) : null}
                <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                    <button
                        type="submit"
                    >
                        {edit ? 'Editar' : 'Agregar'}
                    </button>

                    <button
                        onClick={() => onClose()}
                        style={{ backgroundColor: "red", color: "white" }}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    )
}