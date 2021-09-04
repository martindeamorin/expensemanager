import { useStore } from "../store/StoreProvider"

export default function useForm() {
    const store = useStore();
    const registerForm = {
        formName: "Registrarse",
        inputs: [
            {
                type: "email",
                id: "emailReg",
                placeholder: "Correo electrónico",
                required: "required",
                name: "email"

            },
            {
                type: "email",
                id: "rptEmailReg",
                placeholder: "Repita su correo electrónico",
                required: "required",
                name: "rptEmail"

            },
            {
                type: "password",
                id: "passwordReg",
                placeholder: "Contraseña",
                required: "required",
                name: "password"

            },
            {
                type: "password",
                id: "rptPasswordReg",
                placeholder: "Repita su contraseña",
                required: "required",
                name: "rptPassword"
            }
        ],
        onSubmit: formData => store.register(formData),
        button: { type: "submit", name: "Registrarse" }
    }

    const loginForm = {
        formName: "Inciar sesión",
        inputs: [
            {
                type: "email",
                id: "emailLog",
                placeholder: "Correo electrónico",
                required: "required",
                name: "email"

            },
            {
                type: "password",
                id: "passwordLog",
                placeholder: "Contraseña",
                required: "required",
                name: "password"

            },
        ],
        onSubmit: formData => store.login(formData),
        button: { type: "submit", name: "Acceder" }
    }
    return ([
        registerForm,
        loginForm
    ])
}
