export const ScreenFiles = () => {
    return (
        <div className="m-3">
            <div className="d-flex justify-content-between align-items-center bg-dark text-white px-3 py-2 rounded mb-3">
                <h1>Archivos</h1>
                <button className="btn btn-light">ENCRIPTAR</button>
            </div>

            <div className="d-flex flex-column gap-2">
                <div className="d-flex justify-content-between align-items-center">
                    <h4>Imagen 1</h4>
                    <button className="ms-3 btn btn-dark">Desencriptar</button>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <h4>Ciervo Colorado</h4>
                    <button className="ms-3 btn btn-dark">Desencriptar</button>
                </div>

            </div>
        </div>
    )
}