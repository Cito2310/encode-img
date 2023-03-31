import { IObjectConfig } from './objectConfig';
import { IObjectEncryptsNotCode } from './objectEncrypts';

declare global {
    interface Window {
        electronAPI: {
            getRouteImg: () => Promise<string | undefined>
            initProgram: (password: string) => Promise<IObjectConfig>
            getConfig: () => Promise<undefined | IObjectConfig >
            
            getEncryptsImgs: () => Promise<IObjectEncryptsNotCode[]>
            encryptImg: (route: string, name: string, password: string, specialPassword?: string) => Promise<void>
            desencryptImg: ( name: string, password: string ) => Promise<void>
        }
    }
}

export {}