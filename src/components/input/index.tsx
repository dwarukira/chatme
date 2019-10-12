import React, { useState, useContext } from "react"
import styled from "styled-components"

import { ReactComponent as Send } from "../../icons/message_send.svg"
import { observer } from "mobx-react-lite"
import { MessageStoreContext } from "../../store"
import { Firestore } from "../../config"
import { NODE_MESSAGES, ID } from "../../constants"
import moment from "moment"

const StyledChatInput = styled.div`
    background-color: #FFFFFF;
    height: 100%;
    display: flex;
    place-content: center;


    * {
        margin: 2rem;
    }

    input {
        width: 90%;
        
        border: none;
        background-color: #F1EDED;
        border-radius: 3em;
        padding: 1rem;
        word-break: break-word;
        :focus {
            outline: none;
        }

    }
`

const timestamp = moment().valueOf().toString()


export const ChatInput = observer(() => {
    const [message, setMessage] = useState("")

    const currentUserId: any = localStorage.getItem(ID)

   


    const messageStore = useContext(MessageStoreContext)
    const onChange = (event) => {
        setMessage(event.target.value)
    }

    
    const onKeyPressed = (event: any) => {
        if (event.key === 'Enter') {
            const itemMessage = {
                idFrom: currentUserId,
                idTo: messageStore.currentPeer.id,
                timestamp: timestamp,
                content: message.trim(),
                type: 0
            }

            setMessage("")

            Firestore
                .collection(NODE_MESSAGES)
                .doc(messageStore.groupChatId)
                .collection(messageStore.groupChatId)
                .doc(timestamp)
                .set(itemMessage)
                .then(() => {
                    setMessage("")

                })
                .catch(() => {

                })


        }
    }

    return (
        <StyledChatInput>
            <input
                name="message"
                onChange={onChange}
                value={message}
                onKeyPress={onKeyPressed}

            />

            <Send />

        </StyledChatInput>
    )
})