import { observable, action } from "mobx"
import { createContext } from "react";

interface Message {
    message: string
    time: Date
    to: boolean
}

class MessageStore {
    @observable messages: Array<Message> = [
       
    ];
    @observable users = []


    @observable currentPeer: any

    @observable groupChatId: any


    @action setMessages = (message: any) => {
        this.messages.push(message);
    };


    @action clearMessages = () => {
        this.messages = []
    };

    @action setCurrentPeer = (peer: any) => {
        this.currentPeer = peer
    }

    @action setgroupChatId = (id: any) => {
        this.groupChatId = id
    }
}



export const MessageStoreContext = createContext(new MessageStore())