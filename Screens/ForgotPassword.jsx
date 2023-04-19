import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Avatar, Button } from "react-native-paper";
import {useDispatch,useSelector} from "react-redux"
import {
  colors,
  defaultStyle,
  flexBoxBasic,
  textInputStyling,
} from "../style/style";

import { toggleColor } from "../utils/toggleFunctions";
import { forgotPassword } from "../redux/actions/userAction";
import { useMessageAndErrorUserWithoutNavigating } from "../utils/customHooks";

const size = Dimensions.get("screen").width;

const ForgotPassword = ({
  navigation,
  route: {
    params: { sendOtp },
  },
}) => {
  const [email, setEmail] = useState("");
  const [toggleBorderColor, setToggleBorderColor] = useState(colors.color8);
  const [emailIconColor, setEmailIconColor] = useState(colors.color8);

  const {forgotPasswordloading} =useSelector((state)=>state.user);

  const dispatch=useDispatch();

  const submitHandler=async()=>{
    await dispatch(forgotPassword(email));
    sendOtp ? navigation.navigate("VerifyEmail") : navigation.navigate("ResetPassword");
  }

  useMessageAndErrorUserWithoutNavigating(dispatch);


  return (
    <View
      style={{
        ...defaultStyle,
        padding: 0,
      }}
    >
      <Header
        navigation={navigation}
        text={sendOtp ? "VerifyEmail" : "ForgotPassword"}
      />

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
            Trouble With Logging in?
          </Text>

          <Text
            style={{
              fontWeight: "400",
              fontSize: 14,
              color: colors.color8,
              marginVertical: 14,
            }}
          >
            {sendOtp
              ? "Verify You're Email Too get access to  the services"
              : "Don't worry we will help you to reset you're Password"}
          </Text>

          <View
            style={{
              ...flexBoxBasic,
              justifyContent: "flex-start",
              ...textInputStyling,
              borderBottomColor: toggleBorderColor,
            }}
            onFocus={()=>toggleColor(toggleBorderColor,setToggleBorderColor,emailIconColor,setEmailIconColor)}
            onBlur={()=>toggleColor(toggleBorderColor,setToggleBorderColor,emailIconColor,setEmailIconColor)}
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

          <Button
            style={{
              borderRadius: 10,
              backgroundColor: colors.color1,
              marginVertical: 10,
            }}
            icon={"send"}
            textColor={colors.color2}
            mode="contained"
            disabled={!email}
            loading={forgotPasswordloading}
            onPress={submitHandler}
          >
            Send Otp
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

export default ForgotPassword;
