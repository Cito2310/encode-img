import { encodeBase64 } from './encodeBase64';
import { mkdirSync, writeFileSync } from 'fs';

export const writeEncodeFile = ( path: string, name: string ) => {
    const base64Data = encodeBase64(path);
    const parseName = name.replace(" ", "_")
    const dirPath = "./encode/" + parseName
    mkdirSync(dirPath);

    for (let i = 0; i < 3; i++) {
        writeFileSync(
            dirPath + "/" + parseName + i + ".txt",
            base64Data
        )
    }
}