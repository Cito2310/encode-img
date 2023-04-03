import { useState } from 'react';
import { ModalParent } from './ModalParent';
import { InputText } from './Inputs';
import { Button } from './Button';
import { useForm } from '../hooks/useForm';
import { useStatus } from '../hooks/useStatus';

interface props {
    password: string
    onExit: () => void
}

export const ModalEncryptImg = ({password, onExit}: props) => {
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

    const { error, onNotError, setError, setStatus, status } = useStatus();

    const [stateUniquePassword, setStateUniquePassword] = useState(false);
    const toggleStateUniquePassword = () => {
        let copyForm = {...formState};
        copyForm.uniquePassword = "";
        setFormState(copyForm);
        setStateUniquePassword(!stateUniquePassword);
    }

    const onGetRouteImg = async() => {
        const pathImg = await window.electronAPI.getRouteImg();
        if (!pathImg) return;

        const splitPath = pathImg.split("\\");

        let nameFile = splitPath[splitPath.length-1];
        nameFile = nameFile.split(".")[0];
        nameFile = nameFile.replace(/[-" +"]/g, "_")

        const formatFile = nameFile.split(".")[1];

        let copyForm = {...formState};
        copyForm.pathFile = pathImg;
        copyForm.name = nameFile;
        copyForm.format = formatFile;
        setFormState(copyForm);
    }

    const onSaveDataEncrypt = async( event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();

        window.electronAPI.encryptImg(pathFile, name, password, uniquePassword)
            
        setStatus("done")
        setTimeout(onExit, 300);
    }


    // RETURN
    return (
        <ModalParent
            title='Encriptar Imagen'
            advert={""}
            onExit={onExit}
            onSubmit={onSaveDataEncrypt}
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
                        onChange={onInputChange} autoFocus
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
                onChange={onInputChange} autoFocus
            />

            {
                stateUniquePassword ?
                <div className="input-container text">
                    <label>Contraña especial</label>

                    <div style={{display: 'flex', gap: "0.8em"}}>
                        <input 
                            style={{width: "100%"}}
                            name="pathFile" value={pathFile}
                            onChange={onInputChange} autoFocus
                            placeholder="Ingrese la contraseña especial"
                        />

                        <Button
                            color='alert'
                            label='X'
                            onClick={toggleStateUniquePassword}
                            style={{width: "43px", height: "43px"}}
                        />
                    </div>
                </div>

                : <Button
                    color='alert'
                    label='Contraseña especial ( opcional )'
                    onClick={toggleStateUniquePassword}
                    style={{width: "100%", padding: 0, marginTop: "0.5em"}}
                />
            }


        </ModalParent>
    )
}