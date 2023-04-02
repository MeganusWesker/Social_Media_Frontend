import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { Avatar, Button } from "react-native-paper";
import { colors, defaultImg, flexBoxBasic } from "../style/style";
import { getMyAllConversation, toggleMessageInConversation } from "../redux/actions/chatAction";

const size = Dimensions.get("screen").width;

const ChatComponent = ({ user, navigation, _id, lastMessage, newMessages,lastMessageTime,dispatch }) => {
  let filteredUser = user()[0];

  const newMessagesLength = newMessages();

  const navigationPlusDispatcher=async(conversationId)=>{
   await dispatch(toggleMessageInConversation(conversationId));
   await dispatch(getMyAllConversation());

    navigation.navigate("ChatBox", {
      name: filteredUser.name,
      userName: filteredUser.userName,
      userId: filteredUser._id,
      avatar: filteredUser.avatar,
      converSationId: _id,
    });

  }

  return (
    <TouchableOpacity
      onPress={()=>navigationPlusDispatcher(_id)}
      activeOpacity={0.9}
    >
      <View
        style={{
          ...flexBoxBasic,
          justifyContent: "flex-start",
          width: size - 50,
          alignSelf: "center",
          marginVertical: 12,
          backgroundColor: colors.color2,
          padding: 5,
          borderRadius: 10,
          minHeight:60,
        }}
      >
        <Avatar.Image
          size={45}
          source={{
            uri:
              filteredUser.avatar.url !== null
                ? filteredUser.avatar.url
                : defaultImg,
          }}
        />

        <View
          style={{
            marginLeft: 20,
            flexBasis: "50%",

          }}
        >

            <Text
              style={{
                fontWeight: "600",
                textTransform:"uppercase",
                letterSpacing:1,

              }}
            >
              {filteredUser.name}
            </Text>

            <Text
              style={{
                color: colors.color8,
                
              }}
              numberOfLines={2}
            >
              {lastMessage}
            </Text>

      
       
        </View>

        <View style={{
          width:"30%"
        }}>

          <Text
           style={{
            color:colors.color8,
            marginVertical:2,
           
           }}
          >
          {
            lastMessageTime && lastMessageTime()
          }
          </Text>



          {newMessagesLength > 0 && (
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 100,
                backgroundColor: colors.color1,
                alignSelf:"center",
                marginHorizontal:5,
              }}
            >
              <Text
                style={{
                  color: colors.color2,
                  textAlign: "center",
                  textAlignVertical:'center',
                  fontWeight: "200",
                }}
              >
                {newMessagesLength}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatComponent;
