import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { colors, defaultStyle, flexBoxBasic } from "../style/style";
import { Avatar } from "react-native-paper";
import SearchItem from "../Components/SearchItem";

const size = Dimensions.get("screen").width;

const PostLikesScreen = ({
  navigation,
  route: {
    params: { likes },
  },
}) => {
  const [keyword, setKeyword] = useState("");

  const [searchBackGroundColor, setSearchBackGroundColor] = useState(
    colors.color5
  );
  const [searchBorderColor, setSearchBorderColor] = useState(colors.color5);
  const [magnifyIconColor, setMagnifyIconColor] = useState(colors.color3);

  const ToggleColor = () => {
    searchBackGroundColor === colors.color5
      ? setSearchBackGroundColor(colors.color2)
      : setSearchBackGroundColor(colors.color5);
    searchBorderColor === colors.color5
      ? setSearchBorderColor(colors.color1)
      : setSearchBorderColor(colors.color5);
    magnifyIconColor === colors.color3
      ? setMagnifyIconColor(colors.color1)
      : setMagnifyIconColor(colors.color3);
  };

  return (
    <View
      style={{
        ...defaultStyle,
        padding: 0,
      }}
    >
      <LikesHeader navigation={navigation} />



      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginVertical:20,
          
        }}
      >

        {likes &&
          likes.map((item) => (
            <SearchItem
              avatar={item.avatar?.url}
              navigation={navigation}
              name={item.name}
              userName={item.userName}
              _id={item._id}
              key={item._id}
            />
          ))}

      </ScrollView>
    </View>
  );
};

const LikesHeader = ({ navigation }) => (
  <View
    style={{
      ...flexBoxBasic,
      justifyContent: "flex-start",
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

    <Text
      style={{
        fontWeight: "800",
        fontSize: 20,
        marginLeft: 20,
      }}
    >
      Likes
    </Text>
  </View>
);

export default PostLikesScreen;
