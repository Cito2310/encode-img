import { ipcNames } from "../types/ipcNames"

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    encodeImg: (route: string, name: string, password: string, specialPassword?: string) => ipcRenderer.send('encodeImg' as ipcNames, { route, name, password, specialPassword }),
    desencryptImg: (name: string, password: string) => ipcRenderer.send('desencryptImg' as ipcNames, { name, password }),
    getRouteImg: () => ipcRenderer.invoke("getRouteImg" as ipcNames),
    initProgram: ( password: string ) => ipcRenderer.invoke("initProgram" as ipcNames, password),
    getConfig: () => ipcRenderer.invoke("getConfig" as ipcNames),
    getEncryptImg: () => ipcRenderer.invoke("getEncryptImg" as ipcNames),
})