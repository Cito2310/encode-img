import { useForm } from '../hooks/useForm';

// TODO crear archivo config añadir un hash con la contraseña

export const ScreenInit = () => {
    const {
        password,
        onInputChange
    } = useForm({
        password: ""
    });

    const onSubmitPassword = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = await window.electronAPI.initProgram(password);
        console.log(data);
    }

    return (
        <div className="m-3">
            <h1>Registro inicial</h1>
            <form onSubmit={onSubmitPassword}>
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
                    <input disabled={password.trim() ? false : true} type='submit' className='btn btn-primary' value="Aceptar"></input>
                </div>
            </form>
        </div>
    )
}