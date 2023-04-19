import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { colors, defaultImg, flexBoxBasic } from "../style/style";
import { ActivityIndicator, Avatar, Button } from "react-native-paper";
import { useState } from "react";
import ReplyCommpent from "./ReplyCommpent";
import { isLikedChecker } from "../utils/toggleFunctions";

const CommentComponent = ({
  id,
  likes,
  replies,
  user,
  commentMessage,
  isLiked,
  loggedInUser,
  likeCommentHandler,
  deleteCommentHandler,
  postOwner,
  commentOwner,
  replyingToInfoHandler,
  likeReplyHandler,
  deleteReplyHandler,
  replyingToReplyInfoHandler,
  editingCommentInfoHandler,
  editingReplyInfoHandler,
  loading
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onLongPress={() => setIsOptionsVisible((prev) => !prev)}
      >
        {((isOptionsVisible && commentOwner) ||
          (isOptionsVisible && postOwner)) && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              backgroundColor: colors.color10,
              width: "100%",
              height: "100%",
              zIndex: 5,
            }}
          >
            {commentOwner && (
              <TouchableOpacity
                onPress={editingCommentInfoHandler}
                activeOpacity={0.9}
              >
                <Avatar.Icon
                  icon={"pencil"}
                  size={30}
                  style={{
                    backgroundColor: colors.color10,
                    zIndex: 10,
                  }}
                  color={colors.color2}
                />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={deleteCommentHandler}
              activeOpacity={0.9}
            >
              <Avatar.Icon
                icon={"delete"}
                size={30}
                style={{
                  backgroundColor: colors.color10,
                  marginHorizontal: 10,
                  zIndex: 10,
                }}
                color={colors.color2}
              />
            </TouchableOpacity>
          </View>
        )}

        <View
          style={{
            ...flexBoxBasic,
            alignItems: "flex-start",
            padding: 15,
            paddingVertical: 5,
          }}
        >
          <View
            style={{
              ...flexBoxBasic,
              justifyContent: "flex-start",
            }}
          >
            <Avatar.Image
              source={{
                uri: user.avatar.url !== null ? user.avatar.url : defaultImg,
              }}
              size={35}
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
                {`${user.userName}`}
              </Text>

              <Text
                style={{
                  marginTop: 2,
                  fontWeight: "500",
                  color: colors.color8,
                  width: Dimensions.get("window").width - 150,
                }}
              >
                {`${commentMessage}`}
              </Text>

              <TouchableOpacity
                style={{
                  width: 40,
                }}
                onPress={replyingToInfoHandler}
              >
                <Text
                  style={{
                    color: colors.color10,
                    width: "100%",
                  }}
                >
                  Reply
                </Text>
              </TouchableOpacity>

              {
                loading && (
                  <View
                  style={{
                    width: 5,
                    height: 5,
                  }}
                >
                  <ActivityIndicator
                    animating={true}
                    color={colors.color1}
                    size={5}
                  />
                </View>
                )
              }



              {replies.length > 0 && (
                <TouchableOpacity onPress={() => setIsVisible((prev) => !prev)}>
                  <View
                    style={{
                      ...flexBoxBasic,
                      justifyContent: "flex-start",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: colors.color8,
                        width: 40,
                        height: 1,
                      }}
                    ></View>

                    <Text
                      style={{
                        color: colors.color8,
                        marginLeft: 4,
                        fontWeight: "600",
                      }}
                    >
                      {isVisible
                        ? `Hide Replies`
                        : `View ${replies.length} more replies`}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View
            style={{
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={likeCommentHandler} activeOpacity={0.8}>
              <Avatar.Icon
                icon={isLiked() ? "heart" : "heart-outline"}
                size={25}
                color={isLiked() ? colors.color9 : colors.color8}
                style={{
                  backgroundColor: colors.color2,
                }}
              />
            </TouchableOpacity>

            <Text
              style={{
                fontWeight: "300",
                color: colors.color8,
              }}
            >
              {likes.length}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {isVisible &&
        replies.map((item) => (
          <ReplyCommpent
            key={item._id}
            id={item._id}
            commentBy={item.commentBy}
            repliedTo={item.repliedTo}
            likes={item.likes}
            commentMessage={item.comment}
            isLiked={() => isLikedChecker(item, loggedInUser._id)}
            likeReplyHandler={() => likeReplyHandler(id, item._id,item.commentBy._id)}
            deleteReplyHandler={() => deleteReplyHandler(id, item._id)}
            commentOwner={commentOwner}
            postOwner={postOwner}
            replyOwner={item.commentBy._id === loggedInUser._id}
            replyingToReplyInfoHandler={() =>
              replyingToReplyInfoHandler(item.commentBy.userName, id, item._id,item.commentBy._id)
            }
            editingReplyInfoHandler={() =>
              editingReplyInfoHandler(id, item._id)
            }
            loading={loading}
          />
        ))}
    </>
  );
};

export default CommentComponent;
