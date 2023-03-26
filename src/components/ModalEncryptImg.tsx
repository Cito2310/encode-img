import { useForm } from '../hooks/useForm';
import { useState } from 'react';
export const ModalEncryptImg = () => {
    const {
        name,
        pathFile,
        uniquePassword,

        onInputChange
    } = useForm({
        name: "",
        pathFile: "",
        uniquePassword: "",
    });

    const [stateUniquePassword, setStateUniquePassword] = useState(false);

    const toggleStateUniquePassword = () => {
        setStateUniquePassword(!stateUniquePassword)
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


                        <label className="form-label">Nombre</label>
                        <input 
                            value={name} 
                            onChange={onInputChange} 
                            name="name"
                            type="name" 
                            className="form-control" 
                            placeholder="Ingrese el nombre"
                        />

                        
                        <label className="form-label mt-3">Ruta del archivo</label>
                        <div className='d-flex gap-3'>
                            <input 
                                value={pathFile} 
                                onChange={onInputChange} 
                                name="pathFile"
                                type="pathFile" 
                                className="form-control" 
                                placeholder="Ingrese la ruta de la imagen"
                            />
                        
                            <button className='btn btn-dark'>Buscar</button>
                        </div>


                        <div className='d-grid mt-3'>
                            {
                                !stateUniquePassword ?
                                <button className='btn btn-danger' onClick={toggleStateUniquePassword}>Contraseña Especial ( opcional )</button> :
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
                                    
                                        <button onClick={toggleStateUniquePassword} className='btn btn-danger'>X</button>
                                    </div>
                                </>
                            }
                        </div>


                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Rechazar</button>
                        <button type="button" className="btn btn-primary">Encriptar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}