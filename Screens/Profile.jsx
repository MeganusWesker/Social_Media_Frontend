import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useRef, forwardRef, useState, useEffect } from "react";
import Footer from "../Components/Footer";
import { colors, defaultImg, defaultStyle, flexBoxBasic } from "../style/style";
import Loader from "../Components/Loader";
import { Avatar, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../redux/actions/userAction";
import { useMessageAndErrorUser } from "../utils/customHooks";
import Toast from "react-native-toast-message";
import { Video } from "expo-av";


const size = Dimensions.get("screen").width;

const Profile = ({ navigation }) => {
  const horiziontalScrollView = useRef();

  const dispatch = useDispatch();

  const { user, loading, error, message, totalLikes } = useSelector(
    (state) => state.user
  );

  const [visible, setVisible] = useState(false);
  const [addPostvisible, setAddPostvisible] = useState(false);
  const videoRef = useRef(null);
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

  const logoutHandler = async () => {
    await dispatch(logOutUser());
    await dispatch({ type: "cleanState" });
    dispatch({ type: "CleanState" });
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const navigator = (navigateTo) => {
    navigation.navigate(navigateTo);
    setAddPostvisible(false);
  };

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: error,
      });

      dispatch({
        type: "clearError",
      });
    }

    if (message) {
      Toast.show({
        type: "success",
        text1: message,
      });

      dispatch({
        type: "clearMessage",
      });
    }
  }, [error, message, dispatch]);

  return loading === undefined || loading === true ? (
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
            onPress={() => navigation.navigate("ChangePassword")}
          >
            Change Password
          </Button>

          <Button
            mode={"delete"}
            textColor={colors.color3}
            icon={"pencil"}
            style={{
              marginVertical: 10,
            }}
          >
            DeleteProfile
          </Button>

          <Button
            mode={"delete"}
            textColor={colors.color3}
            icon={"logout"}
            style={{
              marginVertical: 10,
            }}
            onPress={logoutHandler}
          >
            Logout
          </Button>
        </View>
      )}


{addPostvisible && (
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
              bottom: 10,
              alignSelf: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => setAddPostvisible(false)}
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
              onPress={() => navigator("AddPost")}
            >
              Image Post
            </Button>

            <Button
              mode={"delete"}
              textColor={colors.color3}
              icon={"pencil"}
              style={{
                marginVertical: 10,
              }}
              onPress={() => navigator("AddVideoPost")}
            >
              VideoPost
            </Button>
          </View>
        )}

      <View
        style={{
          ...defaultStyle,
        }}
      >
        <ProfileHeader
          user={user}
          navigation={navigation}
          handler={() => setVisible((prev) => !prev)}
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
              uri: user.avatar.url !== null ? user.avatar.url : defaultImg,
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
            {user.name}
          </Text>

          <Text
            style={{
              fontWeight: "500",
              color: colors.color10,
            }}
          >
            {user.bio}
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
              {user.posts.length}
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
              backgroundColor: colors.color10,
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
              {user.followers.length}
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
              backgroundColor: colors.color10,
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
              {user.following.length}
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
              backgroundColor: colors.color10,
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
              {totalLikes}
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
            icon={"pencil"}
            mode="outlined"
            textColor={colors.color1}
            style={{
              borderColor: colors.color1,
              borderRadius: 12,
            }}
            onPress={() => navigation.navigate("EditProfile", { user })}
          >
            Edit Profile
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
              {user.posts &&
                user.posts.map((item) => (
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
              {user.likedPosts?.map((item) => (
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

      <Footer activeRoute={"profile"} setVisible={setAddPostvisible} />
    </>
  );
};

const ProfileHeader = ({ user, navigation, handler }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
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
      }}
    >
      {user.userName}
    </Text>

    <TouchableOpacity activeOpacity={0.5} onPress={handler}>
      <Avatar.Icon
        icon={"dots-horizontal"}
        size={45}
        style={{
          backgroundColor: colors.color2,
        }}
        color={colors.color3}
      />
    </TouchableOpacity>
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

export default Profile;
