import { IObjectConfig } from './objectConfig';

declare global {
    interface Window {
        electronAPI: {
            getRouteImg: () => Promise<string | undefined>
            saveDataEncrypt: (password: string) => Promise<any>
            initProgram: (password: string) => Promise<IObjectConfig>
            getConfig: () => Promise<undefined | IObjectConfig >
        }
    }
}

export {}