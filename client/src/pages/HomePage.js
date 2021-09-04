import Form from "../components/Form"
import  useForm  from "../utils/useForms"


export default function HomePage(){

    const [registerForm, loginForm] = useForm();

    return(
        <div className="container">
            <h1>¡Bienvenido a tu gestor de gastos!</h1>
            <div className="formContainer">

                <Form
                {...registerForm}
                />

                <Form
                {...loginForm}
                />

            </div>
        </div>

    )
}