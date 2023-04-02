import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  colors,
  defaultImg,
  defaultStyle,
  flexBoxBasic,
  textInputStyling,
} from "../style/style";
import { Avatar, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMessageOfConverSation,
  sendImageMessage,
  sendMessage,
} from "../redux/actions/chatAction";
import Loader from "../Components/Loader";
import MessageComponent from "../Components/MessageComponent";
import { format } from "timeago.js";
import socket from "../utils/socket";
import mime from "mime";
import { dateCalculator } from "../utils/toggleFunctions";
import { getMediaFromUserAndCreateIceServer } from "../utils/webRtc";
import { RTCSessionDescription,RTCView } from 'react-native-webrtc';

const size = Dimensions.get("screen").width;


const ChatBox = ({ navigation, route: { params } }) => {
  const [toggleBorderColorName, setToggleBorderColorName] = useState(
    colors.color8
  );

  const [textMessage, setTextMessage] = useState("");
  const [incomingCall, setIncomingCall] = useState(false);
  const [recievedOffer, setRecievedOffer] = useState(null);
  const [localMediaStreamObject, setLocalMediaStreamObject] = useState(null);
  const [peerConnectionObj, setPeerConnectionObj] = useState(null);
  const [imageMessage, setImageMessage] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const verticalScrollView = useRef(null);

  const [searchBackGroundColor, setSearchBackGroundColor] = useState(
    colors.color5
  );
  const [searchBorderColor, setSearchBorderColor] = useState(colors.color5);

  const [sendIconColor, setSendIconColor] = useState(colors.color3);

  const { getMyAllConversationLoading, messages, iSMessageDone } = useSelector(
    (state) => state.chat
  );

  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const ToggleColor = () => {
    searchBackGroundColor === colors.color5
      ? setSearchBackGroundColor(colors.color2)
      : setSearchBackGroundColor(colors.color5);
    searchBorderColor === colors.color5
      ? setSearchBorderColor(colors.color1)
      : setSearchBorderColor(colors.color5);
    sendIconColor === colors.color3
      ? setSendIconColor(colors.color1)
      : setSendIconColor(colors.color3);
  };

  const keyPressHandler = ({ nativeEvent: { key: keyValue } }) => {};

  const submitHandler = async () => {
    socket.emit("sendMessage", user._id, params.userId, textMessage);

    await dispatch(sendMessage(params.converSationId, textMessage,params.userId));

    setTextMessage("");
  };

  const createOffer = async() =>{

    const {peerConnection,localMediaStream} = await getMediaFromUserAndCreateIceServer();

    setLocalMediaStreamObject(localMediaStream);
    setPeerConnectionObj(peerConnection);

    console.log(`consolin from createoffer:${peerConnectionObj}`);

    console.log(`console from chatBox:${localMediaStreamObject}`);
  
    let sessionConstraints = {
      mandatory: {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true,
        VoiceActivityDetection: true
      }
    };
  
    try {
      const offerDescription = await peerConnection.createOffer(sessionConstraints);
      await peerConnection.setLocalDescription(offerDescription);

      socket.emit("CallUser", user._id, params.userId, offerDescription);
  
    
    } catch (err) {
      console.log(err)
    }
  }

  const acceptOffer =async()=>{
    try {
      // Use the received offerDescription
      const offerDescription = new RTCSessionDescription(recievedOffer);
      const {peerConnection,localMediaStream} = await getMediaFromUserAndCreateIceServer();
      setLocalMediaStreamObject(localMediaStream);
      await peerConnection.setRemoteDescription( offerDescription );
    
      const answerDescription = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answerDescription);

      socket.emit("sendOfferAnswer", user._id, params.userId,answerDescription );
    
      
    } catch( err ) {
      console.log(err);
    }
  }

  const setRemoteAns=async(offerAns)=>{
    await peerConnectionObj.setRemoteDescription(offerAns);
  }


  useEffect(() => {
    socket.on("getOffer", (data) => {
      setIncomingCall(true);
      setRecievedOffer(data.offerDescription);
    });
  }, []);

  useEffect(() => {
    socket.on("getOfferAnswer", async(data) => {
       await setRemoteAns(data.answerDescription);
       console.log("setRemoteAns log:",data.answerDescription);
    });
  }, []);


  useEffect(() => {
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        message: data.message,
        createdAt: Date.now(),
        _id: 10000 * Math.random(),
      });
    });
  }, []);

  useEffect(() => {
    socket.on("getImageMessage", (data) => {


      setArrivalMessage({
        senderId: data.senderId,
        image: {
          url: data.image,
        },
        isImageMessage: data.isImageMessage,
        createdAt: Date.now(),
        _id: 10000 * Math.random(),
      });
    });
  }, []);

  useEffect(() => {
    if (iSMessageDone) {
      setAllMessages([...messages]);
      verticalScrollView.current.scrollToEnd({ animated: true });
    }
  }, [iSMessageDone, verticalScrollView]);

  useEffect(() => {
    arrivalMessage && setAllMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  // useEffect(() => {
  //   if (arrivalMessage !== null) {
  //     verticalScrollView.current.scrollToEnd({ animated: true });
  //   }
  // }, [arrivalMessage, verticalScrollView]);

  console.log(`consolling localMedia :${localMediaStreamObject?.toURL()}`)

  useEffect(() => {
    dispatch(getAllMessageOfConverSation(params.converSationId));
  }, [dispatch, params.converSationId]);

  useEffect(() => {
    if (params.image) {


      socket.emit(
        "addImageMessage",
        user._id,
        params.userId,
        true,
        params.image
      );

      const myForm=new FormData();
      myForm.append('conversationId',params.converSationId);
      myForm.append('isImageMessage',true);
      myForm.append('recieverId',params.userId);

        myForm.append('file',{
          uri:params.imageUrl,
          type:mime.getType(params.imageUrl),
          name:params.imageUrl.split('/').pop(),
        })

      dispatch(sendImageMessage(myForm));
    }
  }, [params.image,dispatch]);

  return getMyAllConversationLoading ? (
    <Loader />
  ) : (
    <View
      style={{
        ...defaultStyle,
        padding: 0,
      }}
    >

      {
        localMediaStreamObject && (
            <RTCView
            mirror={true}
            objectFit={'cover'}
            streamURL={localMediaStreamObject.toURL()}
            zOrder={10}
            style={{
              width:300,
              height:300,
              position:'absolute',
              top:10,
              right:10,
            }}
        />
        )
      }


 


      <LikesHeader
        navigation={navigation}
        name={params.name}
        userName={params.userName}
        avatar={params.avatar.url}
        videoCallHandler={createOffer}
      />

      {
        incomingCall && (
          <Button
            mode={"text"}
            textColor={colors.color1}
            icon={'pencil'}
            style={{
              marginVertical:10,
            }}
  
          onPress={acceptOffer}
        >
  
          Accept Call
  
        </Button>
        )
      }



      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={verticalScrollView}
        contentContainerStyle={{
          padding: 15,
        }}
      >
        {allMessages.length > 0 ? (
          allMessages.map((item) => (
            <MessageComponent
              createdAt={()=>dateCalculator(item.createdAt)}
              text={item.message}
              key={item._id}
              ourText={item.senderId === user._id}
              isImageMessage={item.isImageMessage}
              image={item.isImageMessage && item.image.url}
              isBackendMessage={item.isBackendMessage}
           
            />
          ))
        ) : (
          <View>
            <Text>Start A ConverSation By Sending hi</Text>
          </View>
        )}
      </ScrollView>

      <View
        style={{
          ...flexBoxBasic,
          justifyContent: "flex-start",
          padding: 10,
          backgroundColor: searchBackGroundColor,
          borderColor: searchBorderColor,
          borderWidth: 1,
          width: size - 30,
          borderRadius: 10,
          alignSelf: "center",
          height: 45,
          marginBottom: 10,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate("Camera", {
              ...params,
              ChatBox: true,
              base:true,
            })
          }
        >
          <Avatar.Icon
            size={40}
            icon={"camera"}
            color={sendIconColor}
            style={{
              backgroundColor: searchBackGroundColor,
            }}
          />
        </TouchableOpacity>

        <TextInput
          value={textMessage}
          onChangeText={setTextMessage}
          placeholder={"send a message"}
          style={{
            fontSize: 18,
            width: "80%",
          }}
          onFocus={ToggleColor}
          onBlur={ToggleColor}
          onKeyPress={keyPressHandler}
        />

        <TouchableOpacity onPress={submitHandler} activeOpacity={0.5}>
          <Avatar.Icon
            size={40}
            icon={"send"}
            color={sendIconColor}
            style={{
              backgroundColor: searchBackGroundColor,
              position: "absolute",
              top: -20,
              right: -20,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const LikesHeader = ({ navigation, name, userName, avatar,videoCallHandler }) => (
  <View
    style={{
      ...flexBoxBasic,
      justifyContent: "flex-start",
      width: size - 10,
      zIndex: 4,
      backgroundColor: colors.color2,
      borderWidth: 2,
      borderColor: colors.color2,
    }}
  >
    <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.5}>
      <Avatar.Icon
        icon={"arrow-left"}
        size={55}
        style={{
          backgroundColor: colors.color2,
        }}
        color={colors.color3}
      />
    </TouchableOpacity>

    <Avatar.Image
      size={50}
      source={{
        uri: avatar !== null ? avatar : defaultImg,
      }}
      style={{
        marginLeft: 10,
        marginRight: 5,
      }}
    />

    <View
      style={{
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontWeight: "600",
          marginHorizontal: 30,
        }}
      >
        {name}
      </Text>

      <Text
        style={{
          color: colors.color7,
        }}
      >
        {userName}
      </Text>
    </View>

    <View>

      <TouchableOpacity
         onPress={videoCallHandler}
         activeOpacity={0.9}
      >

      <Avatar.Icon
            size={40}
            icon={'video'}
        
            style={{
               backgroundColor:colors.color2
            }}
        />
      </TouchableOpacity>


    </View>
  </View>
);

export default ChatBox;
