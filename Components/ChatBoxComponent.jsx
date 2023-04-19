import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  BackHandler,
} from "react-native";
import React, { useState } from "react";
import { Avatar, Button } from "react-native-paper";
import { colors, defaultImg, flexBoxBasic } from "../style/style";

const size = Dimensions.get("screen").width;

const ChatBoxComponent = ({
  name,
  userName,
  avatar,
  _id,
  createConversationHandler
}) => {
  return (
    <View
      style={{
        ...flexBoxBasic,
        width: size - 50,
        alignSelf: "center",
        marginVertical: 12,
      }}
    >
      <View
        style={{
          ...flexBoxBasic,
          justifyContent: "flex-start",
          width: 180,
        }}
      >
        <Avatar.Image
          size={50}
          source={{
            uri: avatar !== null ? avatar : defaultImg,
          }}
        />

        <View
          style={{
            marginLeft: 15,
          }}
        >
          <Text
            style={{
              fontWeight: "600",
            }}
          >
            {name}
          </Text>

          <Text
            style={{
              color: colors.color10,
            }}
          >
            {userName}
          </Text>
        </View>
      </View>

      <Button
        mode={"text"}
        textColor={colors.color1}
        icon={"message"}
        style={{
          marginVertical: 10,
          position: "absolute",
          right: -10,
        }}
        onPress={createConversationHandler}
      >
        Chat
      </Button>
    </View>
  );
};

export default ChatBoxComponent;
