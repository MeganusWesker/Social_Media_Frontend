import { View, Text, TouchableOpacity, ScrollView,Dimensions, TextInput } from "react-native";
import React from "react";
import { Avatar, Button } from "react-native-paper";
import { colors, defaultStyle, flexBoxBasic, textInputStyling } from "../style/style";
import { useState } from "react";
import { toggleColor } from "../utils/toggleFunctions";
import { resetPassword } from "../redux/actions/userAction";
import { useMessageAndErrorUserWithoutNavigating } from "../utils/customHooks";
import { useDispatch, useSelector } from "react-redux";

const size = Dimensions.get("screen").width;

const ResetPassword = ({ navigation }) => {
    

    const dispatch=useDispatch();
    const {resetPasswordloading} =useSelector((state)=>state.user);

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [showPassword, setShowPassword] = useState(true);
 

    const [toggleBorderColorNewPassword, setToggleBorderColorNewPassword] =useState(colors.color8);
    const [toggleBorderColorConfirmPassword,setToggleBorderColorConfirmPassword,] = useState(colors.color8);
    const [toggleBorderColorOtp, setToggleBorderColorOtp] = useState(colors.color8);

    const [confirmPasswordIconColor, setConfirmPasswordIconColor] = useState(colors.color8);
    const [newPasswordIconColor, setNewPasswordIconColor] = useState(colors.color8);
    const [otpIconColor, setOtpIconColor] = useState(colors.color8);
    const [toggleEyeIcon, setToggleEyeIcon] = useState("eye");

    const submitHandler=async()=>{
       await dispatch(resetPassword(Number(otp),newPassword,confirmPassword));
       navigation.navigate("Login");
    }

    const showPasswordToggle = () => {
        setShowPassword((prev) => !prev);
        setToggleEyeIcon((prev) => (prev === "eye" ? "eye-off" : "eye"));
      };

      useMessageAndErrorUserWithoutNavigating(dispatch)


  return (
    <View
      style={{
        ...defaultStyle,
        padding: 0,
      }}
    >

        <Header navigation={navigation} text={"ResetPassword"}/>

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
            Reset You're Password
          </Text>

          <Text
            style={{
              fontWeight: "400",
              fontSize: 14,
              color: colors.color8,
              marginVertical: 14,
            }}
          >

            Create A new Strong Password for you're account

          </Text>

            <View
              style={{
                ...flexBoxBasic,
                marginVertical: 10,
                justifyContent: "flex-start",
                ...textInputStyling,
                borderBottomColor: toggleBorderColorNewPassword,
              }}
              onFocus={() =>
                toggleColor(
                  toggleBorderColorNewPassword,
                  setToggleBorderColorNewPassword,
                  newPasswordIconColor,
                  setNewPasswordIconColor
                )
              }
              onBlur={() =>
                toggleColor(
                  toggleBorderColorNewPassword,
                  setToggleBorderColorNewPassword,
                  newPasswordIconColor,
                  setNewPasswordIconColor
                )
              }
            >
              <Avatar.Icon
                icon={"lock-open"}
                size={35}
                color={newPasswordIconColor}
                style={{
                  backgroundColor: colors.color2,
                }}
              />

              <TextInput
                placeholder="NewPassword"
                value={newPassword}
                onChangeText={setNewPassword}
                numberOfLines={2}
                secureTextEntry={showPassword}
                style={{
                  width: "80%",
                }}
              />

              {newPassword.length > 0 && (
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

            <View
              style={{
                ...flexBoxBasic,
                marginVertical: 10,
                justifyContent:"flex-start",
                ...textInputStyling,
                borderBottomColor: toggleBorderColorConfirmPassword,
              }}

              onFocus={() =>
                toggleColor(
                  toggleBorderColorConfirmPassword,
                  setToggleBorderColorConfirmPassword,
                  confirmPasswordIconColor,
                  setConfirmPasswordIconColor
                )
              }
              onBlur={() =>
                toggleColor(
                  toggleBorderColorConfirmPassword,
                  setToggleBorderColorConfirmPassword,
                  confirmPasswordIconColor,
                  setConfirmPasswordIconColor
                )
              }

            >
              <Avatar.Icon
                icon={"lock-check"}
                size={35}
                color={confirmPasswordIconColor}
                style={{
                  backgroundColor: colors.color2,
                }}
              />

              <TextInput
                placeholder="ConfirmPassword"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                numberOfLines={2}
                secureTextEntry={showPassword}
                style={{
                  width: "80%",
                }}
              />

              {confirmPassword.length > 0 && (
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

            <View
              style={{
                ...flexBoxBasic,
                marginVertical:10,
                  ...textInputStyling,
                  justifyContent: "flex-start",
                  borderBottomColor:toggleBorderColorOtp,
              }}
  
             
  
              onFocus={()=>toggleColor(toggleBorderColorOtp,setToggleBorderColorOtp,otpIconColor,setOtpIconColor)}
              onBlur={()=>toggleColor(toggleBorderColorOtp,setToggleBorderColorOtp,otpIconColor,setOtpIconColor)}
  
            >
  
              <Avatar.Icon
                icon={"lock-check"}
                size={35}
                color={otpIconColor}
                style={{
                  backgroundColor: colors.color2,
                }}
              />
  
  
  
              <TextInput
                placeholder="otp"
                value={otp}
                onChangeText={setOtp}
                numberOfLines={2}
                keyboardType={'numeric'}
                style={{
                  width:"80%",
                }}
              />
  
         
            </View>

            <Button
              style={{
                borderRadius: 10,
                backgroundColor: colors.color1,
                marginVertical:10,
              }}
  
              disabled={!newPassword || !otp || !confirmPassword}
              textColor={colors.color2}
              mode="contained"
              icon={'send'}
              loading={resetPasswordloading}
              onPress={submitHandler}
            >
              ResetPassword
            </Button>


          </View>

       </ScrollView>

   
    </View>
  );
};

const Header = ({ navigation, text }) => (
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
      {text}
    </Text>
  </View>
);

export default ResetPassword;
