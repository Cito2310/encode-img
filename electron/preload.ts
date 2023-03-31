import { ipcNames } from "../types/ipcNames"

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    getRouteImg: () => ipcRenderer.invoke("getRouteImg" as ipcNames),
    initProgram: ( password: string ) => ipcRenderer.invoke("initProgram" as ipcNames, password),
    getConfig: () => ipcRenderer.invoke("getConfig" as ipcNames),

    // FUNCTION ENCRYPT AND DESCRYPT
    getEncryptsImgs: () => ipcRenderer.invoke("getEncryptsImgs" as ipcNames),
    encryptImg: (route: string, name: string, password: string, specialPassword?: string) => ipcRenderer.send('encryptImg' as ipcNames, { route, name, password, specialPassword }),
    desencryptImg: (name: string, password: string) => ipcRenderer.send('desencryptImg' as ipcNames, { name, password }),
})