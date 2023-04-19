import { RTCPeerConnection,RTCSessionDescription,mediaDevices } from 'react-native-webrtc';



class PeerService {
    constructor() {
        this.peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: [
                        "stun:stun.l.google.com:19302",
                        "stun:global.stun.twilio.com:3478",
                    ]
                }
            ]
        });
    }

    createRTCPeerConnectionAgain(){
      this.peer = new RTCPeerConnection({
        iceServers: [
            {
                urls: [
                    "stun:stun.l.google.com:19302",
                    "stun:global.stun.twilio.com:3478",
                ]
            }
        ]
    });
    }
    
    
    async getAnswer(offer) {
        if (this.peer) {
  
          await this.peer.setRemoteDescription(offer);
          const ans = await this.peer.createAnswer();
          await this.peer.setLocalDescription(new RTCSessionDescription(ans));
          return ans;
        }
      }
    
      async setLocalDescription(ans) {
        if (this.peer) {
          await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
        }
      }

      async getMediaOfUser(constraints,isVoiceOnly){

        let localStream;

        const mediaStream = await mediaDevices.getUserMedia(constraints);

        if ( isVoiceOnly ) {
            let videoTrack = await mediaStream.getVideoTracks()[ 0 ];
            videoTrack.enabled = false;
        };

        localStream=mediaStream;

        return localStream;
      }
    
      async getOffer() {


        let sessionConstraints = {
            mandatory: {
              OfferToReceiveAudio: true,
              OfferToReceiveVideo: true,
              VoiceActivityDetection: true
            }
          };



        if (this.peer) {
          const offer = await this.peer.createOffer(sessionConstraints);
          await this.peer.setLocalDescription(new RTCSessionDescription(offer));
          return offer;
        }
      }


}

export default new PeerService();