import { View, Text, TouchableOpacity, Dimensions, BackHandler } from "react-native";
import React, { useState } from "react";
import { Avatar, Button } from "react-native-paper";
import { colors, defaultImg, flexBoxBasic } from "../style/style";

const size = Dimensions.get("screen").width;

const ChatBoxComponent = ({ name,userName,avatar,_id,setMembers,members}) => {

    const [isSelected,setIsSelected]=useState(false);

    const handler=()=>{

        if(isSelected){
            setMembers((oldArray)=>oldArray.filter((item)=>item !==_id));
            console.log(members);

        }else{
            setMembers((oldArray)=>[...oldArray,_id]);
            console.log(members);
        }
        
    }
  
  return (
    <TouchableOpacity
      onPress={()=>setIsSelected((prev)=>!prev)}
      activeOpacity={0.9}
    >
      <View
        style={{
          ...flexBoxBasic,
          justifyContent:"flex-start",
          width:size-50,
          alignSelf:"center",
          marginVertical:12,

        }}
      >
        <Avatar.Image
          size={50}
          source={{
            uri:avatar !==null ? avatar :defaultImg,
          }}
        />

        <View
        style={{
            marginHorizontal:10,
            alignItems:"center",
            width:180,
        }}
        >
          <Text
            style={{
              fontWeight: "600",
              marginHorizontal:30,
            }}
          >
            {name}
          </Text>

          <Text
            style={{
              color: colors.color7,
            }}
          >
            {userName}
          </Text>
        </View>

        <View
          style={{
            width:28,
            height:28,
            borderWidth:isSelected ? 0 : 1,
            borderRadius:100,
            borderColor:isSelected ? colors.color1 : colors.color3,
            position:'absolute',
            right:0,
          }}
        >
            <Avatar.Icon
             icon={'check'}
             color={colors.color2}
             size={25}
             style={{
                backgroundColor:isSelected ? colors.color1 :colors.color2,
             }}
            
            />
        </View>


      </View>
    </TouchableOpacity>
  );
};






export default ChatBoxComponent;