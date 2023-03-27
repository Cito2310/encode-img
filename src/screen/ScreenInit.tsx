import { useForm } from '../hooks/useForm';
import { IObjectConfig } from '../../types/objectConfig';

interface props {
    setConfig: React.Dispatch<React.SetStateAction<IObjectConfig>>
}


export const ScreenInit = ({ setConfig }: props) => {
    const {
        password,
        onInputChange
    } = useForm({
        password: ""
    });

    const onSubmitPassword = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = await window.electronAPI.initProgram(password);
        setConfig(data);
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