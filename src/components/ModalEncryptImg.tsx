import { useForm } from '../hooks/useForm';
import { useState } from 'react';

export const ModalEncryptImg = () => {
    const {
        name,
        pathFile,
        uniquePassword,
        format,

        onInputChange,
        setFormState,
        formState
    } = useForm({
        name: "",
        pathFile: "",
        uniquePassword: "",
        format: "",
    });

    const [stateUniquePassword, setStateUniquePassword] = useState(false);

    const toggleStateUniquePassword = () => {
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

    const onSaveDataEncrypt = async() => {
        const data = await window.electronAPI.saveDataEncrypt("hola");
        console.log(data);
    }

    // TODO AÑADIR FUNCION BUSCAR ARCHIVO CONEXION CON ELECTRON
    // TODO AÑADIR FUNCION ENCRIPTAR CONEXION CON ELECTRON 

    return (
        <div className="modal fade" id="encryptModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Encriptar Imagen</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">

                        <label className="form-label">Ruta del archivo</label>
                        <div className='d-flex gap-3'>
                            <input 
                                value={pathFile} 
                                onChange={onInputChange} 
                                name="pathFile"
                                type="pathFile" 
                                className="form-control" 
                                placeholder="Ingrese la ruta de la imagen"
                            />
                        
                            <button onClick={onGetRouteImg} className='btn btn-dark'>Buscar</button>
                        </div>

                        <label className="form-label mt-3">Nombre</label>
                        <input 
                            value={name} 
                            onChange={onInputChange} 
                            name="name"
                            type="name" 
                            className="form-control" 
                            placeholder="Ingrese el nombre"
                        />

                        <div className='d-grid mt-3'>
                            {
                                !stateUniquePassword ?
                                <button className='btn btn-danger' onClick={toggleStateUniquePassword}>Contraseña Especial ( opcional )</button> :
                                <>
                                    <label className="form-label">Contraseña especial</label>
                                    <label className="form-label">Necesitaras esta contraseña para desencriptar esta imagen</label>
                                    <div className='d-flex gap-3'>
                                        <input 
                                            value={uniquePassword} 
                                            onChange={onInputChange} 
                                            name="uniquePassword"
                                            type="uniquePassword" 
                                            className="form-control" 
                                            placeholder="Ingrese la contraseña"
                                        />
                                    
                                        <button onClick={toggleStateUniquePassword} className='btn btn-danger'>X</button>
                                    </div>
                                </>
                            }
                        </div>


                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Rechazar</button>
                        <button type="button" className="btn btn-primary" onClick={onSaveDataEncrypt}>Encriptar</button>
                    </div>

                </div>
            </div>
        </div>
    )
}