import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React, { useState } from "react";
import { colors, defaultImg, flexBoxBasic } from "../style/style";
import { ActivityIndicator, Avatar, Button } from "react-native-paper";

const ReplyCommpent = ({
  id,
  likes,
  commentBy,
  commentMessage,
  repliedTo,
  isLiked,
  likeReplyHandler,
  replyOwner,
  commentOwner,
  postOwner,
  deleteReplyHandler,
  replyingToReplyInfoHandler,
  editingReplyInfoHandler,
  loading
}) => {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onLongPress={() => setIsOptionsVisible((prev) => !prev)}
      >
        {((isOptionsVisible && replyOwner) ||
          (isOptionsVisible && commentOwner) ||
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
            {replyOwner && (
              <TouchableOpacity
                onPress={editingReplyInfoHandler}
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

            <TouchableOpacity activeOpacity={0.9} onPress={deleteReplyHandler}>
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
            padding: 15,
            paddingVertical: 5,
            width: Dimensions.get("window").width - 40,
            alignSelf: "flex-end",
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
                uri:
                  commentBy.avatar.url !== null
                    ? commentBy.avatar.url
                    : defaultImg,
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
                {`${commentBy.userName}`}
              </Text>

              <View
                style={{
                  ...flexBoxBasic,
                  justifyContent: "flex-start",
                }}
              >
                <Text
                  style={{
                    marginTop: 2,
                    marginLeft: 5,
                    fontWeight: "500",
                    color: colors.color8,
                    width: Dimensions.get("window").width - 150,
                  }}
                >
                  <Text
                    style={{
                      marginTop: 2,
                      fontWeight: "500",
                      color:colors.color3,
                    }}
                  >
                    {`@${repliedTo.userName}`}
                  </Text>
                  {` ${commentMessage}`}
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  width: 40,
                }}
                onPress={replyingToReplyInfoHandler}
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

            </View>
          </View>

          <View
            style={{
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={likeReplyHandler} activeOpacity={0.9}>
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
    </>
  );
};

export default ReplyCommpent;
