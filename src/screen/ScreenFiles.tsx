export const ScreenFiles = () => {

    // TODO OBTENER ELEMENTOS ENCRIPTADOS Y MOSTRARLO

    // TODO EL BOTON DESENCRIPTAR DEBE ENVIAR LA DATA AL MODAL DE DESENCRIPTADO
    
    return (
        <div className="m-3">
            <div className="d-flex justify-content-between align-items-center bg-dark text-white px-3 py-2 rounded mb-3">
                <h1>Archivos</h1>
                <button type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#encryptModal">
                    ENCRIPTAR
                </button>
            </div>

            <div className="d-flex flex-column gap-2 px-3">
                <div className="d-flex justify-content-between align-items-center">
                    <h4>Imagen 1</h4>
                    <button type="button" className="ms-3 btn btn-dark" data-bs-toggle="modal" data-bs-target="#decryptModal">
                        Desencriptar
                    </button>
                </div>
            </div>
        </div>
    )
}