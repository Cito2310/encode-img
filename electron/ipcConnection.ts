import { dialog, ipcMain } from 'electron';
import * as bcryptjs from "bcryptjs";

import { ipcNames } from '../types/ipcNames';
import { mkdirSync, writeFileSync, readFileSync } from 'fs';
import { IObjectConfig } from '../types/objectConfig';

export const ipConnection = () => {

    // ipcMain.on("basic-on-ipc" as ipcNames, (e, args)=>{
    //     console.log(args)
    // })

    ipcMain.handle("getRouteImg" as ipcNames, async(e, args): Promise<string | undefined> =>{
        const route = dialog.showOpenDialogSync({ 
            properties: ['openFile'],
            filters: [{ name: "Images", extensions: ["jpg", "png", "gif", "webp", "jpeg"] }], 
        })
        
        if (route) return route[0];
        return undefined;
    })

    ipcMain.handle("saveDataEncrypt" as ipcNames, async(e, args) =>{
        return args;
        // const route = dialog.showOpenDialogSync({ 
        //     properties: ['openFile'],
        //     filters: [{ name: "Images", extensions: ["jpg", "png", "gif", "webp", "jpeg"] }], 
        // })
        
        // if (route) return route[0];
        // return undefined;
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

    ipcMain.handle("getConfig" as ipcNames, async(e, args ): Promise<undefined | IObjectConfig> =>{
        try {
            
            const raw = readFileSync("./data/data.json", { encoding: "utf-8" });
            const data = JSON.parse(raw);
            return data;

        } catch (error) {

            return undefined;
        }
    })
}