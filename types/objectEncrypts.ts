
export interface IObjectEncrypt {
    extension: string,  
    id: string,
    name: string,
    password: string,
    specialPassword: boolean,
}

export interface IObjectEncryptWithCode extends IObjectEncrypt {
    code: string,
}