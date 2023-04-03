import { useForm } from "../hooks/useForm";
import { useStatus } from "../hooks/useStatus";
import { InputText } from "./Inputs";
import { ModalParent } from "./ModalParent"

interface props {
    setPassword: React.Dispatch<React.SetStateAction<string>>
}


export const ModalRegister = ({setPassword}: props) => {
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