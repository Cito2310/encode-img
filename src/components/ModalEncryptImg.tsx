import { useState } from 'react';
import { ModalParent, InputText, Button } from './';
import { useForm, useStatus } from '../hooks/';
import { IObjectEncrypt } from '../../types/objectEncrypts';

interface props {
    password: string
    onExit: () => void
    addNewEncryptFile: (file: IObjectEncrypt) => void
}

export const ModalEncryptImg = ({password, onExit, addNewEncryptFile}: props) => {
    // FORM CONTROLLER
    const {
        name,
        pathFile,
        uniquePassword,

        onInputChange,
        setFormState,
        formState
    } = useForm({
        name: "",
        pathFile: "",
        uniquePassword: "",
        format: "",
    });

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {onNotError(); onInputChange(event)}

    // func get route img
    const onGetRouteImg = async() => {
        const pathImg = await window.electronAPI.getRouteImg();
        if (!pathImg) return;

        const splitPath = pathImg.split("\\");

        const nameFile = splitPath[splitPath.length-1].split(".")[0].replace(/[-" +"]/g, "_");
        const formatFile = nameFile.split(".")[1];

        let copyForm = {...formState};
        copyForm.pathFile = pathImg;
        copyForm.name = nameFile;
        copyForm.format = formatFile;
        setFormState(copyForm);
    }

    // USE STATUS
    const { error, onNotError, setError, setStatus, status } = useStatus();


    // UNIQUE PASSWORD CONTROLLER
    const [stateUniquePassword, setStateUniquePassword] = useState(false);
    const toggleStateUniquePassword = () => {
        let copyForm = {...formState};
        copyForm.uniquePassword = "";
        setFormState(copyForm);
        setStateUniquePassword(!stateUniquePassword);
    }


    // FUNCTION SAVE DATA ENCRYPT
    const onSaveDataEncrypt = async( event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();

        // CHECK ERROR
        if ( !name ) return setError("El nombre es necesario")
        if ( !pathFile ) return setError("La ruta del archivo es necesario")
        if ( stateUniquePassword && !uniquePassword ) return setError("La contraseña unica es necesaria")

        const data = await window.electronAPI.encryptImg(pathFile, name, password, uniquePassword)
        addNewEncryptFile(data);
        setStatus("done")
        setTimeout(onExit, 300);
    }


    // RETURN
    return (
        <ModalParent
            title='Encriptar Imagen'
            advert={error}
            onExit={onExit}
            onSubmit={onSaveDataEncrypt}
            style={{width: "500px"}}
            buttons={[
                {color: "primary", label: "Encriptar", submit: true, status},
                {color: "secondary", label: "Rechazar", onClick: onExit}
            ]}
        >


            <div className="input-container text">
                <label>Ruta del archivo</label>

                <div style={{display: 'flex', gap: "0.8em"}}>
                    <input 
                        style={{width: "100%"}}
                        name="pathFile" value={pathFile}
                        onChange={onChange} autoFocus
                        placeholder="Ingrese la ruta de la imagen"
                    />

                    <Button
                        color='primary'
                        label='Buscar'
                        onClick={onGetRouteImg}
                        style={{width: "4em", height: "43px"}}
                    />
                </div>
            </div>

            <InputText
                label='Nombre'
                name='name' value={name}
                placeholder='Ingrese el nombre'
                onChange={onChange} autoFocus
            />

            {
                stateUniquePassword ?
                <div className="input-container text">
                    <label>Contraña especial</label>

                    <div style={{display: 'flex', gap: "0.8em"}}>
                        <input 
                            style={{width: "100%"}}
                            name="uniquePassword" value={uniquePassword}
                            onChange={onChange} autoFocus
                            placeholder="Ingrese la contraseña especial"
                        />

                        <Button
                            color='alert'
                            label='X'
                            onClick={toggleStateUniquePassword}
                            style={{width: "43px", height: "43px"}}
                        />
                    </div>
                </div> :

                 <Button
                    color='alert'
                    label='Contraseña especial ( opcional )'
                    onClick={toggleStateUniquePassword}
                    style={{width: "100%", padding: 0, marginTop: "0.5em"}}
                />
            }


        </ModalParent>
    )
}