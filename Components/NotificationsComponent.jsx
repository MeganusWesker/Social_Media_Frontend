import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { colors } from "../style/style";

const NotificationsComponent = ({
  userName,
  avatar,
  navigation,
  _id,
  notificationMessage,
  createdAt,
  userId,
  navigateTo,
  paramsToSend
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate(navigateTo,{postId:paramsToSend.postId,userId:paramsToSend.userId})}
      activeOpacity={0.9}
    >
      <Avatar.Image
        size={50}
        source={{
          uri: avatar,
        }}
        style={styles.avatar}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{userName}</Text>
        <Text style={styles.message}>{notificationMessage}</Text>
        <Text style={styles.timestamp}>{createdAt()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.color6,
  },
  avatar: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    color: colors.color3,
  },
  message: {
    fontSize: 14,
    marginBottom: 4,
    color: colors.color10,
  },
  timestamp: {
    fontSize: 12,
    color: colors.color8,
  },
});

export default NotificationsComponent;