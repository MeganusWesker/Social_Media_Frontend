import { View, Text } from "react-native";
import React from "react";
import { Avatar, Button } from "react-native-paper";
import { colors, defaultImg, flexBoxBasic } from "../style/style";
import { useNavigation } from "@react-navigation/native";
import socket from "../utils/socket";

const CallNotificationComponent = ({
  avatar,
  userName,
  setIncomingCall,
  recievedOffer,
  senderId,
  iceCandidates=[],
}) => {

    const navigation=useNavigation();

    const callAcceptHandler=()=>{
        setIncomingCall(false);
        navigation.navigate("VideoCallComponent",{
            recievedOffer,
            userId:senderId,
            iceCandidates
        });
    }

    const callDeclineHandler=()=>{
        setIncomingCall(false);
        socket.emit("callDecline",senderId);
    }

  return (
    <View
      style={{
        padding: 20,
        elevation:1,
        backgroundColor:colors.color2,
        borderRadius:10,
        position:"absolute",
        top:10,
        alignSelf:"center",
        minWidth:300,
        zIndex:10,
      }}
    >

        <View 
         style={{
            ...flexBoxBasic,
            justifyContent:'flex-start'
         }}
        >

   
      <Avatar.Image
        source={{
          uri: avatar !== null ? avatar : defaultImg,
        }}
        size={50}
      />

      <View
      
       style={{
        marginLeft:10,
       }}
      >
        <Text>
            {userName}
        </Text>

        <Text>
            Calling....
        </Text>

      </View>
      </View>

      <View
      
       style={{
        ...flexBoxBasic,
         marginTop:10,
       }}
      
      >
        <Button
          icon={"video"}
          onPress={callAcceptHandler}
          mode="contained"
          style={{
            borderRadius:10,
          }}
        >
            Accept
        </Button>

        <Button
          icon={"video-off"}
          textColor={colors.color9}
          onPress={callDeclineHandler}
        >
            Decline
        </Button>
      </View>
    </View>
  );
};

export default CallNotificationComponent;
