import { writeFileSync } from 'fs';

export const base64ToPng = (pathSave: string, dataBase64: string) => {
    writeFileSync(pathSave, dataBase64, { encoding: "base64" })
}