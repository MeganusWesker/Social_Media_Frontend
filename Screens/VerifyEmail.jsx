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
  import { useMessageAndErrorUser } from "../utils/customHooks";
  import Toast from 'react-native-toast-message';
import { verifyUser } from "../redux/actions/userAction";
  
  const VerifyEmail = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
  
  

    const [toggleBorderColor, setToggleBorderColor] = useState(colors.color8);
    const [toggleBorderColorOtp, setToggleBorderColorOtp] = useState(colors.color8);
    const [emailIconColor, setEmailIconColor] = useState(colors.color8);
    const [otpIconColor, setOtpIconColor] = useState(colors.color8);
  
    const dispatch=useDispatch();
  
    const {loading,error,message} =useSelector(state=>state.user);
  

  

    const verifyEmailHandler=async()=>{
        dispatch(verifyUser(Number(otp),email));
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
              VerifyEmail
            </Text>
  
            <Text
              style={{
                fontWeight: "400",
                fontSize: 14,
                color: colors.color8,
                marginVertical:10,
              }}
            >
              VerifyEmail,to get Services
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
                }}>resend otp? </Text>
            </TouchableOpacity>
  
            <Button
              style={{
                borderRadius: 10,
                backgroundColor: colors.color1,
                marginVertical:10,
              }}
  
              disabled={!email || !otp}
              textColor={colors.color2}
              mode="contained"
              icon={'login'}
              loading={loading}
  
              onPress={verifyEmailHandler}
            >
              verify
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
  
                or Login 
              </Text>
  
  
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text
                
                style={{
                  fontWeight:"900",
                  fontSize:14,
                  color:colors.color3,
                }}
                
                >Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };
  

  
export default VerifyEmail;