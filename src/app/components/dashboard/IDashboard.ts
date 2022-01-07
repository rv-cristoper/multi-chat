export interface IMessage {
    id: string
    user: string
    idUser: string
    message: string
    noVisible: string[]
}
export interface IGrupalChat {
    id: string
    name: string
    type: string
    messages: IMessage[]
}

export interface IPrivateChat {
    id: string
    type: string
    messages: IMessage[]
    members: string[]
}

export interface IUser {
    id: string
    name: string
    status: boolean
}