import * as bcryptjs from 'bcryptjs';
import { useForm, useStatus } from "../hooks/";
import { ModalParent, InputText } from "./";

interface props {
    setPassword: React.Dispatch<React.SetStateAction<string>>
}


export function ModalLogin({setPassword}: props) {
    // USE STATUS
    const { onNotError, error, setError, status, setStatus } = useStatus();


    // FORM CONTROLLER
    const {
        password,
    
        onInputChange,
        onResetForm
    } = useForm({
        password: ""
    });

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {onNotError(); onInputChange(event)}

    const onSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onNotError();

        if (!password) return setError("La contraseña es necesaria");

        const data = await window.electronAPI.getConfig();
        const comparePassword = bcryptjs.compareSync(password, data?.password || "");

        if (!comparePassword) {
            onResetForm();
            setError("La contraseña es incorrecta");
            return;
        }

        setStatus("done");
        setPassword(password);
    }
    

    // RETURN
    return (
        <ModalParent
            advert={error}
            onSubmit={onSubmit}
            title="Iniciar Sesion"
            buttons={[
                {color: "primary", label: "Aceptar", submit: true, status},
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