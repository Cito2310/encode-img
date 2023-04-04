import { useState } from 'react';
import { ModalParent } from './ModalParent';
import { InputText } from './Inputs';
import { Button } from './Button';
import { useForm } from '../hooks/useForm';
import { useStatus } from '../hooks/useStatus';
import { IObjectEncrypt } from '../../types/objectEncrypts';
import * as bcryptjs from 'bcryptjs';

interface props {
    password: string
    selectFile: IObjectEncrypt
    onExit: () => void
    removeEncryptFile: (file: IObjectEncrypt) => void
}

export const ModalDecryptImg = ({password, selectFile, onExit, removeEncryptFile}: props) => {
    const {
        uniquePassword,

        onInputChange,
        setFormState,
        formState
    } = useForm({
        uniquePassword: "",
    });

    const { specialPassword, password: passwordFile } = selectFile;

    const { error, onNotError, setError, setStatus, status } = useStatus();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {onNotError(); onInputChange(event)}


    const onDescrypt = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        let copyPassword = password;

        if (uniquePassword) {
            if (specialPassword && !uniquePassword) return setError("La contraseña unica es necesaria");
            
            const compareUniquePassword = bcryptjs.compareSync(uniquePassword, passwordFile);
            if (!compareUniquePassword) return setError("La contraseña es incorrecta");
    
            copyPassword = uniquePassword;
        }

        await window.electronAPI.desencryptImg(selectFile.name, copyPassword);
        setStatus("done")
        setTimeout(onExit, 300);
        setTimeout(()=>removeEncryptFile(selectFile), 300);
    }


    // RETURN
    return (
        <ModalParent
            title='Desencriptar Imagen'
            advert={error}
            onExit={onExit}
            onSubmit={onDescrypt}
            buttons={[
                {color: "primary", label: "Desencriptar", submit: true, status},
                {color: "secondary", label: "Rechazar", onClick: onExit}
            ]}
        >
            <>
                {
                    specialPassword ?
                        <InputText
                            label='Contraseña Unica'
                            name='uniquePassword' value={uniquePassword}
                            placeholder='Ingrese la contraseña unica'
                            onChange={onChange} autoFocus
                        /> : undefined
                }
                <p>Seguro que deseas desencriptar este elemento?</p>
            </>
        </ModalParent>
    )
}