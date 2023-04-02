import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  colors,
  defaultImg,
  defaultStyle,
  flexBoxBasic,
  textInputStyling,
} from "../style/style";
import { Avatar, Button } from "react-native-paper";
import { toggleColor } from "../utils/toggleFunctions";
import { useDispatch, useSelector } from "react-redux";
import { useMessageAndErrorUserWithoutNavigating } from "../utils/customHooks";
import mime from "mime";
import { loadUser, updateProfile } from "../redux/actions/userAction";
const size = Dimensions.get("screen").width;

const EditProfile = ({ navigation,route }) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userName, setUserName] = useState("");
  const [avatarChanged, setAvatarChanged] = useState(false);
  const [toggleBorderColorName, setToggleBorderColorName] = useState(
    colors.color8
  );
  const [toggleBorderColorUserName, setToggleBorderColorUserName] = useState(
    colors.color8
  );

  const [toggleBorderColorBio, setToggleBorderColorBio] = useState(
    colors.color8
  );

  const [nameIconColor, setNameIconColor] = useState(colors.color8);
  const [userNameIconColor, setUserNameIconColor] = useState(colors.color8);
  const [bioIconColor, setBioIconColor] = useState(colors.color8);

  const dispatch=useDispatch();


  const {user,updateProfileLoading,loading} =useSelector(state=>state.user);


  const submitHandler=async()=>{
    const myForm=new FormData();
    myForm.append('name',name);
    myForm.append('userName',userName);
    myForm.append('bio',bio);
    
    if(avatarChanged){
      myForm.append('file',{
        uri:avatar,
        type:mime.getType(avatar),
        name:avatar.split('/').pop(),
      })
    }

    await dispatch(updateProfile(myForm));
    await dispatch(dispatch(loadUser));

  }



  useMessageAndErrorUserWithoutNavigating(dispatch);

  useEffect(() => {



    if(!loading){
       setBio(user.bio);
       setName(user.name);
       setUserName(user.userName);
       setAvatar(user.avatar.url)
    }

    if(route.params?.image){
      setAvatar(route.params.image);
      setAvatarChanged(true);
    }
  
  }, [route.params]);

  return (
    <>
      <View
        style={{
          ...defaultStyle,
        }}
      >
        <Text
          style={{
            fontWeight: "900",
            fontSize: 20,
            color: colors.color3,
          }}
        >
          MemeKaAdda
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              paddingVertical: 50,
              borderRadius: 10,
              backgroundColor: colors.color2,
            }}
          >
            <Text
              style={{
                fontWeight: "900",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              Edit Profile
            </Text>

            <Text
              style={{
                fontWeight: "400",
                fontSize: 14,
                color: colors.color8,
                marginVertical: 14,
                textAlign: "center",
              }}
            >
              Sometimes change is Good
            </Text>

            <View style={{}}>
              <Avatar.Image
                size={size / 3}
                source={{ uri: avatar ? avatar : defaultImg }}
                style={{
                  backgroundColor: colors.color1,
                  alignSelf: "center",
                }}
              />

              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() =>
                  navigation.navigate("Camera", { EditProfile: true })
                }
              >
                <Avatar.Icon
                  icon={"image-plus"}
                  size={35}
                  style={{
                    backgroundColor: colors.color2,
                    position: "absolute",
                    bottom: -10,
                    left: size / 2.2,
                  }}
                  color={colors.color3}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                ...flexBoxBasic,
                justifyContent: "flex-start",
                ...textInputStyling,
                borderBottomColor: toggleBorderColorName,
                marginVertical: 10,
              }}
              onFocus={() =>
                toggleColor(
                  toggleBorderColorName,
                  setToggleBorderColorName,
                  nameIconColor,
                  setNameIconColor
                )
              }
              onBlur={() =>
                toggleColor(
                  toggleBorderColorName,
                  setToggleBorderColorName,
                  nameIconColor,
                  setNameIconColor
                )
              }
            >
              <Avatar.Icon
                icon={"account-circle"}
                size={35}
                color={nameIconColor}
                style={{
                  backgroundColor: colors.color2,
                }}
              />

              <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                numberOfLines={2}
                style={{
                  width: "80%",
                }}
              />
            </View>

            <View
              style={{
                ...flexBoxBasic,
                justifyContent: "flex-start",
                ...textInputStyling,
                borderBottomColor: toggleBorderColorUserName,
                marginVertical: 10,
              }}
              onFocus={() =>
                toggleColor(
                  toggleBorderColorUserName,
                  setToggleBorderColorUserName,
                  userNameIconColor,
                  setUserNameIconColor
                )
              }
              onBlur={() =>
                toggleColor(
                  toggleBorderColorUserName,
                  setToggleBorderColorUserName,
                  userNameIconColor,
                  setUserNameIconColor
                )
              }
            >
              <Avatar.Icon
                icon={"account-check"}
                size={35}
                color={userNameIconColor}
                style={{
                  backgroundColor: colors.color2,
                }}
              />

              <TextInput
                placeholder="Choose Unqiue UserName"
                value={userName}
                onChangeText={setUserName}
                numberOfLines={2}
                style={{
                  width: "80%",
                }}
              />
            </View>

     

            <View
              style={{
                ...flexBoxBasic,
                marginVertical: 10,
                ...textInputStyling,
                justifyContent: "flex-start",
                borderBottomColor: toggleBorderColorBio,
                marginVertical: 10,
              }}
              onFocus={() =>
                toggleColor(
                  toggleBorderColorBio,
                  setToggleBorderColorBio,
                  bioIconColor,
                  setBioIconColor
                )
              }
              onBlur={() =>
                toggleColor(
                  toggleBorderColorBio,
                  setToggleBorderColorBio,
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
                placeholder="Bio"
                value={bio}
                onChangeText={setBio}
                numberOfLines={2}
                style={{
                  width:"80%"
                }}
      
              />
            </View>

      

            <Button
              style={{
                borderRadius: 10,
                backgroundColor: colors.color1,
                marginVertical: 10,
              }}
              textColor={colors.color2}
              mode="contained"
              icon={"account-edit"}
              loading={updateProfileLoading}
              onPress={submitHandler}
            >
              Edit Profile
            </Button>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default EditProfile;
