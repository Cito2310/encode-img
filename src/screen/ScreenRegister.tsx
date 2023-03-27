import { useForm } from '../hooks/useForm';

interface props {
    onLogin: (event: React.FormEvent<HTMLFormElement>, newPassword: string) => void
    errorLogin: string
}


export const ScreenRegister = ({ onLogin, errorLogin }: props) => {
    const {
        password,
        onInputChange
    } = useForm({
        password: ""        
    })

    return (
        <div className="m-3 bg-dark text-white rounded p-4">
            <h1>Iniciar Sesion</h1>

            <form onSubmit={event => onLogin(event, password) }>
                <label className="form-label">Contraseña</label>
                <input 
                    value={password} 
                    onChange={onInputChange} 
                    name="password"
                    type="password" 
                    className="form-control" 
                    placeholder="Ingrese una contraseña"
                />

                <div className='d-flex p-0 mt-3 justify-content-end gap-3 align-items-center'>
                    <p className='d-flex my-auto'>{errorLogin}</p>
                    <input type='submit' className='btn btn-light' value="Aceptar"/>
                </div>
            </form>
        </div>
    )
}