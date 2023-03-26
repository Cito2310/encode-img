import prompts from 'prompts';
import { TStatusApp } from '../index';

export const menuMain = async () : Promise<TStatusApp> => {
    const { option }: {option: TStatusApp} = await prompts([
        { type:"select", name: "option", message: "Seleccione una opcion", choices:[

            { title: "Codificar imagen", value: "encodeMenu" },
            { title: "Decodificar imagen", value: "decodeMenu" },
            { title: "Salir", value: "exit" },

        ] }
    ])

    return option;
}