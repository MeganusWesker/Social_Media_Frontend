import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, {  useEffect, useState } from "react";
import { colors, defaultStyle, flexBoxBasic, textInputStyling } from "../style/style";
import { Avatar, Button } from "react-native-paper";
import { toggleColor } from "../utils/toggleFunctions";
import {useDispatch, useSelector} from "react-redux"
import { login } from "../redux/actions/userAction";
import { useMessageAndErrorUser } from "../utils/customHooks";
import Toast from 'react-native-toast-message';
import { getPostsOfFollowing } from "../redux/actions/postAction";

const Login = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [showPassword, setShowPassword] = useState(true);
  const [toggleEyeIcon, setToggleEyeIcon] = useState("eye");
  const [toggleBorderColor, setToggleBorderColor] = useState(colors.color8);
  const [toggleBorderColorPassword, setToggleBorderColorPassword] = useState(colors.color8);
  const [emailIconColor, setEmailIconColor] = useState(colors.color8);
  const [passWordIconColor, setpassWordIconColor] = useState(colors.color8);

  const dispatch=useDispatch();

  const {loading,error,message} =useSelector(state=>state.user);

  const showPasswordToggle = () => {
    setShowPassword((prev) => !prev);
    setToggleEyeIcon((prev) => (prev === "eye" ? "eye-off" : "eye"));
  };



  const loginHandler=async()=>{
   await dispatch(login(email,password));
   await dispatch(getPostsOfFollowing());
    navigation.reset({
      index:0,
      routes: [{ name:"Profile" }],
    });
  }



  useEffect(()=>{

    if(error){
  
        Toast.show({
          type: 'error',
          text1: error,
        });
  
        dispatch({
          type:"clearError"
        })
    }
  
    if(message){
  
      Toast.show({
        type: 'success',
        text1: message,
      });
  
      dispatch({
        type:"clearMessage"
      })
    }
  
  },[error,message,dispatch]);
  return (
    <View
      style={{
        ...defaultStyle,
       
      }}
    >

     
        <Text
         style={{
          fontWeight:"900",
          fontSize:20,
          color:colors.color3,
         }}
        >
          MemeKaAdda
        </Text>
  



      <ScrollView showsVerticalScrollIndicator={false}
      >

        <View
         style={{
          paddingVertical:50,
          borderRadius:10,
          backgroundColor:colors.color2,
         }}
        >
          <Text
            style={{
              fontWeight: "900",
              fontSize: 18,
              textAlign:"center"
            }}
          >
            Welcome Back
          </Text>

          <Text
            style={{
              fontWeight: "400",
              fontSize: 14,
              color: colors.color8,
              marginVertical:10,
            }}
          >
            Welcome Back , Please enter you're Credentials
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

     

          <View
            style={{
              ...flexBoxBasic,
              marginVertical:10,
                ...textInputStyling,
                justifyContent: "flex-start",
                borderBottomColor:toggleBorderColorPassword,
            }}

           

            onFocus={()=>toggleColor(toggleBorderColorPassword,setToggleBorderColorPassword,passWordIconColor,setpassWordIconColor)}
            onBlur={()=>toggleColor(toggleBorderColorPassword,setToggleBorderColorPassword,passWordIconColor,setpassWordIconColor)}

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
                width:"80%",
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

          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword",{sendOtp:false})}
          >
            <Text
            style={{
              alignSelf:"flex-end",
              fontWeight:"600",
              fontSize:14,
              color:colors.color7,
            }}
            >Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ForgotPassword", { sendOtp: true })
            }
          >
            <Text style={{
              marginVertical:10, 
              alignSelf:"flex-end",
              fontWeight:"600",
              fontSize:14,
              color:colors.color7,
              }}>verify email? </Text>
          </TouchableOpacity>

          <Button
            style={{
              borderRadius: 10,
              backgroundColor: colors.color1,
              marginVertical:10,
            }}

            disabled={!email || !password}
            textColor={colors.color2}
            mode="contained"
            icon={'login'}
            loading={loading}

            onPress={loginHandler}
          >
            Login
          </Button>

          <View
           style={{
            ...flexBoxBasic,
            justifyContent:'center',


           }}
          >

            <Text
              style={{
                fontWeight:"400",
                fontSize:14,
                color:colors.color8,
                marginHorizontal:4,
                marginVertical:5,
              }}
            >

              Don't have an account ?
            </Text>


            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text
              
              style={{
                fontWeight:"900",
                fontSize:14,
                color:colors.color3,
              }}
              
              >SignUp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
