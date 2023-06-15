export interface UserData {
    id?: number,
    name: string,
    email: string,
    username: string,
    password:string,
    phone?: number,
    birthdate: number | string,
    gender: string,
    picture?: string
}