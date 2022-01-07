import React from 'react'
import GrupalChats from './GrupalChats'
import { IGrupalChat } from '../IDashboard'
import './scss/chats.scss'
import PrivateChats from './PrivateChats'


interface IProps {
    optSelect: string
    setOptSelect: React.Dispatch<React.SetStateAction<string>>
    setChatSelect: React.Dispatch<React.SetStateAction<IGrupalChat | undefined>>
}

const Chats = ({ optSelect, setOptSelect, setChatSelect }: IProps): JSX.Element => {


    return (
        <div className='chatsMain'>
            <div className='headerChat'>
                <div className={`optHeader ${optSelect === 'private-chat' ? 'select' : ''}`} onClick={() => setOptSelect('private-chat')}>Chats privados</div>
                <div className={`optHeader ${optSelect === 'group-chat' ? 'select' : ''}`} onClick={() => setOptSelect('group-chat')}>Chats grupales</div>
            </div>
            {
                optSelect === 'private-chat' ?
                    <PrivateChats />
                    :
                    <GrupalChats setChatSelect={setChatSelect} />
            }

        </div >
    )
}

export default Chats
