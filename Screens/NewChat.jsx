import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, defaultStyle, flexBoxBasic } from "../style/style";
import { Avatar, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getAllSearchedUsers } from "../redux/actions/userAction";
import ChatBoxComponent from "../Components/ChatBoxComponent";
import { createConversation } from "../redux/actions/chatAction";
import Loader from "../Components/Loader";
import { useMessageAndErrorChat } from "../utils/customHooks";

const size = Dimensions.get("screen").width;

const NewChat = ({ navigation }) => {
  const [keyword, setKeyword] = useState("");
  const [searchBackGroundColor, setSearchBackGroundColor] = useState(
    colors.color5
  );
  const [searchBorderColor, setSearchBorderColor] = useState(colors.color5);
  const [magnifyIconColor, setMagnifyIconColor] = useState(colors.color3);

  const { searchedUsers, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

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

  const createConversationHandler = (user1, user2) => {
    let members = [];

    members.push(user1);
    members.push(user2);

    dispatch(createConversation(members));
  };

  const createConverSationLoading =useMessageAndErrorChat(navigation,dispatch,"Chats",false);

  useEffect(() => {
    // # Debouncing
    if (keyword !== "") {
      const timeOutId = setTimeout(() => {
        dispatch(getAllSearchedUsers(keyword));
      }, 1000);

      return () => {
        clearTimeout(timeOutId);
      };
    }
  }, [dispatch, keyword]);

  return createConverSationLoading ? <Loader/> : (
    <View
      style={{
        ...defaultStyle,
        padding: 0,
      }}
    >
      <LikesHeader navigation={navigation} />

      {/* SearchBar Start */}

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
        }}
      >
        <Avatar.Icon
          icon={"magnify"}
          size={40}
          color={magnifyIconColor}
          style={{
            backgroundColor: searchBackGroundColor,
          }}
        />

        <TextInput
          value={keyword}
          onChangeText={setKeyword}
          placeholder={"Search"}
          style={{
            fontSize: 18,
            width: "80%",
            marginLeft: 5,
          }}
          onFocus={ToggleColor}
          onBlur={ToggleColor}
        />
      </View>

      {/* SearchBar end */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginVertical: 20,
        }}
      >
        {searchedUsers &&
          searchedUsers.map((item) => (
            <ChatBoxComponent
              _id={item._id}
              key={item._id}
              name={item.name}
              userName={item.userName}
              avatar={item.avatar.url}
              createConversationHandler={() =>
                createConversationHandler(item._id, user._id)
              }
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
      width: size - 20,
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
      New message
    </Text>
  </View>
);

export default NewChat;
