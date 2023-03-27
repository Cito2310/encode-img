import { ipcNames } from "../types/ipcNames"

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    // basicOnIpc: ( value: string ) => ipcRenderer.send('basic-on-ipc' as ipcNames, value),
    // basicHandleIpc: ( value: string ) => ipcRenderer.invoke('basic-handle-ipc' as ipcNames, value)
    getRouteImg: () => ipcRenderer.invoke("getRouteImg" as ipcNames),
    saveDataEncrypt: ( password: string ) => ipcRenderer.invoke("saveDataEncrypt" as ipcNames, password),
    initProgram: ( password: string ) => ipcRenderer.invoke("initProgram" as ipcNames, password),
})