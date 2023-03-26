import { dialog, ipcMain } from 'electron';

import { ipcNames } from '../types/ipcNames';

export const ipConnection = () => {

    // ipcMain.on("basic-on-ipc" as ipcNames, (e, args)=>{
    //     console.log(args)
    // })

    // ipcMain.handle("basic-handle-ipc" as ipcNames, async(e, args)=>{
    //     return args
    // })

    ipcMain.handle("getRouteImg" as ipcNames, async(e, args): Promise<string | undefined> =>{
        const route = dialog.showOpenDialogSync({ 
            properties: ['openFile'],
            filters: [{ name: "Images", extensions: ["jpg", "png", "gif", "webp", "jpeg"] }], 
        })
        
        if (route) return route[0];
        return undefined;
    })
}