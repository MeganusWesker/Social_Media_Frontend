import { View, Text,Image,Dimensions} from "react-native";
import React from "react";
import { colors } from "../style/style";


const size = Dimensions.get("screen").width;

const MessageComponent = ({
  createdAt,
  text,
  ourText,
  isImageMessage,
  image,
  isBackendMessage
}) => {

 
  

 
  return (
    <View
      style={{
        alignSelf: ourText ? "flex-end" : "flex-start",
        padding: 5,
      }}
    >
      <View
        style={{
          backgroundColor: ourText ? colors.color8 : colors.color2,
          borderColor: ourText ? colors.color8 : colors.color5,
          borderWidth: 1,
          borderRadius: 20,
          padding: 6,
        }}
      >
        {isImageMessage ? (
            <Image
           
            source={{ uri:isBackendMessage ? image :'data:image/jpeg;base64,' + image }}
            style={{
               width:200,
               height:200,
               resizeMode:'contain',
               borderRadius:10,
            }}
          />
        ) : (
          <Text
            style={{
              fontWeight: "500",
            }}
          >
            {text}
          </Text>
        )}
      </View>

      <Text
        style={{
          fontSize: 10,
          alignSelf: ourText ? "flex-end" : "flex-start",
        }}
      >
        {createdAt()}
      </Text>
    </View>
  );
};

export default MessageComponent;
