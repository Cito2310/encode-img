import prompts from 'prompts';
import { writeEncodeFile } from '../helpers/writeEncodeFile';

export const encodeMenu = async() => {
    const { path }: {path: string} = await prompts({ type: "text", message: "Inserte la ruta de la imagen", name: "path" });
    const { name }: {name: string} = await prompts({ type: "text", message: "Inserte el nombre del archivo", name: "name" });

    const formatValid = ["png", "jpg", "wbep"]

    try {
        writeEncodeFile( path, name );
    } catch (error) {
        console.log("Algo salio mal, reintentelo")
    }

}