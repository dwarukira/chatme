import React, { useEffect, useState } from "react"


export const VideoCall = () => {
    const [stream , setStream] = useState()
    const pcPeers = {}
    const userId = Math.floor(Math.random() * 10000);
    

    useEffect(() => {
        const remoteVideoContainer = document.getElementById("remote-video-container")
        navigator.mediaDevices.getUserMedia({
            audio: false, video: true
        }).then(stream => {
            const localStream = stream;
            const any: any = document.getElementById("local-video");
            setStream(stream)
            any.srcObject = stream;
        }).catch(error => { console.log(error) });
    }, [])

    const joinCall = () => {

    }

    const leaveCall = () => {

    }
    console.log(stream);
    

    return (
        <div className="VideoCall">
        <div id="remote-video-container"></div>
        <video id="local-video" autoPlay > </video>
        <button onClick={joinCall}>Join Call</button>
        <button onClick={leaveCall}>Leave Call</button>
       </div>
    )
}