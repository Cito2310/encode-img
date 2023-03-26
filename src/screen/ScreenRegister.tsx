import { useForm } from '../hooks/useForm';
export const ScreenRegister = () => {
    const {
        password,
        onInputChange
    } = useForm({
        password: ""        
    })

    // TODO Modificar estado login, guardar passwrod

    return (
        <div className="m-3 bg-dark text-white rounded p-4">
            <h1>Iniciar Sesion</h1>
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
                <button type='button' className='btn btn-light'>Aceptar</button>
            </div>
        </div>
    )
}