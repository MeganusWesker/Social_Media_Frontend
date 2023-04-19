import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Button } from "react-native-paper";
import {
  colors,
  defaultImg,
  defaultStyle,
  flexBoxBasic,
  textInputStyling,
} from "../style/style";
import { toggleColor } from "../utils/toggleFunctions";
import { useDispatch, useSelector } from "react-redux";
import {  updatePost } from "../redux/actions/postAction";
import { useMessageAndErrorPostWithoutNavigating } from "../utils/customHooks";
import Loader from "../Components/Loader";

const size = Dimensions.get("screen").width;

const UpdatePost = ({ navigation}) => {
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const [toggleBorderColor, setToggleBorderColor] = useState(colors.color8);
  const [bioIconColor, setBioIconColor] = useState(colors.color8);

  const { addPostLoading, getSinglePostLoading, post } = useSelector(
    (state) => state.post
  );
 

  const dispatch = useDispatch();

  const submitHandler = async () => {
    await dispatch(updatePost(post._id,caption));

    navigation.goBack();
  };

  useMessageAndErrorPostWithoutNavigating(dispatch);

  useEffect(() => {
    if (post.image) {
      setImage(post.image.url);
    }

    if (post.caption) {
      setCaption(post.caption);
    }
  }, [post.image, post.caption]);

  return getSinglePostLoading === undefined || getSinglePostLoading ? (
    <Loader />
  ) : (
    <View
      style={{
        ...defaultStyle,
        padding: 0,
      }}
    >
      <Header navigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingVertical: 50,
            borderRadius: 10,
            backgroundColor: colors.color2,
            width: size - 50,
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "900",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            Update Post
          </Text>

          <Text
            style={{
              fontWeight: "400",
              fontSize: 14,
              color: colors.color8,
              marginVertical: 14,
            }}
          >
            Update Post note you could only change caption of the post
          </Text>

          <View style={{}}>
            <Avatar.Image
              size={size / 3}
              source={{ uri: image ? image : defaultImg }}
              style={{
                backgroundColor: colors.color1,
                alignSelf: "center",
              }}
            />
          </View>

          <View
            style={{
              ...flexBoxBasic,
              marginVertical: 10,
              ...textInputStyling,
              justifyContent: "flex-start",
              borderBottomColor: toggleBorderColor,
              marginVertical: 10,
            }}
            onFocus={() =>
              toggleColor(
                toggleBorderColor,
                setToggleBorderColor,
                bioIconColor,
                setBioIconColor
              )
            }
            onBlur={() =>
              toggleColor(
                toggleBorderColor,
                setToggleBorderColor,
                bioIconColor,
                setBioIconColor
              )
            }
          >
            <Avatar.Icon
              icon={"information"}
              size={35}
              color={bioIconColor}
              style={{
                backgroundColor: colors.color2,
              }}
            />

            <TextInput
              placeholder="Caption"
              value={caption}
              onChangeText={setCaption}
              numberOfLines={2}
              style={{
                width: "80%",
              }}
            />
          </View>

          <Button
            style={{
              borderRadius: 10,
              backgroundColor: colors.color1,
              marginVertical: 10,
            }}
            icon={"information"}
            textColor={colors.color2}
            mode="contained"
            disabled={!caption}
            loading={addPostLoading}
            onPress={submitHandler}
          >
            Update Caption
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const Header = ({ navigation  }) => (
  <View
    style={{
      ...flexBoxBasic,
      justifyContent: "flex-start",
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

    <Text
      style={{
        fontWeight: "800",
        fontSize: 20,
        marginLeft: 20,
      }}
    >
      Update Post
    </Text>
  </View>
);

export default UpdatePost;
