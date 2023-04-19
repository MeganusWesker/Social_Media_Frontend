import { mediaDevices,RTCPeerConnection } from 'react-native-webrtc';


export const getPeerConncetionAndLocalMedia = () => async (dipatch) => {

    try {

        dipatch({
            type: "getPeerConncetionAndLocalMediaRequest",
        });

        let peerConstraints = {
            iceServers: [
                {
                    urls: 'stun:stun.l.google.com:19302'
                }
            ]
        };

        let mediaConstraints = {
            audio: true,
            video: {
                frameRate: 30,
                facingMode: 'user'
            }
        };

        let localMediaStream;
        let isVoiceOnly = false;



        const mediaStream = await mediaDevices.getUserMedia( mediaConstraints );

        

        if ( isVoiceOnly ) {
            let videoTrack = await mediaStream.getVideoTracks()[ 0 ];
            videoTrack.enabled = false;
        };

        localMediaStream = mediaStream;

        let peerConnection = new RTCPeerConnection( peerConstraints );

                // Add our stream to the peer connection.
       localMediaStream.getTracks().forEach((track) => peerConnection.addTrack(track, localMediaStream));

     

    
        dipatch({
            type: "getPeerConncetionAndLocalMediaSuccess",
            payload: {peerConnection,localMediaStream},
        });



    } catch (error) {
        dipatch({
            type: "getPeerConncetionAndLocalMediaFail",
            payload: error,
        });
    }
}