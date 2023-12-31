export interface UserData {
    id?: number,
    name: string,
    email: string,
    username: string,
    password: string,
    phone?: number | string,
    birthdate: Date,
    gender: string,
    picture?: string
}