import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { colors, defaultStyle } from "../style/style";
import Footer from "../Components/Footer";
import { Avatar, Button } from "react-native-paper";
import PostComponent from "../Components/PostComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  getPostsOfFollowing,
  likeAndUnlikePost,
  saveOrUnSavePost,
  toggleNotification,
} from "../redux/actions/postAction";
import { useMessageAndErrorPostWithoutNavigating } from "../utils/customHooks";
import { dateCalculator } from "../utils/toggleFunctions";
import Loader from "../Components/Loader";
import socket from "../utils/socket";
import { getNewMessageIndication } from "../redux/actions/chatAction";

const Home = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [postOwner, setPostOwner] = useState("");

  const { posts } = useSelector((state) => state.post);

  const { user, notification,messageNotification } = useSelector((state) => state.user);

  const { newMessage, newMessageToggled } = useSelector((state) => state.chat);
  const { error, message } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  useMessageAndErrorPostWithoutNavigating(dispatch);

  const likeUnlikePostHandler = async (id, postOwner) => {
    await dispatch(likeAndUnlikePost(id));
    setPostOwner(postOwner);
    dispatch(getPostsOfFollowing());
  };
  const isNewNotifications=()=>{
    const filteredArray=user.notifications.filter((item) =>item.isNewMessage ===true);
   
    if(filteredArray.length >0){
      dispatch({
        type:"showNotificationIcon",
      })
    }
  }


  const saveUnSavePostHandler = async (id) => {
    await dispatch(saveOrUnSavePost(id));
    dispatch(getPostsOfFollowing());
  };

  const isSavedChecker = (post) => {
    let isLiked = false;

    post.postSavedBy.forEach((item) => {
      if (item === user._id) {
        isLiked = true;
      }
    });

    return isLiked;
  };

  const isLikedChecker = (post) => {
    let isLiked = false;

    post.likes.forEach((item) => {
      if (item._id === user._id) {
        isLiked = true;
      }
    });

    return isLiked;
  };

  const navigator = (navigateTo) => {
    navigation.navigate(navigateTo);
    setVisible(false);
  };

  const navigatorDispatcher = (navigateTo, newMessageFromElements) => {
    navigation.navigate(navigateTo);
    newMessageFromElements ? dispatch(getNewMessageIndication()) : dispatch(toggleNotification());
    newMessageFromElements? dispatch({
      type:"hideMessageNotificationIcon"
    }) : dispatch({
      type:"hideNotificationIcon"
    })
  };

  useEffect(() => {
    socket.emit("addUser", user._id);
  }, [user]);



  useEffect(() => {
    if (user.newMessage) {
      dispatch({
        type:"showMessageNotificationIcon"
      })
    }
  }, [user.newMessage]);

  useEffect(() => {
    if (message === "post like succesfully") {
      socket.emit("notification", postOwner);
    }
  }, [message]);

  useEffect(()=>{


    isNewNotifications();

  },[user.notifications])



  return (
    <>
      <View style={defaultStyle}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            {/* Header TagLIne */}
            <Text
              style={{
                fontWeight: "900",
                fontSize: 18,
              }}
            >
              MemeKaAdda
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: 80,
            }}
          >
            <TouchableOpacity
              onPress={() => navigatorDispatcher("Notifications")}
              activeOpacity={0.5}
            >
              { notification &&  (
                <View
                  style={{
                    backgroundColor: colors.color9,
                    height: 7,
                    width: 7,
                    borderRadius: 100,
                    position: "absolute",
                    right: 8,
                    zIndex: 5,
                    top: 6,
                  }}
                ></View>
              )}

              <Avatar.Icon
                icon={"bell-outline"}
                size={35}
                color={colors.color3}
                style={{ backgroundColor: colors.color2 }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigatorDispatcher("Chats",messageNotification)}
              activeOpacity={0.5}
            >
              {messageNotification && (
                <View
                  style={{
                    backgroundColor: colors.color9,
                    height: 7,
                    width: 7,
                    borderRadius: 100,
                    position: "absolute",
                    right: 8,
                    zIndex: 5,
                    top: 6,
                  }}
                ></View>
              )}

              <Avatar.Icon
                icon={"message-outline"}
                size={35}
                color={colors.color3}
                style={{ backgroundColor: colors.color2 }}
              />
            </TouchableOpacity>
          </View>
        </View>

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
              bottom: 10,
              alignSelf: "center",
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

        {/* Post */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            backgroundColor: colors.color2,
            paddingBottom: 30,
          }}
        >
          <View>
            {posts &&
              posts.map((item, i) => (
                <PostComponent
                  isVideoPost={item.isVideoPost}
                  video={item.video?.url}
                  image={item.image?.url}
                  createdAt={() => dateCalculator(item.createdAt)}
                  userName={item.owner.userName}
                  avatar={item.owner.avatar?.url}
                  _id={item._id}
                  key={item._id}
                  caption={item.caption}
                  likes={item.likes}
                  comments={item.comments}
                  navigation={navigation}
                  likeHandler={() =>
                    likeUnlikePostHandler(item._id, item.owner._id)
                  }
                  isLiked={() => isLikedChecker(item)}
                  saveHandler={() => saveUnSavePostHandler(item._id)}
                  isSaved={() => isSavedChecker(item)}
                  postOwner={item.owner._id}
                />
              ))}
          </View>
        </ScrollView>
      </View>

      <Footer activeRoute="home" setVisible={setVisible} />
    </>
  );
};

export default Home;
