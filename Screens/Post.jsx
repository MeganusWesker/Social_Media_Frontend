import { View, Text, Dimensions, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  getSinglePost,
  likeAndUnlikePost,
  saveOrUnSavePost,
} from "../redux/actions/postAction";
import Loader from "../Components/Loader";
import { Avatar, Button } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { colors, defaultImg, defaultStyle, flexBoxBasic } from "../style/style";
import { Video } from "expo-av";

const size = Dimensions.get("screen").width;

const Post = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const { getSinglePostLoading, post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);

  const likeUnlikePostHandler = async () => {
    await dispatch(likeAndUnlikePost(route.params.postId));
    dispatch(getSinglePost(route.params.postId));
  };

  const saveUnSavePostHandler = async () => {
    await dispatch(saveOrUnSavePost(route.params.postId));
    dispatch(getSinglePost(route.params.postId));
  };

  const deletePostHandler = async () => {
    await dispatch(deletePost(route.params.postId));
    navigation.navigate("Profile");
  };

  const isSavedChecker = () => {
    let isLiked = false;

    post.postSavedBy.forEach((item) => {
      if (item === user._id) {
        isLiked = true;
      }
    });

    return isLiked;
  };

  const isLikedChecker = () => {
    let isLiked = false;

    post.likes.forEach((item) => {
      if (item._id === user._id) {
        isLiked = true;
      }
    });

    return isLiked;
  };

  useEffect(() => {
    dispatch(getSinglePost(route.params.postId));
  }, [dispatch]);

  return getSinglePostLoading === undefined || getSinglePostLoading ? (
    <Loader />
  ) : (
    <>
      {visible && (
        <View
          style={{
            backgroundColor: colors.color2,
            elevation: 5,
            borderRadius: 10,
            padding: 20,
            height: 200,
            width: 200,
            zIndex: 5,
            position: "absolute",
            top: 80,
            right: 40,
          }}
        >
          <TouchableOpacity
            onPress={() => setVisible(false)}
            activeOpacity={0.5}
          >
            <Avatar.Icon
              icon={"close"}
              size={35}
              style={{
                backgroundColor: colors.color2,
                position: "absolute",
                right: -20,
                top: -20,
              }}
              color={colors.color3}
            />
          </TouchableOpacity>

          <Button
            mode={"text"}
            textColor={colors.color1}
            icon={"pencil"}
            style={{
              marginVertical: 10,
            }}
            onPress={() => navigation.navigate("UpdatePost")}
          >
            Update Post
          </Button>

          <Button
            mode={"delete"}
            textColor={colors.color3}
            icon={"pencil"}
            style={{
              marginVertical: 10,
            }}
            onPress={deletePostHandler}
          >
            Delete Post
          </Button>
        </View>
      )}

      <View
        style={{
          ...defaultStyle,
          padding: 0,
        }}
      >
        <LikesHeader
          avatar={post.owner.avatar.url}
          name={post.owner.name}
          userName={post.owner.userName}
          navigation={navigation}
          ourPost={user._id === post.owner._id}
          setVisible={setVisible}
        />

        <View
          style={{
            paddingVertical: 10,
            alignItems: "center",
          }}
        >
          {post.isVideoPost ? (
            <Video
              source={{
                uri: post.video.url,
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
                uri: post.image.url,
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

        <View
          style={{
            ...flexBoxBasic,
            paddingHorizontal: 10,
          }}
        >
          <View style={flexBoxBasic}>
            <View style={flexBoxBasic}>
              <TouchableOpacity
                onPress={likeUnlikePostHandler}
                activeOpacity={0.5}
              >
                <Avatar.Icon
                  icon={isLikedChecker() ? "heart" : "heart-outline"}
                  size={40}
                  color={isLikedChecker() ? colors.color9 : colors.color3}
                  style={{
                    backgroundColor: colors.color2,
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() =>
                  navigation.navigate("Likes", {
                    likes: post.likes,
                    postId: post._id,
                  })
                }
              >
                <Text>{post.likes.length}</Text>
              </TouchableOpacity>
            </View>

            <View style={flexBoxBasic}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() =>
                  navigation.navigate("Comments", {
                    comments:post.comments,
                    postId:post._id,
                    avatar:post.owner.avatar.url,
                    userName:post.owner.userName,
                    caption:post.caption,
                    postOwner:post.owner._id,
                  })
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
                <Text>{post.comments.length}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity activeOpacity={0.5} onPress={saveUnSavePostHandler}>
            <Avatar.Icon
              icon={isSavedChecker() ? "bookmark" : "bookmark-outline"}
              size={40}
              style={{
                backgroundColor: colors.color2,
              }}
              color={colors.color3}
            />
          </TouchableOpacity>
        </View>

        <View>
          <Text
            style={{
              fontWeight: "300",
              color: colors.color8,
              paddingHorizontal: 10,
            }}
          >
            {post.caption}
          </Text>
        </View>
      </View>
    </>
  );
};

const LikesHeader = ({
  navigation,
  name,
  userName,
  avatar,
  ourPost,
  setVisible,
}) => (
  <View
    style={{
      ...flexBoxBasic,
      justifyContent: "flex-start",
      width: size - 10,
      zIndex: 10,
      backgroundColor: colors.color2,
      borderWidth: 2,
      borderColor: colors.color2,
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

    <Avatar.Image
      size={50}
      source={{
        uri: avatar !== null ? avatar : defaultImg,
      }}
      style={{
        marginLeft: 10,
        marginRight: 5,
      }}
    />

    <View
      style={{
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontWeight: "600",
          marginHorizontal: 30,
        }}
      >
        {name}
      </Text>

      <Text
        style={{
          color: colors.color8,
        }}
      >
        {userName}
      </Text>
    </View>

    {ourPost && (
      <View
        style={{
          position: "absolute",
          right: 10,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setVisible((prev) => !prev)}
        >
          <Avatar.Icon
            size={40}
            icon={"dots-horizontal"}
            style={{
              backgroundColor: colors.color2,
            }}
          />
        </TouchableOpacity>
      </View>
    )}
  </View>
);

export default Post;
