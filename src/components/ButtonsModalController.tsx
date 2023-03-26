interface props {
    modal: "encryptImg" | "decryptCode"
}

export const ButtonsModalController = ({modal}: props) => {
    if (modal === "decryptCode") return 
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Desencriptar
        </button>

    if (modal === "encryptImg") return 
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#encryptModal">
            ENCRIPTAR
        </button>
}