declare global {
    interface Window {
        electronAPI: {
            // basicOnIpc: ( value: string ) => unknown,
            // basicHandleIpc: ( value: string ) => unknown,
            getRouteImg: () => Promise<string | undefined>,
        }
    }
}

export {}