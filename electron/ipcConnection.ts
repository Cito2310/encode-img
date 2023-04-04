import { dialog, ipcMain } from 'electron';
import * as bcryptjs from "bcryptjs";

import { ipcNames } from '../types/ipcNames';
import { mkdirSync, writeFileSync, readFileSync, readdir, readdirSync, write, unlinkSync } from 'fs';
import { IObjectConfig } from '../types/objectConfig';
import * as path from 'path';
import * as hmacSHA1 from "crypto-js/hmac-sha1";
import { existsSync } from 'fs';
import * as crypto from "crypto-js";
import { IObjectEncryptWithCode, IObjectEncrypt } from '../types/objectEncrypts';
import { v4 as uuidv4 } from 'uuid';

export const ipConnection = () => {
    ipcMain.handle("getRouteImg" as ipcNames, async(e, args): Promise<string | undefined> =>{
        const route = dialog.showOpenDialogSync({ 
            properties: ['openFile'],
            filters: [{ name: "Images", extensions: ["jpg", "png", "gif", "webp", "jpeg"] }], 
        })
        
        if (route) return route[0];
        return undefined;
    })

    ipcMain.handle("initProgram" as ipcNames, async(e, args: string ) =>{
        const salt = bcryptjs.genSaltSync();
        const passwordBcryptjs = bcryptjs.hashSync( args, salt ); 

        const data = {
            password: passwordBcryptjs,
        }

        mkdirSync("./data", {recursive: true});
        writeFileSync( "./data/data.json", JSON.stringify(data));

        return data;
    })

    ipcMain.handle("getConfig" as ipcNames, async(e, args ): Promise<IObjectConfig | undefined> =>{
        try {
            const rawData = readFileSync("./data/data.json", {encoding: "utf-8"});
            const parseData = JSON.parse(rawData);
            return parseData;
            
        } catch (error) {
            return undefined;
        }
    })


    // FUNCTION ENCRYPT AND DESCRYPT
    ipcMain.handle("getEncryptsImgs" as ipcNames, async(e, args ): Promise<IObjectEncrypt[]> =>{
        const files = readdirSync("./data/encode");

        const rawData: IObjectEncryptWithCode[] = files.map( value => JSON.parse(readFileSync(`./data/encode/${value}`, "utf-8")));

        const dataWithNotCode = rawData.map( value => ({
            extension: value.extension,
            id: value.id,
            name: value.name,
            password: value.password,
            specialPassword: value.specialPassword,
        }))

        return dataWithNotCode;
    })

    ipcMain.handle("encryptImg" as ipcNames, async(e, args ): Promise<IObjectEncrypt> =>{
        const { name, route,  password, specialPassword } = args as { route: string, name: string, password: string, specialPassword?: string };

        // GET BASIC DATA
        // parse name
        let copyName = name.slice();
        copyName = copyName.replace(/-" +"\//g, "_");

        // get extension
        const extension = path.extname( route );

        // get data image
        const imgBase64 = readFileSync(route, "base64");

        // encrypt imgBase64
        let passwordToEncrypt = password;
        if (specialPassword) passwordToEncrypt = specialPassword;
        const encryptBase64 = crypto.AES.encrypt(imgBase64, passwordToEncrypt).toString();

        // encrypt password
        const salt = bcryptjs.genSaltSync();
        const encryptPassword = bcryptjs.hashSync(passwordToEncrypt, salt)

        // object encode
        const objectEncode = {
            code: encryptBase64,
            extension: extension,
            id: uuidv4(),
            name: copyName,
            password: encryptPassword,
            specialPassword: passwordToEncrypt !== password ? true : false,
        }

        // CREATE OBJECT ENCODE
        if (!existsSync("./data/encode")) mkdirSync("./data/encode", {recursive: true});

        writeFileSync(`./data/encode/${copyName}.json`, JSON.stringify(objectEncode));

        return {name, id: objectEncode.id, extension, password: encryptPassword, specialPassword: objectEncode.specialPassword}
    })

    ipcMain.handle("desencryptImg" as ipcNames, async(e, args): Promise<void> => {
        const {name: inputName, password: inputPassword}: {name: string, password: string} = args;

        const { code, extension, name, password, specialPassword }: IObjectEncryptWithCode = JSON.parse(readFileSync(`./data/encode/${inputName}.json`, "utf8"))

        const passwordValidate = bcryptjs.compareSync(inputPassword, password);
        if (!passwordValidate) throw new Error("password invalid");
        
        const rawDataDescrypt = crypto.AES.decrypt(code, inputPassword);
        const dataDescryptBase64 = rawDataDescrypt.toString(crypto.enc.Utf8);
        const dataDescrypt = Buffer.from(dataDescryptBase64).toString('utf8');

        const routeSave = dialog.showOpenDialogSync({ properties:["openDirectory", "createDirectory"] });

        unlinkSync(`./data/encode/${inputName}.json`)
        writeFileSync(`${routeSave}/${name+extension}`, dataDescrypt, "base64");
    })
}