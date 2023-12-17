import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Screens/Home";
import Profile from "./Screens/Profile";
import Search from "./Screens/Search";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import EditProfile from "./Screens/EditProfile";
import ChangePassword from "./Screens/ChangePassword";
import PostLikesScreen from "./Screens/PostLikesScreen";
import AddPost from "./Screens/AddPost";
import ForgotPassword from "./Screens/ForgotPassword";
import CameraComponent from "./Screens/CameraComponent";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/actions/userAction";
import Loader from "./Components/Loader";
import SearchedUserProfile from "./Screens/SearchedUserProfile";
import { getPostsOfFollowing } from "./redux/actions/postAction";
import VerifyEmail from "./Screens/VerifyEmail";
import Chat from "./Screens/Chat";
import ChatBox from "./Screens/ChatBox";
import NewChat from "./Screens/NewChat";
import AddVideoPost from "./Screens/AddVideoPost";
import Notifications from "./Screens/Notifications";
import socket from "./utils/socket";
import CallNotificationComponent from "./Components/CallNotificationComponent";
import VideoCallComponent from "./Screens/VideoCallComponent";
import Post from "./Screens/Post";
import UpdatePost from "./Screens/UpdatePost";
import ResetPassword from "./Screens/ResetPassword";
import Comments from "./Screens/Comments";

const Stack = createNativeStackNavigator();



const Main = () => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  const [incomingCall, setIncomingCall] = useState(false);
  const [recievedOffer, setRecievedOffer] = useState(null);
  const [iceCandidates, setIceCandidates] = useState([]);
  const [userAvatar, setUserAvatar] = useState("");
  const [userName, setUserName] = useState("");
  const [senderId, setSenderId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(getPostsOfFollowing());
  }, [dispatch]);

  useEffect(() => {
    socket.on("getOffer", (data) => {
      setIncomingCall(true);
      setRecievedOffer(data.offerDescription);
      setUserAvatar(data.senderAvatar);
      setUserName(data.senderUserName);
      setSenderId(data.senderId);
    });
  }, []);

  const handleRemoteCandidate=({ iceCandidate })=>{
    setIceCandidates((prev)=>[...prev,iceCandidate]);
  }

  const handleGetNotification=(data)=>{

    console.log(`challa kaya? from ${user.userName}`);

    data.isMessageNotification ?  dispatch({
      type:"showMessageNotificationIcon",
    }) :  dispatch({
      type:"showNotificationIcon",
    })
  }

  useEffect(() => {
    socket.on("sendBackIceCandidate", handleRemoteCandidate);
    socket.on("getNotification", handleGetNotification);
    return () => {
      socket.off("sendBackIceCandidate", handleRemoteCandidate);
      socket.off("getNotification", handleGetNotification);
    };
  }, [handleRemoteCandidate,handleGetNotification]);


  return loading ? (
    <Loader />
  ) : (
    <NavigationContainer>
      {incomingCall && (
        <CallNotificationComponent
          avatar={userAvatar}
          userName={userName}
          recievedOffer={recievedOffer}
          setIncomingCall={setIncomingCall}
          senderId={senderId}
          iceCandidates={iceCandidates}
        />
      )}

      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: "none" }}
        initialRouteName={isAuthenticated ? "Home" : "Login"}
      >
        <Stack.Group>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="Likes" component={PostLikesScreen} />
          <Stack.Screen name="AddPost" component={AddPost} />
          <Stack.Screen name="AddVideoPost" component={AddVideoPost} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Camera" component={CameraComponent} />
          <Stack.Screen
            name="SearchedUserProfile"
            component={SearchedUserProfile}
          />
          <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
          <Stack.Screen name="Chats" component={Chat} />
          <Stack.Screen name="Post" component={Post} />
          <Stack.Screen name="ChatBox" component={ChatBox} />
          <Stack.Screen name="NewChat" component={NewChat} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="VideoCallComponent" component={VideoCallComponent} />
          <Stack.Screen name="UpdatePost" component={UpdatePost} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="Comments" component={Comments} />
        </Stack.Group>
      </Stack.Navigator>

      <Toast position="top" topOffset={20} />
    </NavigationContainer>
  );
};

export default Main;
