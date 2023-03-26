import { readFileSync } from "fs"

export const encodeBase64 = (urlFile: string) => {
    const data = readFileSync(urlFile);
    const stringBase64 = Buffer.from(data).toString('base64');

    return stringBase64;
}