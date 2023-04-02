import React, { createContext, useState, useRef, useEffect } from 'react';

const WebrtcContext = createContext();

let mediaConstraints = {
	audio: true,
	video: {
		frameRate: 30,
		facingMode: 'user'
	}
};


let peerConstraints = {
	iceServers: [
		{
			urls: 'stun:stun.l.google.com:19302'
		}
	]
};



const contextProvider=({children})=>{

    const [localMediaStream, setLocalMediaStream] = useState(null);
    const [remoteMediaStream, setRemoteMediaStream] = useState(null);
    const [isVoiceOnly, setIsVoiceOnly] = useState(false);
    const [peerConnection, setPeerConnection] = useState(null);

     const getMediaFromUserAndCreateIceServer=async()=>{

        try {
            const mediaStream = await mediaDevices.getUserMedia( mediaConstraints );
    
            
    
            if ( isVoiceOnly ) {
                let videoTrack = await mediaStream.getVideoTracks()[ 0 ];
                videoTrack.enabled = false;
            };
    
           setLocalMediaStream(mediaStream);
    
            let peerConnection = new RTCPeerConnection( peerConstraints );

            setPeerConnection(peerConnection);


    
                    // Add our stream to the peer connection.
           localMediaStream.getTracks().forEach((track) => peerConnection.addTrack(track, localMediaStream));
    
         
    
           return {peerConnection,localMediaStream};
    
        } catch( error ) {
          console.log(error);
        };
    
     
    }








    return (
        <WebrtcContext.Provider>
            {children}
        </WebrtcContext.Provider>
    )
}