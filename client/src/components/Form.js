import { memo, useState } from "react"
import { useHistory } from "react-router-dom";


function Form({ formName, inputs, button, onSubmit }) {

    const formState = {}
    inputs.forEach((element) => {
        formState[element.name] = ""
    })
    
    const [formGroup, setFormGroup] = useState(formState);
    const [error, setError] = useState();
    const [success, setSuccess] = useState()
    let history = useHistory();

    const handleChange = (e) => {
        const updateForm = { ...formGroup }
        updateForm[e.target.name] = e.target.value;
        return setFormGroup(updateForm)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(undefined);
        const response = await onSubmit(formGroup);
        switch(response.code){
            case 500:
            case 400:
            case 401:
                setError(response.data || response.error)
                break;
            case 201:
                setSuccess(response.message)
                break;
            case 200:
                history.push("/operations")
                break;
            default:
                break;
        }
    }

    return (
        <div className="form">
            <form onSubmit={(e) => handleSubmit(e)}>
                <h1>{formName}</h1>
                
                <div className="invalidFeedback">
                {
                    error &&

                    Array.isArray(error) ?
                        error.map((element) => <p key={element.param}>{element.msg}</p>)
                        :
                        <p>{error}</p>
                }
                </div>

                {
                    success &&
                    <div className="successfulRegister">
                        <p>{success}</p>
                    </div>
                }

                {inputs.map(element => {
                    return (
                        <input key={element.id} onChange={(e) => handleChange(e)} {...element}></input>
                    )
                })}
                <button type={button.type}>{button.name}</button>
            </form>

        </div>
    )
}

export default memo(Form);