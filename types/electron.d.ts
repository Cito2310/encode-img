declare global {
    interface Window {
        electronAPI: {
            // basicOnIpc: ( value: string ) => unknown,
            // basicHandleIpc: ( value: string ) => unknown,
            getRouteImg: () => Promise<string | undefined>,
            saveDataEncrypt: (password: string) => Promise<any>
            initProgram: (password: string) => Promise<any>
        }
    }
}

export {}