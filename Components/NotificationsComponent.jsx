import { View, Text,Dimensions, TouchableOpacity} from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { colors, flexBoxBasic } from "../style/style";

const size = Dimensions.get("screen").width;

const NotificationsComponent = ({
  userName,
  avatar,
  navigation,
  _id,
  notificationMessage,
  createdAt,
  userId,
}) => {

  console.log(userId);
  return (
    <View
      style={{
        ...flexBoxBasic,
        width: size - 50,
        alignSelf: "center",
        marginVertical: 12,
      }}
    >
      <Avatar.Image
        size={50}
        source={{
          uri: avatar,
        }}
      />

      <View
        style={{
          ...flexBoxBasic,
          justifyContent: "flex-start",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("SearchedUserProfile", {userId})
          }
          activeOpacity={0.9}
        >
          <Text
            style={{
              fontWeight: "800",

            }}
          >
            {userName}
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            color: colors.color8,
            marginLeft:5,
          }}
        >
          {notificationMessage}
        </Text>
      </View>

      <Text
        style={{
          color: colors.color8,
        }}
      >
        {createdAt()}
      </Text>
    </View>
  );
};

export default NotificationsComponent;
