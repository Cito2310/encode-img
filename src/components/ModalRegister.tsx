import { useForm, useStatus } from "../hooks/";
import { InputText, ModalParent } from "./";

interface props {
    setPassword: React.Dispatch<React.SetStateAction<string>>
}


export const ModalRegister = ({setPassword}: props) => {
    // USE STATUS
    const { onNotError, error, setError, status, setStatus } = useStatus();

    
    // FORM CONTROLLER
    const {
        password,
        onInputChange,
    } = useForm({
        password: ""
    });

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {onNotError(); onInputChange(event)}

    const onSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onNotError();

        if (!password) return setError("La contraseña es necesaria");

        window.electronAPI.initProgram(password);
        setStatus("done");
        setPassword(password);
    }
    

    // RETURN
    return (
        <ModalParent
            advert={error}
            onSubmit={onSubmit}
            title="Registrarse"
            buttons={[
                {color: "primary", label: "Aceptar", submit: true, status}
            ]}
        >
            <InputText
                name="password" value={password}
                label="Contraseña" placeholder="Ingrese tu contraseña"
                onChange={onChange}
                password autoFocus
            />
        </ModalParent>
    )
}