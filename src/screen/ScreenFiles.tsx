import { useEffect, useState } from 'react';
import { IObjectEncryptsNotCode } from '../../types/objectEncrypts';

interface props {
    setSelectFile: React.Dispatch<React.SetStateAction<IObjectEncryptsNotCode>>
}

export const ScreenFiles = ({ setSelectFile }: props) => {

    // OBTENER ELEMENTOS ENCRIPTADOS Y MOSTRARLO
    const [encryptFiles, setEncryptFiles] = useState<IObjectEncryptsNotCode[]>([])
    useEffect(() => {window.electronAPI.getEncryptsImgs().then(setEncryptFiles)}, [])
    

    // TODO EL BOTON DESENCRIPTAR DEBE ENVIAR LA DATA AL MODAL DE DESENCRIPTADO
    const onCallDesencrypt = ( file: IObjectEncryptsNotCode ) => {
        setSelectFile(file)
    }
    
    return (
        <div className="m-3">
            <div className="d-flex justify-content-between align-items-center bg-dark text-white px-3 py-2 rounded mb-3">
                <h1>Archivos</h1>
                <button type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#encryptModal">
                    ENCRIPTAR
                </button>
            </div>

            <ul className="d-flex flex-column gap-2 px-3">
                {
                    encryptFiles.map( fileData => <li key={fileData.name} className='d-flex justify-content-between align-items-center'>
                        <h4>{ fileData.name }</h4>
                        <button onClick={()=>{onCallDesencrypt(fileData)}} type="button" className="ms-3 btn btn-dark" data-bs-toggle="modal" data-bs-target="#decryptModal">
                            Desencriptar
                        </button>
                    </li>)
                }
            </ul>
        </div>
    )
}