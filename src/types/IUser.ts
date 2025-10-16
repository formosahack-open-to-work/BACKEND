export interface IUser {
    _id: any | string,
    name: string,
    email: string,
    password: string,
    role: string,
    condition: string,
    createdAt?:Date,
    updatedAt?:Date
}
