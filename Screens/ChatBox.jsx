import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
import socket from "../utils/socket";
import mime from "mime";
import { dateCalculator } from "../utils/toggleFunctions";
import { RTCIceCandidate, RTCView } from "react-native-webrtc";
import { mediaDevices } from "react-native-webrtc";
import peerConnection from "../utils/webrtcClass";

const size = Dimensions.get("screen").width;

let remoteCandidates = [];

const ChatBox = ({ navigation, route: { params } }) => {
  const [toggleBorderColorName, setToggleBorderColorName] = useState(
    colors.color8
  );
  isBackendMessage;
  const [textMessage, setTextMessage] = useState("");
  const [imageMessage, setImageMessage] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [callUser, setCallUser] = useState(true);
  const [isVisible, setVisible] = useState(false);
  const [isBackendMessage, setIsBackendMessage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [height, setHeight] = useState(0);



  const [isFrontCam, setIsFrontCam] = useState(true);

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

    await dispatch(
      sendMessage(params.converSationId, textMessage, params.userId)
    );

    setTextMessage("");
  };

  // const valueProviderForPopUp = (image, isBackendMessage) => {
  //   setVisible(true);
  //   setImageUrl(image);
  //   setIsBackendMessage(isBackendMessage);
  // };

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

      const myForm = new FormData();
      myForm.append("conversationId", params.converSationId);
      myForm.append("isImageMessage", true);
      myForm.append("recieverId", params.userId);

      myForm.append("file", {
        uri: params.imageUrl,
        type: mime.getType(params.imageUrl),
        name: params.imageUrl.split("/").pop(),
      });

      dispatch(sendImageMessage(myForm));
    }
  }, [params.image, dispatch]);

  return getMyAllConversationLoading ? (
    <Loader />
  ) : (

    <>
    
    {/* {isVisible && (
        <View
          style={{
            position: "absolute",
            zIndex:5,
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            alignSelf: "center",
            alignItems:'center',
            justifyContent:"center",
          }}
        >
                <TouchableOpacity
        onPress={()=>setVisible(false)}
        activeOpacity={0.5}
      >

        <Avatar.Icon
          icon={'close'}
          size={35}
          style={{
            backgroundColor:colors.color3,
            position:'absolute',
            right:-20,
            top:50,
            zIndex:10,
          }}

          color={colors.color3}
        
        />

      </TouchableOpacity>


          <Image
            source={{
              uri: isBackendMessage
                ? imageUrl
                : "data:image/jpeg;base64," + imageUrl,
            }}
            style={{
              width: Dimensions.get("window").width - 50,
              height: Dimensions.get("window").height - 100,
              resizeMode: "contain",
              borderRadius: 10,
            }}
          />
        </View>
      )} */}
      
    <View
      style={{
        ...defaultStyle,
        padding: 0,
      }}
    >
  

      <LikesHeader
        navigation={navigation}
        name={params.name}
        userName={params.userName}
        avatar={params.avatar.url}
        videoCallHandler={() =>
          navigation.navigate("VideoCallComponent", {
            callUser,
            userId: params.userId,
          })
        }
      />

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
              createdAt={() => dateCalculator(item.createdAt)}
              text={item.message}
              key={item._id}
              ourText={item.senderId === user._id}
              isImageMessage={item.isImageMessage}
              image={item.isImageMessage && item.image.url}
              isBackendMessage={item.isBackendMessage}
              // valueProviderForPopUp={() =>
              //   valueProviderForPopUp(
              //     item.isImageMessage && item.image.url,
              //     item.isBackendMessage
              //   )
              // }
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
          height: Math.max(45, height+20),
          marginBottom: 10,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate("Camera", {
              ...params,
              ChatBox: true,
              base: true,
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
          multiline={true}
          onContentSizeChange={(e)=> setHeight(e.nativeEvent.contentSize.height)}
          style={{
            fontSize: 18,
            width: "75%",
            height: Math.max(35, height),
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
              right: -32,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>

    </>
  );
};

const LikesHeader = ({
  navigation,
  name,
  userName,
  avatar,
  videoCallHandler,
  swapCameraHandler,
  hangUpHandler,
}) => (
  <View
    style={{
      ...flexBoxBasic,
      justifyContent: "flex-start",
      width: size - 10,
      zIndex: 10,
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
          color: colors.color8,
        }}
      >
        {userName}
      </Text>
    </View>

    <View
      style={{
        position: "absolute",
        right: 10,
      }}
    >
      <TouchableOpacity onPress={videoCallHandler} activeOpacity={0.9}>
        <Avatar.Icon
          size={40}
          icon={"video"}
          style={{
            backgroundColor: colors.color2,
          }}
        />
      </TouchableOpacity>
    </View>
  </View>
);

export default ChatBox;
