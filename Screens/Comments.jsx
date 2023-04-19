import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, defaultImg, defaultStyle, flexBoxBasic } from "../style/style";
import { Avatar } from "react-native-paper";
import CommentComponent from "../Components/CommentComponent";
import { useDispatch, useSelector } from "react-redux";
import { isLikedChecker } from "../utils/toggleFunctions";
import {
  commentOnPost,
  deleteComment,
  deleteReply,
  editComment,
  editReply,
  getPostsOfFollowing,
  getSinglePost,
  likeComment,
  likeReply,
  replyToComment,
  sendReplyToReply,
} from "../redux/actions/postAction";
import { useMessageAndErrorPostWithoutNavigating } from "../utils/customHooks";
import socket from "../utils/socket";

const size = Dimensions.get("screen").width;

const Comments = ({ route: { params }, navigation }) => {
  const [height, setHeight] = useState(0);
  const [comment, setComment] = useState("");
  const [isUserReplying, setIsUserReplying] = useState(false);
  const [isUserEditingComment, setIsUserEditingComment] = useState(false);
  const [isUserEditingReply, setIsUserEditingReply] = useState(false);
  const [userReplyingTo, setuserReplyingTo] = useState("");
  const [commentIdOfUserReplying, setcommentIdOfUserReplying] = useState("");
  const [replyIdOfUserReplying, setReplyIdOfUserReplying] = useState("");

  const [idOfUserToSendSocketMessage, setIdOfUserToSendSocketMessage] = useState("");

  const [comments, setComments] = useState([]);

  const [searchBackGroundColor, setSearchBackGroundColor] = useState(
    colors.color5
  );
  const [searchBorderColor, setSearchBorderColor] = useState(colors.color5);

  const [sendIconColor, setSendIconColor] = useState(colors.color3);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const { post, getPostDone,commentOnPostLoading,isLiked } = useSelector((state) => state.post);


  const ToggleColor = () => {
    searchBackGroundColor === colors.color5
      ? setSearchBackGroundColor(colors.color2)
      : setSearchBackGroundColor(colors.color5);
    searchBorderColor === colors.color5
      ? setSearchBorderColor(colors.color1)
      : setSearchBorderColor(colors.color5);
    sendIconColor === colors.color3
      ? setSendIconColor(colors.color1)
      : setSendIconColor(colors.color3);
  };

  const replyingToInfoHandler = (userInfo, commentId,userId) => {
    setIsUserReplying(true);
    setcommentIdOfUserReplying(commentId);
    setuserReplyingTo(userInfo);
    setIdOfUserToSendSocketMessage(userId);
  };

  const editingCommentInfoHandler = (commentId) => {
    setIsUserReplying(true);
    setIsUserEditingComment(true)
    setcommentIdOfUserReplying(commentId);
  };

  const editingReplyInfoHandler = (commentId,replyId) => {
    setIsUserReplying(true);
    setIsUserEditingReply(true);
    setcommentIdOfUserReplying(commentId);
    setReplyIdOfUserReplying(replyId);
  };

  const closeEditingReplyInfoHandler = () => {
    setIsUserReplying(false);
    setIsUserEditingReply(false);
    setcommentIdOfUserReplying("");
    setReplyIdOfUserReplying("");
  };

  const closeEditingCommentInfoHandler = () => {
    setIsUserReplying(false);
    setIsUserEditingComment(false);
    setcommentIdOfUserReplying("");
  };

  const replyingToReplyInfoHandler = (userInfo, commentId, replyId,userId) => {
    setIsUserReplying(true);
    setcommentIdOfUserReplying(commentId);
    setuserReplyingTo(userInfo);
    setReplyIdOfUserReplying(replyId);
    setIdOfUserToSendSocketMessage(userId);
  };

  const closingReplyingToInfoHandler = () => {
    setIsUserReplying(false);
    setcommentIdOfUserReplying("");
    setuserReplyingTo("");
    setIdOfUserToSendSocketMessage("");
  };

  const closingReplyingToReplyInfoHandler = () => {
    setIsUserReplying(false);
    setcommentIdOfUserReplying("");
    setuserReplyingTo("");
    setReplyIdOfUserReplying("");
    setIdOfUserToSendSocketMessage("");
  };


  const closingAllInfos=()=>{
    setIsUserReplying(false);
    setIsUserEditingComment(false);
    setIsUserEditingReply(false);
    setcommentIdOfUserReplying("");
    setuserReplyingTo("");
    setReplyIdOfUserReplying("");
    setIdOfUserToSendSocketMessage("");
  }

  const handleGoBack=()=>{
    navigation.goBack();
    dispatch(getPostsOfFollowing())
  }

  const submitHandler = async () => {
    const commenttemp = comment;
    setComment("");

    if(isUserReplying && isUserEditingReply){

      await dispatch(editReply(params.postId,commentIdOfUserReplying,replyIdOfUserReplying,commenttemp));
      closeEditingReplyInfoHandler();

    } else if(isUserReplying && isUserEditingComment ){

      await dispatch(editComment(params.postId,commentIdOfUserReplying,commenttemp));
      closeEditingCommentInfoHandler();

    } else if (isUserReplying && replyIdOfUserReplying !== "") {
      await dispatch(
        sendReplyToReply(
          params.postId,
          commentIdOfUserReplying,
          replyIdOfUserReplying,
          commenttemp
        )
      );

      console.log("tuh chal rha hai kya?",idOfUserToSendSocketMessage ,user._id);

      if(idOfUserToSendSocketMessage !==user._id){
        socket.emit("notification",idOfUserToSendSocketMessage);
      }

      closingReplyingToReplyInfoHandler();
    } else if (isUserReplying) {
      await dispatch(
        replyToComment(params.postId, commentIdOfUserReplying, commenttemp)
      );

      console.log("esfunction se ah rha hun :",idOfUserToSendSocketMessage , user._id)

      if(idOfUserToSendSocketMessage !==user._id){
        socket.emit("notification",idOfUserToSendSocketMessage);
      }

       closingReplyingToInfoHandler(); 

    } else {
      await dispatch(commentOnPost(params.postId, commenttemp));
      if(params.postOwner !==user._id){
        socket.emit("notification",params.postOwner);
      }
   
    }

     dispatch(getSinglePost(params.postId));
  };

  const likeCommentHandler = async (commentId,userId) => {
    console.log(`like Handler se ah rha hun vro:${userId}`);
    await dispatch(likeComment(params.postId, commentId));
     socket.emit("notification",userId);
     dispatch(getSinglePost(params.postId));
  };

  const likeReplyHandler = async (commentId, replyId,userId) => {
    await dispatch(likeReply(params.postId, commentId, replyId));
     socket.emit("notification",userId);
    dispatch(getSinglePost(params.postId));
  };

  const deleteCommentHandler = async (commentId) => {
    await dispatch(deleteComment(params.postId, commentId));
    dispatch(getSinglePost(params.postId));
  };

  const deleteReplyHandler = async (commentId, replyId) => {
    await dispatch(deleteReply(params.postId, commentId, replyId));
    dispatch(getSinglePost(params.postId));
  };

  useMessageAndErrorPostWithoutNavigating(dispatch);
  

  useEffect(() => {
    if (getPostDone) {
      setComments([...post.comments]);
    }
  }, [getPostDone]);

  
  useEffect(() => {
    if (params.comments) {
      setComments([...params.comments]);
    }
  }, [params.comments]);





 
  return (
    <View
      style={{
        ...defaultStyle,
        padding: 0,
      }}
    >
      <LikesHeader navigation={navigation} handler={handleGoBack}/>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
      >
        {/* owners post caption and their id here  */}
        <View
          style={{
            ...flexBoxBasic,
            justifyContent: "flex-start",
            padding: 15,
            borderBottomWidth: 1,
            borderColor: colors.color5,
          }}
        >
          <Avatar.Image
            size={35}
            source={{
              uri: params.avatar !== null ? params.avatar : defaultImg,
            }}
          />

          <View
            style={{
              marginLeft: 10,
            }}
          >
            <Text
              style={{
                fontWeight: "800",
              }}
            >
              {`${params.userName}`}
            </Text>

            <Text
              style={{
                marginTop: 2,
                fontWeight: "500",
                color: colors.color8,
              }}
            >
              {`${params.caption}`}
            </Text>
          </View>
        </View>

        {/* owners post caption and their id here ends  */}

        {comments.length > 0 ? (
          comments.map((item) => (
            <CommentComponent
              key={item._id}
              id={item._id}
              user={item.user}
              likes={item.likes}
              replies={item.replies}
              commentMessage={item.comment}
              isLiked={() => isLikedChecker(item, user._id)}
              loggedInUser={user}
              likeCommentHandler={() => likeCommentHandler(item._id,item.user._id)}
              deleteCommentHandler={() => deleteCommentHandler(item._id)}
              postOwner={params.postOwner === user._id}
              commentOwner={item.user._id === user._id}
              replyingToInfoHandler={() =>
                replyingToInfoHandler(item.user.userName, item._id,item.user._id)
              }
              replyingToReplyInfoHandler={replyingToReplyInfoHandler}
              likeReplyHandler={likeReplyHandler}
              deleteReplyHandler={deleteReplyHandler}
              editingCommentInfoHandler={()=>editingCommentInfoHandler(item._id)}
              editingReplyInfoHandler={editingReplyInfoHandler}
              loading={commentOnPostLoading}
            />
          ))
        ) : (
          <View
            style={{
              width: Dimensions.get("window").width - 50,
              height: Dimensions.get("window").height / 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>Be the first to commnet</Text>
          </View>
        )}
      </ScrollView>

      {isUserReplying && (
        <View
          style={{
            width: size - 30,
            height: 45,
            backgroundColor: colors.color6,
            alignSelf: "center",
            borderRadius: 5,
            marginBottom: 2,
            ...flexBoxBasic,
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              color: colors.color10,
            }}
          >
            {(isUserEditingComment || isUserEditingReply ) ? `You are Editing you're Comment`:`Replying to ${userReplyingTo}`}
          </Text>

          <TouchableOpacity
            onPress={closingAllInfos}
            activeOpacity={0.5}
          >
            <Avatar.Icon
              icon={"close"}
              size={35}
              style={{
                backgroundColor: colors.color6,
              }}
              color={colors.color10}
            />
          </TouchableOpacity>
        </View>
      )}

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
          height: Math.max(45, height + 20),
          marginBottom: 10,
        }}
      >
        <Avatar.Image
          size={30}
          source={{
            uri: user.avatar.url !== null ? user.avatar.url : defaultImg,
          }}
        />

        <TextInput
          value={comment}
          onChangeText={setComment}
          placeholder={"Add a Comment"}
          multiline={true}
          onContentSizeChange={(e) =>
            setHeight(e.nativeEvent.contentSize.height)
          }
          style={{
            fontSize: 18,
            width: "75%",
            height: Math.max(35, height),
            marginLeft: 5,
          }}
          onFocus={ToggleColor}
          onBlur={ToggleColor}
        />

        <TouchableOpacity activeOpacity={0.5} onPress={submitHandler}>
          <Avatar.Icon
            size={40}
            icon={"send"}
            color={sendIconColor}
            style={{
              backgroundColor: searchBackGroundColor,
              position: "absolute",
              top: -20,
              right: -32,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const LikesHeader = ({ navigation,handler }) => (
  <View
    style={{
      ...flexBoxBasic,
      justifyContent: "flex-start",
    }}
  >
    <TouchableOpacity onPress={handler} activeOpacity={0.5}>
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
      Comments
    </Text>
  </View>
);

export default Comments;
