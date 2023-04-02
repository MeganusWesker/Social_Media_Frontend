import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import {
  colors,
  defaultStyle,
  flexBoxBasic,
  textInputStyling,
} from "../style/style";
import { Avatar, Button } from "react-native-paper";
import { toggleColor } from "../utils/toggleFunctions";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../redux/actions/userAction";
import { useMessageAndErrorUserWithoutNavigating } from "../utils/customHooks";

const size = Dimensions.get("screen").width;

const ChangePassword = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [toggleEyeIcon, setToggleEyeIcon] = useState("eye");
  const [toggleBorderColorOldPassword, setToggleBorderColorOldPassword] =
    useState(colors.color8);
  const [toggleBorderColorNewPassword, setToggleBorderColorNewPassword] =
    useState(colors.color8);
  const [oldPasswordIconColor, setOldPasswordIconColor] = useState(
    colors.color8
  );

  const [confirmPasswordIconColor, setConfirmPasswordIconColor] = useState(
    colors.color8
  );

  const [newPasswordIconColor, setNewPasswordIconColor] = useState(
    colors.color8
  );

  const [
    toggleBorderColorConfirmPassword,
    setToggleBorderColorConfirmPassword,
  ] = useState(colors.color8);

  const {changePasswordLoading} =useSelector(state=>state.user);

  const dispatch=useDispatch();

 

  const showPasswordToggle = () => {
    setShowPassword((prev) => !prev);
    setToggleEyeIcon((prev) => (prev === "eye" ? "eye-off" : "eye"));
  };

  const ChangePasswordHandler=()=>{
    dispatch(changePassword(oldPassword,newPassword,confirmPassword))
  }

  useMessageAndErrorUserWithoutNavigating(dispatch);

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
              Change PassWord
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

            <View
              style={{
                ...flexBoxBasic,
                justifyContent: "flex-start",
                marginVertical: 10,
                ...textInputStyling,
                borderBottomColor: toggleBorderColorOldPassword,
              }}
              onFocus={() =>
                toggleColor(
                  toggleBorderColorOldPassword,
                  setToggleBorderColorOldPassword,
                  oldPasswordIconColor,
                  setOldPasswordIconColor
                )
              }
              onBlur={() =>
                toggleColor(
                  toggleBorderColorOldPassword,
                  setToggleBorderColorOldPassword,
                  oldPasswordIconColor,
                  setOldPasswordIconColor
                )
              }
            >
              <Avatar.Icon
                icon={"lock"}
                size={35}
                color={oldPasswordIconColor}
                style={{
                  backgroundColor: colors.color2,
                }}
              />

              <TextInput
                placeholder="OldPassword"
                value={oldPassword}
                onChangeText={setOldPassword}
                numberOfLines={2}
                secureTextEntry={showPassword}
                style={{
                  width: "80%",
                }}
              />

              {oldPassword.length > 0 && (
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

            <Button
              style={{
                borderRadius: 10,
                backgroundColor: colors.color1,
                marginVertical: 10,
              }}
              icon={'send'}
              textColor={colors.color2}
              mode="contained"
              disabled={!oldPassword || !newPassword || !confirmPassword}
              loading={changePasswordLoading}
              onPress={ChangePasswordHandler}
            >
              Change PassWord
            </Button>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ChangePassword;
