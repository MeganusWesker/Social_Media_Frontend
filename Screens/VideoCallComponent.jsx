import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { colors, defaultStyle, flexBoxBasic } from "../style/style";
import socket from "../utils/socket";
import peerConnection from "../utils/webrtcClass";
import { RTCIceCandidate, RTCView,RTCSessionDescription } from "react-native-webrtc";
import { useSelector } from "react-redux";
import { Avatar } from "react-native-paper";
import Toast from 'react-native-toast-message';

let remoteCandidates = [];

const size = Dimensions.get("screen").width;

const VideoCallComponent = ({ route,navigation }) => {
  const recievedOffer = route.params.recievedOffer;
  const [isVoiceOnly, setIsVoiceOnly] = useState(false);
  const [audioIcon, setAudioIcon] = useState("microphone");
  const [speakerIcon, setSpeakerIcon] = useState("volume-high");
  const [cameraIcon, setCameraIcon] = useState("video");
  
  const [callDeclined, setCallDeclined] = useState(false);
  const [videoCallOptions, setVideoCallOptions] = useState(true);
  const [localMediaStream, setLocalMediaStream] = useState();
  const [remoteMediaStream, setRemoteMediaStream] = useState();

  const { user } = useSelector((state) => state.user);

  const createOffer = async () => {
    let mediaConstraints = {
      audio: true,
      video: {
        frameRate: 30,
        facingMode: "user",
      },
    };

    const mediaStream = await peerConnection.getMediaOfUser(
      mediaConstraints,
      isVoiceOnly
    );

    setLocalMediaStream(mediaStream);

    mediaStream
      .getTracks()
      .forEach((track) => peerConnection.peer.addTrack(track, mediaStream));

    const offerDescription = await peerConnection.getOffer();

    socket.emit(
      "CallUser",
      user._id,
      route.params.userId,
      offerDescription,
      user.avatar.url,
      user.userName
    );
  };

  function processCandidates() {
    if (remoteCandidates.length < 1) {
      return;
    }

    remoteCandidates.map((candidate) =>
      peerConnection.peer.addIceCandidate(candidate)
    );
    remoteCandidates = [];
  }

  const acceptOffer = async () => {
    let mediaConstraints = {
      audio: true,
      video: {
        frameRate: 30,
        facingMode: "user",
      },
    };

    const mediaStream = await peerConnection.getMediaOfUser(
      mediaConstraints,
      isVoiceOnly
    );

    setLocalMediaStream(mediaStream);

    mediaStream
      .getTracks()
      .forEach((track) => peerConnection.peer.addTrack(track, mediaStream));

    const answerDescription = await peerConnection.getAnswer(recievedOffer);

    processCandidates();

    socket.emit(
      "sendOfferAnswer",
      user._id,
      route.params.userId,
      answerDescription
    );
  };

  const setRemoteAns = async (offerAns) => {
    await peerConnection.setLocalDescription(offerAns);
  };

  const swapCameraHandler = async () => {
    try {
      // Taken from above, we don't want to flip if we don't have another camera.

      const videoTrack = await localMediaStream.getVideoTracks()[0];
      videoTrack._switchCamera();
    } catch (err) {
      console.log(err);
    }
  };


  const turnOnOffAudioHandler = async () => {
    try {
      const audioTrack = await localMediaStream.getAudioTracks()[ 0 ];
      audioTrack.enabled = !audioTrack.enabled;
      setAudioIcon((prev)=> prev === "microphone" ? "microphone-off" : "microphone");
    } catch( err ) {
      console.log(err);
    };
  };

  const turnOnOffOtherPersonAudioHandler = async () => {
    try {
      const audioTrack = await remoteMediaStream?.getAudioTracks()[ 0 ];
      if(audioTrack){
        audioTrack.enabled = !audioTrack.enabled;
        setSpeakerIcon((prev)=> prev === "volume-high" ? "volume-off" : "volume-high");
      }

    } catch( err ) {
      console.log(err);
    };
  };

  const onAndOFfCamera = async () => {
    try {
    
      const videoTrack = await localMediaStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setCameraIcon((prev)=>prev==="video" ? "video-off" : "video");

    } catch (err) {
      console.log(err);
    }
  };

  const handleIcecandidateFromReciever = () => {
    route.params.iceCandidates &&
      route.params.iceCandidates.forEach((item) => {
        const iceCandidate = new RTCIceCandidate(item);

        if (peerConnection.peer.remoteDescription == null) {
          return remoteCandidates.push(iceCandidate);
        }

        return peerConnection.peer.addIceCandidate(iceCandidate);
      });
  };

  const hangUpHandler=async()=>{
    localMediaStream.getTracks().forEach(
      track => track.stop()
    );
  
    peerConnection.peer.close();
    peerConnection.createRTCPeerConnectionAgain();

    Toast.show({
      type: 'success',
      text1: `Call ended `,
    });

    setLocalMediaStream(null);
    navigation.goBack();
  
    socket.emit("callHangUp",route.params.userId,"call has been disconnected");
  }


  const handleRemoteCandidate = ({ iceCandidate }) => {
    console.log(
      `canidate from user:${user.name} ${JSON.stringify(iceCandidate)}`
    );

    iceCandidate = new RTCIceCandidate(iceCandidate);

    if (peerConnection.peer.remoteDescription == null) {
      return remoteCandidates.push(iceCandidate);
    }

    return peerConnection.peer.addIceCandidate(iceCandidate);
  };

  const handleIcecandidate = useCallback(async (event) => {
    if (!event.candidate) {
      return;
    }

    socket.emit(
      "getIceCandidate",
      user._id,
      route.params.userId,
      event.candidate
    );
  }, []);

  const handleIcecandidateError = (event) => {
    console.log(
      `error from handleIceCandidateError:${event.errorCode} ${event.errorText}`
    );
  };

  const handleSendCallDecline=()=>{
    setCallDeclined(true);
  }


  const callDeclinedHandler=()=>{
  
    if (localMediaStream) {
      localMediaStream.getTracks().forEach(track => track.stop());
      peerConnection.peer.getSenders().forEach(sender => {
        peerConnection.peer.removeTrack(sender);
      });
    }

    peerConnection.peer.close();

    peerConnection.createRTCPeerConnectionAgain();

      Toast.show({
        type: 'error',
        text1: `Call declined `,
      });

      setLocalMediaStream(null);
      navigation.goBack();
  }


  const handleCallHangUp = useCallback(()=>{

    setLocalMediaStream(null);
    setRemoteMediaStream(null);

    navigation.goBack();

    peerConnection.peer.close();
    peerConnection.createRTCPeerConnectionAgain();

    Toast.show({
      type: 'success',
      text1: `Call endded `,
    });
    
  },[]);



  useEffect(() => {
    socket.on("sendBackIceCandidate", handleRemoteCandidate);
    socket.on("sendCallDecline", handleSendCallDecline);
     socket.on("handleCallHangUp", handleCallHangUp);

    return () => {
      socket.off("sendBackIceCandidate", handleRemoteCandidate);
      socket.off("sendCallDecline", handleSendCallDecline);
      socket.off("handleCallHangUp", handleCallHangUp);
    };
  }, [handleRemoteCandidate,handleSendCallDecline,handleCallHangUp]);

  useEffect(() => {
    peerConnection.peer.addEventListener("track", async (event) => {
      const remoteStream = event.streams;

      setRemoteMediaStream(remoteStream[0]);
    });
  });

  const handleIceconnectionstatechange = useCallback(
    (e) => {
      console.log(
        `ICE connection state changed to ${peerConnection.peer.iceConnectionState}`
      );

      if (peerConnection.peer.iceConnectionState === "closed") {
        
        console.log("closed State se hun Vro :=>",JSON.stringify(remoteMediaStream));
      
        remoteMediaStream.getTracks().forEach(
          track => track.stop()
        );

        setRemoteMediaStream(null);
      }
    },
    [peerConnection.peer]
  );

  const handleConnectionstatechange = () => {
    if (peerConnection.peer.connectionState === "closed") {
      peerConnection.createRTCPeerConnectionAgain();
    }
  };

  useEffect(() => {
    peerConnection.peer.addEventListener(
      "iceconnectionstatechange",
      handleIceconnectionstatechange
    );
    peerConnection.peer.addEventListener(
      "connectionstatechange",
      handleConnectionstatechange
    );
    return () => {
      peerConnection.peer.removeEventListener(
        "iceconnectionstatechange",
        handleIceconnectionstatechange
      );
      peerConnection.peer.removeEventListener(
        "connectionstatechange",
        handleConnectionstatechange
      );
    };
  }, [handleIceconnectionstatechange, handleConnectionstatechange]);

  useEffect(() => {
    socket.on("getOfferAnswer", async (data) => {
      await setRemoteAns(data.answerDescription);
    });
  }, []);

  useEffect(() => {
    peerConnection.peer.addEventListener(
      "icecandidateerror",
      handleIcecandidateError
    );

    return () => {
      peerConnection.peer.removeEventListener(
        "icecandidateerror",
        handleIcecandidateError
      );
    };
  }, [handleIcecandidateError]);

  useEffect(() => {
    peerConnection.peer.addEventListener("icecandidate", handleIcecandidate);

    return () => {
      peerConnection.peer.removeEventListener(
        "icecandidate",
        handleIcecandidate
      );
    };
  }, [handleIcecandidate]);

  useEffect(() => {
    route.params.recievedOffer && acceptOffer();
  }, []);

  useEffect(() => {
    route.params.callUser && createOffer();
  }, []);

  useEffect(() => {
    route.params.iceCandidates && handleIcecandidateFromReciever();
  }, []);

  useEffect(() => {
    if(callDeclined){
      callDeclinedHandler();
    }
 
  }, [callDeclined]);



  return (
    <>
      <View
        style={{
          flex: 1,
        }}
      >
        {localMediaStream && (
          <RTCView
            mirror={false} // true will invert the camera 
            objectFit={"cover"}
            streamURL={localMediaStream.toURL()}
            zOrder={2}
            style={{
              width: 200,
              height: 200,
              position: "absolute",
              top: 10,
              right: 50,
            }}
          />
        )}

        {remoteMediaStream && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setVideoCallOptions((prev) => !prev)}
            style={{
              flex: 1,
            }}
          >
            {videoCallOptions && (
              <View
                style={{
                  position: "absolute",
                  bottom: 40,
                  borderRadius: 20,
                  backgroundColor: colors.color10,
                  ...flexBoxBasic,
                  zIndex: 10,
                  width: size - 80,
                  alignSelf: "center",
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                }}
              >
                <TouchableOpacity activeOpacity={0.5} onPress={onAndOFfCamera}>
                  <Avatar.Icon
                    icon={cameraIcon}
                    size={40}
                    style={{
                      backgroundColor: colors.color10,
                    }}
                    color={colors.color2}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={swapCameraHandler}
                >
                  <Avatar.Icon
                    icon={"camera-flip"}
                    size={40}
                    style={{
                      backgroundColor: colors.color10,
                    }}
                    color={colors.color2}
                  />
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5} onPress={hangUpHandler}>
                  <Avatar.Icon
                    icon={"phone-off"}
                    size={40}
                    style={{
                      backgroundColor: colors.color9,
                    }}
                    color={colors.color2}
                  />
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5} onPress={turnOnOffOtherPersonAudioHandler}>
                  <Avatar.Icon
                    icon={speakerIcon}
                    size={40}
                    style={{
                      backgroundColor: colors.color10,
                    }}
                    color={colors.color2}
                  />
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5} onPress={turnOnOffAudioHandler}>
                  <Avatar.Icon
                    icon={audioIcon}
                    size={40}
                    style={{
                      backgroundColor: colors.color10,
                    }}
                    color={colors.color2}
                  />
                </TouchableOpacity>
              </View>
            )}

            <RTCView
              mirror={false}
              objectFit={"cover"}
              streamURL={remoteMediaStream.toURL()}
              zOrder={1}
              style={{
                flex: 1,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  localMediaStreamStyleAfterGettingRemoteStream: {
    width: 200,
    height: 200,
    position: "absolute",
    top: 10,
    right: 10,
  },

  localMediaStreamStyleBeforeGettingRemoteStream: {
    flex: 1,
  },
});

export default VideoCallComponent;
