import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, defaultImg, defaultStyle, flexBoxBasic } from "../style/style";
import { Avatar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getMyAllNotifications } from "../redux/actions/userAction";
import Loader from "../Components/Loader";
import NotificationsComponent from "../Components/NotificationsComponent";
import { dateCalculator } from "../utils/toggleFunctions";

const size = Dimensions.get("screen").width;

const Notifications = ({ navigation }) => {
  const dispatch = useDispatch();

  const {myNotifications,getMyAllNotificationsLoading} =useSelector((state)=>state.user);

  useEffect(() => {
    dispatch(getMyAllNotifications());
  }, [dispatch]);

  return getMyAllNotificationsLoading ? <Loader/> :(
    <View
      style={{
        ...defaultStyle,
        padding: 0,
      }}
    >
      <LikesHeader navigation={navigation} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginVertical: 20,
        }}
      >
        {myNotifications &&
            myNotifications.map((item) => (
              <NotificationsComponent
                avatar={item.user.avatar !==null ? item.user.avatar :defaultImg}
                navigation={navigation}
                userName={item.user.userName}
                _id={item._id}
                key={item._id}
                userId={item.user._id}
                notificationMessage={item.notificationMessage}
                createdAt={()=>dateCalculator(item.createdAt)}
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
      Notifications
    </Text>
  </View>
);

export default Notifications;
