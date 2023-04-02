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
import mime from "mime";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/userAction";
import {useMessageAndErrorUserWithoutNavigating} from "../utils/customHooks"
import Loader from "../Components/Loader";

const size = Dimensions.get("screen").width;

const Register = ({ navigation,route }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarChanged, setAvatarChanged] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [toggleEyeIcon, setToggleEyeIcon] = useState("eye");
  const [toggleBorderColor, setToggleBorderColor] = useState(colors.color8);
  const [toggleBorderColorPassword, setToggleBorderColorPassword] = useState(
    colors.color8
  );
  const [toggleBorderColorName, setToggleBorderColorName] = useState(
    colors.color8
  );
  const [toggleBorderColorUserName, setToggleBorderColorUserName] = useState(
    colors.color8
  );

  const [emailIconColor, setEmailIconColor] = useState(colors.color8);
  const [nameIconColor, setNameIconColor] = useState(colors.color8);
  const [userNameIconColor, setUserNameIconColor] = useState(colors.color8);
  const [passWordIconColor, setpassWordIconColor] = useState(colors.color8);

  const {registerLoading} =useSelector(state=>state.user);

  const dispatch=useDispatch();

  const showPasswordToggle = () => {
    setShowPassword((prev) => !prev);
    setToggleEyeIcon((prev) => (prev === "eye" ? "eye-off" : "eye"));
  };


  const registerHandler=async()=>{
    const myForm=new FormData();
    myForm.append('name',name);
    myForm.append('email',email);
    myForm.append('userName',userName);
    myForm.append('password',password);
    
    if(avatarChanged){
      myForm.append('file',{
        uri:avatar,
        type:mime.getType(avatar),
        name:avatar.split('/').pop(),
      })
    }

    await dispatch(register(myForm));

    navigation.navigate('VerifyEmail');

  }

  useMessageAndErrorUserWithoutNavigating(dispatch);

  useEffect(() => {

    if(route.params?.image){
      setAvatar(route.params.image);
      console.log(route.params.image);
      setAvatarChanged(true);
    }
  }, [route.params]);
  

  return registerLoading ? <Loader/> : (
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
            Create an account
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
            Register for free ,Let's the fun begin
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
              onPress={() => navigation.navigate("Camera", { register: true })}
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
                 width:"80%"
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
              justifyContent: "flex-start",
              ...textInputStyling,
              borderBottomColor: toggleBorderColor,
              marginVertical: 10,
            }}
            onFocus={() =>
              toggleColor(
                toggleBorderColor,
                setToggleBorderColor,
                emailIconColor,
                setEmailIconColor
              )
            }
            onBlur={() =>
              toggleColor(
                toggleBorderColor,
                setToggleBorderColor,
                emailIconColor,
                setEmailIconColor
              )
            }
          >
            <Avatar.Icon
              icon={"email"}
              size={35}
              color={emailIconColor}
              style={{
                backgroundColor: colors.color2,
              }}
            />

            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
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
              borderBottomColor: toggleBorderColorPassword,
              marginVertical: 10,
            }}
            onFocus={() =>
              toggleColor(
                toggleBorderColorPassword,
                setToggleBorderColorPassword,
                passWordIconColor,
                setpassWordIconColor
              )
            }
            onBlur={() =>
              toggleColor(
                toggleBorderColorPassword,
                setToggleBorderColorPassword,
                passWordIconColor,
                setpassWordIconColor
              )
            }
          >
            <Avatar.Icon
              icon={"lock-check"}
              size={35}
              color={passWordIconColor}
              style={{
                backgroundColor: colors.color2,
              }}
            />

            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              numberOfLines={2}
              secureTextEntry={showPassword}
              style={{
                width: "80%",
              }}
            />

            {password.length > 0 && (
              <TouchableOpacity onPress={showPasswordToggle}>
                <Avatar.Icon
                  icon={toggleEyeIcon}
                  size={35}
                  color={colors.color3}
                  style={{
                    backgroundColor: colors.color2,
                  }}
                />
              </TouchableOpacity>
            )}
          </View>

          <Button
            style={{
              borderRadius: 10,
              backgroundColor: colors.color1,
              marginVertical: 10,
            }}

            disabled={!email || !password || !userName}
            textColor={colors.color2}
            mode="contained"
            icon={"account-plus"}

            onPress={registerHandler}
          >
            Register
          </Button>

          <View
            style={{
              ...flexBoxBasic,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "400",
                fontSize: 14,
                color: colors.color8,
                marginHorizontal: 4,
                marginVertical: 5,
              }}
            >
              Already have an account ?
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  fontWeight: "900",
                  fontSize: 14,
                  color: colors.color3,
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;
