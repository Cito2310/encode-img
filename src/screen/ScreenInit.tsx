import { useForm } from '../hooks/useForm';

// TODO crear archivo config añadir un hash con la contraseña

export const ScreenInit = () => {
    const {
        password,
        onInputChange
    } = useForm({
        password: ""
    });

    return (
        <div className="m-3">
            <h1>Registro inicial</h1>
            <label className="form-label">Contraseña</label>
            <input 
                value={password} 
                onChange={onInputChange} 
                name="password"
                type="password" 
                className="form-control" 
                placeholder="Ingrese una contraseña"
            />

            <div className='d-flex p-0 mt-3 justify-content-end'>
                <button type='button' className='btn btn-primary'>Aceptar</button>
            </div>
        </div>
    )
}