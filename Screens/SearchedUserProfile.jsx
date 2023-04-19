import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import Footer from "../Components/Footer";
import { colors, defaultImg, defaultStyle, flexBoxBasic } from "../style/style";
import Loader from "../Components/Loader";
import { Avatar, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  followUnfollowUser,
  getUserProfile,
  logOutUser,
} from "../redux/actions/userAction";
import {
  useMessageAndErrorUser,
  useMessageAndErrorUserWithoutNavigating,
} from "../utils/customHooks";
import Toast from "react-native-toast-message";
import { getPostsOfFollowing } from "../redux/actions/postAction";
import { Video } from "expo-av";
import socket from "../utils/socket";

const size = Dimensions.get("screen").width;

const SearchedUserProfile = ({ navigation, route }) => {
  const horiziontalScrollView = useRef();
  const videoRef = useRef(null);

  const dispatch = useDispatch();

  const {
    getUserProfileLoading,
    searchedUser,
    searchedUserTotalLikes,
    isFollowed,
    message
  } = useSelector((state) => state.user);

 
  const [visible, setVisible] = useState(false);

  const [gridIcon, setGridIcon] = useState("grid");
  const [bookmarkIcon, setBookmarkIcon] = useState("bookmark-outline");

  const [gridLine, setGridLine] = useState(colors.color1);
  const [bookMarkLine, setBookMarkLine] = useState(colors.color2);

  const horizontalScrollGetter = (e) => {
    if (e.nativeEvent.contentOffset.x >= size / 2) {
      setGridLine(colors.color2);
      setBookMarkLine(colors.color1);
      setBookmarkIcon("bookmark");
      setGridIcon("grid-off");
    }

    if (e.nativeEvent.contentOffset.x <= size / 2 - 20) {
      setGridLine(colors.color1);
      setBookMarkLine(colors.color2);
      setBookmarkIcon("bookmark-outline");
      setGridIcon("grid");
    }
  };

  const moveScrollViewToCollage = () => {
    horiziontalScrollView.current.scrollTo({ x: 0 });
  };

  const moveScrollViewToFavourite = () => {
    horiziontalScrollView.current.scrollTo({ x: size - 50 });
  };


  const followUnfollowHandler = async () => {
    await dispatch(followUnfollowUser(route.params.userId));
    await dispatch(getUserProfile(route.params.userId));
    dispatch(getPostsOfFollowing());
  };

  useMessageAndErrorUserWithoutNavigating(dispatch);

  useEffect(() => {
    dispatch(getUserProfile(route.params.userId));
  }, [dispatch, route.params.userId]);

  useEffect(() => {
    if (message === "Followed successfully") {
      socket.emit("notification", route.params.userId);
    }
  }, [message]);

  return getUserProfileLoading === undefined ||
    getUserProfileLoading === true ? (
    <Loader />
  ) : (
    <>

      <View
        style={{
          ...defaultStyle,
        }}
      >
        <ProfileHeader
          user={searchedUser}
          navigation={navigation}
        />

        <View
          style={{
            alignItems: "center",
            paddingVertical: 15,
          }}
        >
          <Avatar.Image
            size={size / 3}
            source={{
              uri:
                searchedUser.avatar.url !== null
                  ? searchedUser.avatar.url
                  : defaultImg,
            }}
            style={{
              backgroundColor: colors.color1,
            }}
          />

          <Text
            style={{
              fontWeight: "700",
              paddingVertical: 5,
            }}
          >
            {searchedUser.name}
          </Text>

          <Text
            style={{
              fontWeight: "700",
              color: colors.color7,
            }}
          >
            {searchedUser.bio}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 8,
          }}
        >
          <View
            style={{
              padding: 4,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                color: colors.color1,
              }}
            >
              {searchedUser.posts.length}
            </Text>

            <Text
              style={{
                fontWeight: "900",
                color: colors.color3,
              }}
            >
              Posts
            </Text>
          </View>

          <View
            style={{
              backgroundColor: colors.color7,
              height: 30,
              width: 1.5,
            }}
          ></View>

          <View
            style={{
              padding: 4,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                color: colors.color1,
              }}
            >
              {searchedUser.followers.length}
            </Text>

            <Text
              style={{
                fontWeight: "900",
                color: colors.color3,
              }}
            >
              Followers
            </Text>
          </View>

          <View
            style={{
              backgroundColor: colors.color7,
              height: 30,
              width: 1.5,
            }}
          ></View>

          <View
            style={{
              padding: 4,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                color: colors.color1,
              }}
            >
              {searchedUser.following.length}
            </Text>

            <Text
              style={{
                fontWeight: "900",
                color: colors.color3,
              }}
            >
              Following
            </Text>
          </View>

          <View
            style={{
              backgroundColor: colors.color7,
              height: 30,
              width: 1.5,
            }}
          ></View>

          <View
            style={{
              padding: 4,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                color: colors.color1,
              }}
            >
              {searchedUserTotalLikes}
            </Text>

            <Text
              style={{
                fontWeight: "900",
                color: colors.color3,
              }}
            >
              Likes
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            icon={isFollowed ? "account-off-outline" : "account-plus-outline"}
            mode="contained"
            style={{
              backgroundColor: colors.color1,
              borderRadius: 12,
            }}
            onPress={followUnfollowHandler}
          >
            {isFollowed ? "Unfollow" : "follow"}
          </Button>

          <Button
            icon={"message-processing"}
            mode="outlined"
            textColor={colors.color1}
            style={{
              borderColor: colors.color1,
              borderRadius: 12,
            }}
            onPress={()=>navigation.navigate("Chats")}
          >
            Message
          </Button>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              ...flexBoxBasic,
              justifyContent: "space-evenly",
              paddingVertical: 5,
            }}
          >
            <View>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={moveScrollViewToCollage}
              >
                <Avatar.Icon
                  icon={gridIcon}
                  size={45}
                  color={colors.color1}
                  style={{
                    backgroundColor: colors.color2,
                  }}
                />
              </TouchableOpacity>

              <View
                style={{
                  backgroundColor: gridLine,
                  height: 1,
                  marginTop: -5,
                }}
              ></View>
            </View>

            <View>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={moveScrollViewToFavourite}
              >
                <Avatar.Icon
                  icon={bookmarkIcon}
                  size={45}
                  color={colors.color1}
                  style={{
                    backgroundColor: colors.color2,
                  }}
                />
              </TouchableOpacity>

              <View
                style={{
                  backgroundColor: bookMarkLine,
                  height: 1,
                  marginTop: -5,
                }}
              ></View>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={horiziontalScrollView}
            onScroll={horizontalScrollGetter}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                flexWrap: "wrap",
                width: size - 50,
                paddingBottom: 50,
              }}
            >
              {searchedUser.posts &&
                searchedUser.posts.map((item) => (
                  <PhotoCollage
                    id={item._id}
                    key={item._id}
                    video={item.isVideoPost && item.video.url}
                    isVideoPost={item.isVideoPost}
                    image={item.image?.url}
                    navigation={navigation}
                    videoRef={videoRef}
                  />
                ))}
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                flexWrap: "wrap",
                width: size - 50,
                paddingBottom: 50,
              }}
            >
              {searchedUser.likedPosts?.map((item) => (
                <PhotoCollage
                  id={item._id}
                  key={item._id}
                  video={item.isVideoPost && item.video.url}
                  isVideoPost={item.isVideoPost}
                  image={item.image?.url}
                  navigation={navigation}
                  videoRef={videoRef}
                />
              ))}
            </View>


          </ScrollView>
        </ScrollView>
      </View>
    </>
  );
};

const ProfileHeader = ({ user, navigation }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
    }}
  >
    <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.5}>
      <Avatar.Icon
        icon={"chevron-left"}
        size={45}
        style={{
          backgroundColor: colors.color2,
        }}
        color={colors.color3}
      />
    </TouchableOpacity>

    <Text
      style={{
        fontWeight: "800",
        marginLeft:70,
      }}
    >
      {user.userName}
    </Text>


  </View>
);

const PhotoCollage = ({ id, image, navigation,isVideoPost,video,videoRef }) => (
  <TouchableOpacity
    onPress={() => navigation.navigate("Post", { postId: id })}
    activeOpacity={0.5}
  >
    <View
      style={{
        marginVertical: 4,
      }}
    >
        {isVideoPost ? (
          <Video
            source={{
              uri: video,
            }}
            ref={videoRef}
            style={{
              width: 100,
              height: 100,
              borderRadius: 5,
            }}
            resizeMode="contain"
          />
        ) : (
          <Image
          source={{
              uri:image
          }}

          style={{
              resizeMode:'contain',
              height:100,
              width:100,
              borderRadius:5,
          }}
      
      />
        )}



    </View>
  </TouchableOpacity>
);


export default SearchedUserProfile;
