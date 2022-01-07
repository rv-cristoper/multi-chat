import React from 'react'
import GrupalChats from './GrupalChats'
import './scss/chats.scss'
import PrivateChats from './PrivateChats'


interface IProps {
    optSelect: string
    setOptSelect: React.Dispatch<React.SetStateAction<string>>
    chatSelect: any
    setChatSelect: any
    addnewChat: string
}

const Chats = ({ optSelect, setOptSelect, chatSelect, setChatSelect, addnewChat }: IProps): JSX.Element => {


    return (
        <div className='chatsMain'>
            <div className='headerChat'>
                <div className={`optHeader ${optSelect === 'private-chat' ? 'select' : ''}`} onClick={() => setOptSelect('private-chat')}>Chats privados</div>
                <div className={`optHeader ${optSelect === 'group-chat' ? 'select' : ''}`} onClick={() => setOptSelect('group-chat')}>Chats grupales</div>
            </div>
            {
                optSelect === 'private-chat' ?
                    <PrivateChats chatSelect={chatSelect} setChatSelect={setChatSelect} addnewChat={addnewChat} />
                    :
                    <GrupalChats chatSelect={chatSelect}  setChatSelect={setChatSelect} />
            }

        </div >
    )
}

export default Chats
