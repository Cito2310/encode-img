import * as bcryptjs from 'bcryptjs';
import { ModalParent, InputText } from './';
import { useForm, useStatus } from '../hooks/';
import { IObjectEncrypt } from '../../types/objectEncrypts';

interface props {
    password: string
    selectFile: IObjectEncrypt
    onExit: () => void
    removeEncryptFile: (file: IObjectEncrypt) => void
}

export const ModalDecryptImg = ({password, selectFile, onExit, removeEncryptFile}: props) => {
    // FORM CONTROLLER
    const {
        uniquePassword,
        onInputChange,
    } = useForm({
        uniquePassword: "",
    });
    
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {onNotError(); onInputChange(event)};

    // USE STATUS
    const { error, onNotError, setError, setStatus, status } = useStatus();

    // FUNCTION ONDECRYPT | for send orden desencrypt and remove encrypt element
    const onDecrypt = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        let copyPassword = password;

        if (uniquePassword) {
            if (selectFile.specialPassword && !uniquePassword) return setError("La contraseña unica es necesaria");
            
            const compareUniquePassword = bcryptjs.compareSync(uniquePassword, selectFile.password);
            if (!compareUniquePassword) return setError("La contraseña es incorrecta");
    
            copyPassword = uniquePassword;
        }

        await window.electronAPI.desencryptImg(selectFile.name, copyPassword);
        setStatus("done")
        setTimeout(()=>{removeEncryptFile(selectFile); onExit()}, 300);
    }


    // RETURN
    return (
        <ModalParent
            title='Desencriptar Imagen'
            advert={error}
            onExit={onExit}
            onSubmit={onDecrypt}
            buttons={[
                {color: "primary", label: "Desencriptar", submit: true, status},
                {color: "secondary", label: "Rechazar", onClick: onExit}
            ]}
        >
            <>
                {
                    selectFile.specialPassword ?
                        <InputText
                            label='Contraseña Unica'
                            name='uniquePassword' value={uniquePassword}
                            placeholder='Ingrese la contraseña unica'
                            onChange={onChange} autoFocus password
                        /> : undefined
                }
                <p>Seguro que deseas desencriptar este elemento?</p>
            </>
        </ModalParent>
    )
}