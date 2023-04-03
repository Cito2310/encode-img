import { useForm } from "../hooks/useForm"
import { ModalParent } from "./ModalParent"
import { InputText } from "./Inputs"
import { useState } from "react";
import * as bcryptjs from 'bcryptjs';

export function ModalLogin() {
    const {
        password,

        onInputChange,
        setFormState        
    } = useForm({
        password: ""
    });


    // ERROR CONTROLLER
    const [error, setErr] = useState("");
    const [status, setStatus] = useState<undefined | "error" | "await" | "done">(undefined);
    const setError = (error: string) => {setErr(error); setStatus("error")};
    const emptyError = () => {setErr(""); setStatus(undefined)};


    // FORM CONTROLLER
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {emptyError(); onInputChange(event)}

    const onSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        emptyError();

        if (!password) return setError("La contraseña es necesaria");

        const data = await window.electronAPI.getConfig();
        const comparePassword = bcryptjs.compareSync(password, data?.password || "");

        if (!comparePassword) return setError("La contraseña es incorrecta");

        setStatus("done");
        // TODO Set Password
        // TODO onExit
    }


    return (
        <ModalParent
            title="Iniciar Sesion"
            onExit={()=>{}}
            buttons={[
                {color: "primary", label: "Aceptar", submit: true, status},
            ]}
            onSubmit={onSubmit}
            advert={error}
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