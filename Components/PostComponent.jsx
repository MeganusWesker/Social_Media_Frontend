import { View, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Avatar } from "react-native-paper";
import { colors, defaultImg, flexBoxBasic } from "../style/style";
import { Video, AVPlaybackStatus } from "expo-av";

const size = Dimensions.get("screen").width;

const PostComponent = ({
  navigation,
  avatar,
  userName,
  createdAt,
  image,
  caption,
  likes,
  comments,
  _id,
  likeHandler,
  isLiked,
  isVideoPost,
  video,
  saveHandler,
  isSaved,
  postOwner
}) => {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});

  return (
    <View
      style={{
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        marginVertical: 10,
        backgroundColor: colors.color2,
      }}
    >
      <View
        style={{
          ...flexBoxBasic,
        }}
      >
        <View
          style={{
            ...flexBoxBasic,
            width: 150,
          }}
        >
          <Avatar.Image
            source={{
              uri: avatar ? avatar : defaultImg,
            }}
            size={size / 8}
          />

          <View>
            <Text
              style={{
                fontWeight: "700",
              }}
            >
              {userName}
            </Text>

            <Text
              style={{
                fontWeight: "400",
                color: colors.color8,
              }}
            >
              {createdAt()}
            </Text>
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.5}>
          <Avatar.Icon
            icon={"dots-horizontal"}
            size={35}
            color={colors.color3}
            style={{
              backgroundColor: colors.color2,
            }}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          paddingVertical: 10,
          alignItems: "center",
        }}
      >
        {isVideoPost ? (
          <Video
            source={{
              uri: video,
            }}
            ref={videoRef}
            style={{
              width: 280,
              height: 280,
              borderRadius: 10,
            }}
            useNativeControls
            resizeMode="contain"
          />
        ) : (
          <Image
            source={{
              uri: image,
            }}
            style={{
              width: 280,
              height: 280,
              borderRadius: 10,
              resizeMode: "contain",
            }}
          />
        )}
      </View>

      <View>
        <Text
          style={{
            fontWeight: "300",
            color: colors.color8,
          }}
        >
          {caption}
        </Text>
      </View>

      <View style={flexBoxBasic}>
        <View style={flexBoxBasic}>
          <View style={flexBoxBasic}>
            <TouchableOpacity onPress={likeHandler} activeOpacity={0.5}>
              <Avatar.Icon
                icon={isLiked() ? "heart" : "heart-outline"}
                size={40}
                color={isLiked() ? colors.color9 : colors.color3}
                style={{
                  backgroundColor: colors.color2,
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate("Likes", { likes, postId: _id })
              }
            >
              <Text>{likes.length}</Text>
            </TouchableOpacity>
          </View>

          <View style={flexBoxBasic}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate("Comments", { comments, postId: _id,avatar,userName,caption, postOwner})
              }
            >
              <Avatar.Icon
                icon={"message-outline"}
                size={40}
                color={colors.color3}
                style={{
                  backgroundColor: colors.color2,
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.5}>
              <Text>{comments.length}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.5} onPress={saveHandler}>
          <Avatar.Icon
            icon={isSaved() ? "bookmark" : "bookmark-outline"}
            size={40}
            style={{
              backgroundColor: colors.color2,
            }}
            color={colors.color3}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostComponent;
