import { mediaDevices,RTCPeerConnection } from 'react-native-webrtc';


let mediaConstraints = {
	audio: true,
	video: {
		frameRate: 30,
		facingMode: 'user'
	}
};

let localMediaStream;
let remoteMediaStream;
let isVoiceOnly = false;
let peerConstraints = {
	iceServers: [
		{
			urls: 'stun:stun.l.google.com:19302'
		}
	]
};

export const getMediaFromUserAndCreateIceServer=async()=>{

    try {
        const mediaStream = await mediaDevices.getUserMedia( mediaConstraints );

        

        if ( isVoiceOnly ) {
            let videoTrack = await mediaStream.getVideoTracks()[ 0 ];
            videoTrack.enabled = false;
        };

        localMediaStream = mediaStream;

        let peerConnection = new RTCPeerConnection( peerConstraints );

                // Add our stream to the peer connection.
       localMediaStream.getTracks().forEach((track) => peerConnection.addTrack(track, localMediaStream));

     

       return {peerConnection,localMediaStream};

    } catch( error ) {
      console.log(error);
    };

 
}

