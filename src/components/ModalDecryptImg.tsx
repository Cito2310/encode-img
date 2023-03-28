import { useForm } from '../hooks/useForm';
import { useState } from 'react';
import { IObjectEncryptsNotCode } from '../../types/objectEncrypts';


interface props {
    password: string
    selectFile: IObjectEncryptsNotCode
}

export const ModalDecryptImg = ({ password, selectFile }:props) => {
    const {
        uniquePassword,

        onInputChange
    } = useForm({
        uniquePassword: "",
    });

    const onDescrypt = () => {
        window.electronAPI.desencryptImg(selectFile.name, password);
    }

    return (
        <div className="modal fade" id="decryptModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Desencriptar Imagen</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">


                        <div className='container'>
                            <p>Seguro que deseas desencriptar este archivo</p>
                            <p>{selectFile.name+selectFile.extension}</p>
                            {
                                selectFile.specialPassword ?
                                <>
                                    <label className="form-label">Contraseña especial</label>
                                    <div className='d-flex gap-3'>
                                        <input 
                                            value={uniquePassword} 
                                            onChange={onInputChange} 
                                            name="uniquePassword"
                                            type="uniquePassword" 
                                            className="form-control" 
                                            placeholder="Ingrese la contraseña"
                                        />
                                    </div>
                                </>
                                : null
                            }
                        </div>


                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Rechazar</button>
                        <button onClick={onDescrypt} disabled={!selectFile.specialPassword || !uniquePassword.trim() ? false : true} type="button" className="btn btn-primary">Encriptar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}