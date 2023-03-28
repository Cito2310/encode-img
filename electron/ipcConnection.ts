import { dialog, ipcMain } from 'electron';
import * as bcryptjs from "bcryptjs";

import { ipcNames } from '../types/ipcNames';
import { mkdirSync, writeFileSync, readFileSync, readdir, readdirSync, write } from 'fs';
import { IObjectConfig } from '../types/objectConfig';
import * as path from 'path';
import * as hmacSHA1 from "crypto-js/hmac-sha1";
import { existsSync } from 'fs';
import * as crypto from "crypto-js";
import { IObjectEncryptsNotCode, IObjectEncrypts } from '../types/objectEncrypts';

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

    ipcMain.on("encodeImg" as ipcNames, async(e, args ): Promise<void> =>{
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
            name: copyName,
            code: encryptBase64,
            password: encryptPassword,
            specialPassword: passwordToEncrypt !== password ? true : false,
            extension: extension,
        }


        // CREATE OBJECT ENCODE
        if (!existsSync("./data/encode")) mkdirSync("./data/encode", {recursive: true});

        writeFileSync(`./data/encode/${copyName}.json`, JSON.stringify(objectEncode));
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

    ipcMain.handle("getEncryptImg" as ipcNames, async(e, args ): Promise<IObjectEncryptsNotCode[]> =>{
        const files = readdirSync("./data/encode");

        const rawData: IObjectEncrypts[] = files.map( value => JSON.parse(readFileSync(`./data/encode/${value}`, "utf-8")));

        const dataWithNotCode = rawData.map( value => ({
            extension: value.extension,
            name: value.name,
            password: value.password,
            specialPassword: value.specialPassword
        }))

        return dataWithNotCode;
    })

    ipcMain.on("desencryptImg" as ipcNames, async(e, args): Promise<void> => {
        const {name: inputName, password: inputPassword}: {name: string, password: string} = args;

        const { code, extension, name, password, specialPassword }: IObjectEncrypts = JSON.parse(readFileSync(`./data/encode/${inputName}.json`, "utf8"))

        const passwordValidate = bcryptjs.compareSync(inputPassword, password);
        if (!passwordValidate) throw new Error("password invalid");
        
        const rawDataDescrypt = crypto.AES.decrypt(code, inputPassword);
        const dataDescryptBase64 = rawDataDescrypt.toString(crypto.enc.Utf8);
        const dataDescrypt = Buffer.from(dataDescryptBase64).toString('utf8');

        const routeSave = dialog.showOpenDialogSync({ properties:["openDirectory", "createDirectory"] });

        writeFileSync(`${routeSave}/${name+extension}`, dataDescrypt, "base64");
    })
}