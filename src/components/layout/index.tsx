import * as React from "react"

import { ReactComponent as MessageIcon } from "../../icons/Send.svg"
import { ReactComponent as SettingsIcon } from "../../icons/settings.svg"
import { ReactComponent as HomeIcon } from "../../icons/home.svg"
import { ReactComponent as PeopleIcon } from "../../icons/people.svg"
import { ReactComponent as More } from "../../icons/more.svg"
import { ReactComponent as VideosIcon } from "../../icons/videos.svg"
import { ReactComponent as CallIcon } from "../../icons/call.svg"
import { ReactComponent as LogoutIcon } from "../../icons/logout.svg";

import styled from "styled-components"
import { Messages } from "../messages"
import { ChatInput } from "../input"
import { UserList } from "../users"
import { PHOTO_URL, NICKNAME } from "../../constants"
import { observer } from "mobx-react-lite"
import { MessageStoreContext } from "../../store"
import { Firebase } from "../../config"
import { UserIcon } from "../users/icon"
import { withRouter } from "react-router"
import { ChartLoader } from "../loaders"

const StyledLayout = styled.div`
  

    display: flex;
    flex-wrap: wrap;

    // Grid
    display: grid;
    height: 100vh;

    grid-template-columns: 70px 3fr 10fr;


    grid-template-areas:  "nav aside main";

    


    .nav {
        flex: 0 0 250px;
        grid-area: nav;
        background-color: #292F4C;

        display: grid;
        place-content:start center;
        grid-gap:2em;


        padding-top: 10em;
       


    
        
    }

    .input {
        z-index: 999;
        position: sticky;
        bottom: 0;

        /* border-top: 1px solid #E2E2E2; */

        box-shadow: 0 20px 50px #E2E2E2;

    }

   

    .main {
        flex: 1;
        grid-area: main;
       
        overflow-y: scroll;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;

        /* background-color: #f4f7fa; */
        grid-template-rows: 80px 10fr 1fr; 

        display: grid;


       
    }

    .aside {
        grid-area: aside;
        flex:1;
        border-right: 1px solid #f4f7fa;

        overflow-y: scroll;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
    }

    @media screen and (min-width: 48rem) {
        --spacing: 2rem;
    }
`


const StyledTop = styled.div`
    border-bottom: 1px solid #EDEDED;
    padding: 0 50px;    
    display: flex;
    place-content: start space-between;
    

    position: sticky;
    top: 0;

    z-index: 1000;
    background-color: #FFFFFF;

    .actions {
        display: flex;
        align-content: center;
        align-items: center;
        flex: 0 0 130px;

        justify-content: space-between;
    }

   

    .user {
        display: flex;
        align-content: center;
        align-items: center;

        &__text {
            padding-left: 1em;
            * {
                margin: 0;
                padding-bottom: 0.5em;
            }
        }



    }

`

const Dropdrop = styled.div`

    position: relative;
    display: inline-block;
    

    .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding: 12px 16px;
    z-index: 1;
    }

    .dropdown:hover .dropdown-content {
    display: block;
    }
`


const Top = ({ peer }) => {
    return (
        <StyledTop>
            <div className="user">
                <div>
                    <UserIcon url={peer.photoUrl} />
                </div>

                <div className="user__text">
                    <h3> {peer.nickname} </h3>
                    <span>Offline . Last seen 3 hours ago</span>
                </div>

            </div>

            <div className="actions">
                <CallIcon />
                <VideosIcon />

                <More />


            </div>

        </StyledTop>
    )
}


const StyledWelcome = styled.div`
    display: grid;
    place-content: center;
    height: 100vh;

    margin-left: -300px;
    margin-top: -100px;


    div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
`

const Welcome = () => {
    const currentUserNickname = localStorage.getItem(NICKNAME)
    const currentUserPhotoUrl: any = localStorage.getItem(PHOTO_URL)
    return (
        <StyledWelcome>
            <div>
                <h3> Welcome , {currentUserNickname} </h3>
                <UserIcon url={currentUserPhotoUrl} />
                <p> Let's start talking. Great things might happen. </p>
            </div>

        </StyledWelcome>
    )
}

export const Layout = withRouter(observer(({ history }: any) => {
    const messageStore = React.useContext(MessageStoreContext)
    
    const doLogout = () => {
        Firebase
        .auth()
        .signOut()
        .then(() => {
            localStorage.clear()
            history.push('/')
        })
        .catch(function (err) {
          
        })
    }
    return (
        <StyledLayout>
            <nav className="nav">
                <HomeIcon />
                <MessageIcon />
                <PeopleIcon />
                <SettingsIcon />
                <LogoutIcon onClick={doLogout}/>
            </nav>

            <aside className="aside">
                <UserList />
            </aside>


            <main className="main">

                {messageStore.currentPeer ?
                    <>
                        <Top peer={messageStore.currentPeer} />

                        <div className="messages">
                            {messageStore.currentPeer ? <Messages /> : <p> <ChartLoader /> </p>}
                        </div>


                        <div className="input">
                            <ChatInput />
                        </div>
                    </> : <Welcome />}

            </main>
        </StyledLayout>
    )
}))