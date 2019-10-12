import React, { useContext, useEffect } from "react"
import styled from "styled-components"
import { observer } from "mobx-react-lite"
import moment from 'moment';
import { MessageStoreContext } from "../../store"
import { ID, NODE_MESSAGES, DOC_ADDED } from "../../constants";
import { Firestore } from "../../config";
import { ChartLoader } from "../loaders";

interface StyledMessageProps {
    to?: boolean
}

const StyledMessage = styled.div<StyledMessageProps>`
    align-self: ${props => props.to ? 'flex-end' : 'start'};
    .message {
    
        border-radius: 1em;
        background: ${props => props.to ? "#F44A4A" : "#FFFFFF"};
        color: ${props => props.to ? "#FFFFFF" : "#000000"};
        box-shadow:0px 8px 24px #E2E2E2;
        height: auto;
        max-width: 370px;
        display: inline-flex;

        max-width: 371px;
        min-width: 100px;        
        position: relative;
        padding: 1em;


        font-size: 20px;

         
       

        :after {
            content: '';
            position: absolute;
            bottom: 0;
            right: 1em;
            width: 0;
            height: 0;
            border: 1.063em solid transparent;
            border-top-color: ${props => props.to ? "#F44A4A" : "#FFFFFF"};
            border-bottom: 0;
            border-right: 0;
            margin-left: -0.531em;
            margin-bottom: -1.062em;
        }

    }


    .timestamp {
        padding: 1em;
        font-size: 12px;
    }

    
`

interface MessageProps {
    message: string,
    to?: boolean
    time: number
}

const Message = ({ message, to, time }: MessageProps) => {

    return (
        <StyledMessage to={to} >
            <div className="message">
                <span> {message} </span>
            </div>

            <div className="timestamp"> {moment.duration(time - moment().valueOf()).humanize()} </div>
        </StyledMessage>
    )
}

const StyledMessages = styled.div`
    padding: 50px 50px;
    display: flex;
    flex-direction: column;

    
`


const hashString = str => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        hash += Math.pow(str.charCodeAt(i) * 31, str.length - i)
        hash = hash & hash // Convert to 32bit integer
    }
    return hash
}

export const Messages = observer(() => {
    const listMessage: any = []
    
    let removeListener: any
    const currentUserId = localStorage.getItem(ID)
    const messageStore = useContext(MessageStoreContext)

    useEffect(() => {
        getListHistory()
    }, [messageStore.currentPeer])

    const getListHistory = () => {
        if (removeListener) {
            removeListener()
        }
        messageStore.clearMessages()
        if (hashString(currentUserId) <= hashString(messageStore.currentPeer.id)) {
            messageStore.setgroupChatId(`${currentUserId}-${messageStore.currentPeer.id}`)
        } else {
            messageStore.setgroupChatId(`${messageStore.currentPeer.id}-${currentUserId}`)
        }

        removeListener = Firestore
            .collection(NODE_MESSAGES)
            .doc(messageStore.groupChatId)
            .collection(messageStore.groupChatId)
            .onSnapshot(
                snapshot => {
                    snapshot.docChanges().forEach(change => {
                        if (change.type === DOC_ADDED) {
                            listMessage.push(change.doc.data())
                        
                            messageStore.setMessages(change.doc.data())
                            
                        }
                    })
                }
            )


    }

    const renderListMessage = () => {        
        if (messageStore.messages.length > 0) {
            let viewListMessage: any = []
            messageStore.messages.forEach((item: any, index) => {
                
                if (item.idFrom === currentUserId) {
                    viewListMessage.push(<Message
                        key={index}
                        message={item.content}
                        to={true}
                        time={item.timestamp}
                    />)
                } else {
                    viewListMessage.push(<Message
                        key={index}
                        message={item.content}
                        to={false}
                        time={item.timestamp}
                    />)
                }
            })

            return viewListMessage
        }


        return <div> <ChartLoader /> </div>
    }



    return (
        <StyledMessages>
            

            {renderListMessage()}


        </StyledMessages>
    )
})
