import prompts from 'prompts';

export const pause = (msg = "Presiona ENTER para continuar") => (
    prompts({
        name: "pause",
        message: msg,
        type: "text"
    })
)
