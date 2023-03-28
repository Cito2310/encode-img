export interface IObjectEncrypts {
    name: string,
    code: string,
    password: string,
    specialPassword: boolean,
    extension: string,
}

export interface IObjectEncryptsNotCode {
    name: string,
    password: string,
    specialPassword: boolean,
    extension: string,  
}