import { useEffect, useState } from 'react';
import { IObjectEncrypt } from '../../types/objectEncrypts';

import { Button } from '../components/Button';
import { ModalEncryptImg } from '../components/ModalEncryptImg';
import { ModalDecryptImg } from '../components/ModalDecryptImg';

import "../styles/screen-files.scss"

interface props {
    password: string
}

export const ScreenFiles = ({password}: props) => {
    // GET ELEMENTS ENCRYPT
    const [encryptFiles, setEncryptFiles] = useState<IObjectEncrypt[]>([])
    useEffect(() => {window.electronAPI.getEncryptsImgs().then(setEncryptFiles)}, [])

    const addNewEncryptFile = (file: IObjectEncrypt) => {
        setEncryptFiles([...encryptFiles, file])
    }

    const removeEncryptFile = (fileDelete: IObjectEncrypt) => {
        const newEncryptFiles = encryptFiles.filter( file => file.id !== fileDelete.id );
        setEncryptFiles(newEncryptFiles);
    }
    
    // MODAL CONTROLLER
    const [currentModal, setCurrentModal] = useState<"" | "encrypt" | "decrypt" >("");
    const onExitModal = () => setCurrentModal("");

    const onEncryptModal = () => setCurrentModal("encrypt");
    const onDecryptModal = ( file: IObjectEncrypt ) => { setSelectFile(file); setCurrentModal("decrypt") }

    // SELECT FILE CONTROLLER
    const [selectFile, setSelectFile] = useState({} as IObjectEncrypt);
    

    // RETURN
    return (
        <div className="screen-files">
            <section className='section-top'>
                <h1>Archivos</h1>

                <Button
                    color='secondary'
                    label='ENCRIPTAR'
                    onClick={onEncryptModal}
                />
            </section>

            <ul className='list-files'>
                {
                    encryptFiles.map( fileData => <li key={fileData.id}>
                        <div>{ fileData.name + fileData.extension }</div>
                        <Button
                            label='Desencriptar'
                            color='primary'
                            onClick={()=>onDecryptModal(fileData)}
                        />
                    </li>)
                }
            </ul>

            {currentModal === "encrypt" && <ModalEncryptImg password={password} onExit={onExitModal} addNewEncryptFile={addNewEncryptFile}/>}
            {currentModal === "decrypt" && <ModalDecryptImg password={password} selectFile={selectFile} onExit={onExitModal} removeEncryptFile={removeEncryptFile}/>}
        </div>
    )
}