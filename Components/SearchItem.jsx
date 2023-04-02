import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { Avatar, Button } from "react-native-paper";
import { colors, flexBoxBasic } from "../style/style";

const size = Dimensions.get("screen").width;

const SearchItem = ({ name, userName, avatar, navigation, _id }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("SearchedUserProfile", { userId: _id })}
      activeOpacity={0.9}
    >
      <View
        style={{
          ...flexBoxBasic,
          width:size-50,
          alignSelf:"center",
          marginVertical:12,

        }}
      >
        <Avatar.Image
          size={50}
          source={{
            uri: avatar,
          }}
        />

        <View>
          <Text
            style={{
              fontWeight: "600",
            }}
          >
            {userName}
          </Text>

          <Text
            style={{
              color: colors.color7,
            }}
          >
            {name}
          </Text>
        </View>

        <Button
          textColor={colors.color2}
          style={{
            backgroundColor: colors.color1,
            borderRadius: 10,
          }}
          icon={"account-plus-outline"}
        >
          Follow
        </Button>
      </View>
    </TouchableOpacity>
  );
};

export default SearchItem;
