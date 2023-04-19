import React, {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { Avatar, TextInput } from "react-native-paper";
import { colors, defaultStyle, flexBoxBasic } from "../style/style";
import { useDispatch, useSelector } from "react-redux";
import { getMyAllConversation } from "../redux/actions/chatAction";
import Loader from "../Components/Loader";
import ChatComponent from "../Components/ChatComponent";
import socket from "../utils/socket";
import { dateCalculator } from "../utils/toggleFunctions";

const size = Dimensions.get("screen").width;

const Chat = ({ navigation }) => {
  const [searchBackGroundColor, setSearchBackGroundColor] = useState(
    colors.color5
  );
  const [searchBorderColor, setSearchBorderColor] = useState(colors.color5);
  const [magnifyIconColor, setMagnifyIconColor] = useState(colors.color3);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { getMyAllConversationLoading, conversations } = useSelector(
    (state) => state.chat
  );

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

  const currentUserChatingWithWhomFinder = (members) => {
    let filteredUser = members.filter((item) => item._id !== user._id);
    return filteredUser;
  };

  const findNewMessagesLength = (conversationMessages) => {
    let newMessages = conversationMessages.filter(
      (item) => item.isNewMessage === true
    );
    return newMessages.length;
  };

  useEffect(() => {
    dispatch(getMyAllConversation());
  }, [dispatch]);

  return getMyAllConversationLoading ? (
    <Loader />
  ) : (
    <View
      style={{
        ...defaultStyle,
        padding: 0,
        backgroundColor: colors.color5,
      }}
    >
      <LikesHeader navigation={navigation} user={user} />

      <View
        style={{
          marginVertical: 20,
        }}
      >
        <Text
          style={{
            fontWeight: "700",
            color: colors.color3,
            fontSize: 18,
            textAlign: "center",
          }}
        >
          Messages
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {conversations.length > 0 ? (
            conversations.map((item) => (
              <ChatComponent
                user={() => currentUserChatingWithWhomFinder(item.members)}
                navigation={navigation}
                key={item._id}
                _id={item._id}
                lastMessage={
                  item.messages.length > 0
                    ? item.messages[item.messages.length - 1].isImageMessage
                      ? "Sent You a Image"
                      : item.messages[item.messages.length - 1].message
                    : "Send Hi"
                }
                lastMessageTime={
                  item.messages.length > 0
                    ? () =>
                        dateCalculator(
                          item.messages[item.messages.length - 1].createdAt
                        )
                    : undefined
                }
                newMessages={() => findNewMessagesLength(item.messages)}
                dispatch={dispatch}
              />
            ))
          ) : (
            <View>
              <Text>
                Start A ConverSation By Clicking on Plus button in top right
                Corner
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const LikesHeader = ({ navigation, user }) => (
  <View
    style={{
      ...flexBoxBasic,
      width: size - 20,
    }}
  >
    <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.5}>
      <Avatar.Icon
        icon={"arrow-left"}
        size={55}
        style={{
          backgroundColor: colors.color5,
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
      {user && user.userName}
    </Text>

    <TouchableOpacity
      onPress={() => navigation.navigate("NewChat")}
      activeOpacity={0.5}
    >
      <Avatar.Icon
        icon={"plus"}
        size={55}
        style={{
          backgroundColor: colors.color5,
        }}
        color={colors.color8}
      />
    </TouchableOpacity>
  </View>
);

export default Chat;
