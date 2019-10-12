import React, { useEffect, useState, useContext } from "react"
import styled from "styled-components"
import { Firestore } from "../../config"
import { NODE_USERS, ID } from "../../constants"
import { observer } from "mobx-react-lite"
import { MessageStoreContext } from "../../store"
import { UserIcon } from "./icon"
import { UserLoader } from "../loaders"

const StyledCard = styled.div`
    background-color: #ffffff;
    box-shadow: 0 20px 50px #E2E2E2;
    margin: 20px;
    padding: 20px;

    border-radius: 6px;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

        .intro {
            display: flex;
           
        }

        .details {
            padding-left: 1em;
        }

        .username {
            font-size: 18px;
            font-weight: 600;
        }

        .status {
            opacity: 0.5;
        }

        .time {
            opacity: 0.5;
        }

        .body {
            p {
                font-size: 14px;
            }
        }

    }
`


function* range(start, end) {
    yield start;
    if (start === end) return;
    yield* range(start + 1, end);
}

const UserCard = ({ nickname, photoUrl }: any) => {

    return (
        <StyledCard>
            <div className="header">
                <div className="intro" >
                    <UserIcon url={photoUrl} />
                    <div className="details" > 
                        <div className="username"> { nickname } </div>
                        <div className="status"> Online </div>
                    </div>
                </div>
                
                <span className="time"> 3hr ago  </span>



            </div>

            <div className="body">
                {/* <p>Duncan I love data all that matter</p> */}
            </div>
        </StyledCard>
    )
}

export const UserList = observer(() => {
    
    const [ listUser , setListUser ] = useState()
    const [ loading ,  setLoading ] = useState(false)
    const messageStore = useContext(MessageStoreContext)
    const currentUserId = localStorage.getItem(ID)

    useEffect(() => {
        getListUsers()
    } ,[])
    const getListUsers = async () => {
        setLoading(true)
        const result = await Firestore
        .collection(NODE_USERS)
        .get()
        if (result.docs.length > 0) {
            setListUser([...result.docs])
            setLoading(false)
        }
    }

    const renderListUser = () => {
        let viewListUser: any = []
        if (listUser.length > 0) {
            listUser.forEach((item: any) => {
                if (item.data().id !== currentUserId) {
                    const { nickname, photoUrl } =  item.data()
                    viewListUser.push(
                        <div onClick={() => messageStore.setCurrentPeer(item.data()) }>
                            <UserCard 
                                nickname={nickname}
                                photoUrl={photoUrl}
                                key={nickname} />
                        </div>
                    )
                }
                
            });
           
        }

        return viewListUser
    }
    


    return (
        <div>
            {loading && (<> {
                [...range(1, 5)].map((item) => (
                    <StyledCard key={item}>
                        <UserLoader />
                    </StyledCard>
                ))
            } </>) }
               
            
            {listUser && renderListUser()}
        </div>
    )
})