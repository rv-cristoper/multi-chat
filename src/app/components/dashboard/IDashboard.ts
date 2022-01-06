export interface IGrupalChat {
    id: string
    name: string
    type: string
    messages: IMessage[]
}

export interface IMessage {
    id: string
    user: string
    idUser: string
    message: string
    noVisible: []
}