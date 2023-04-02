import { View, TouchableOpacity,Dimensions } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../style/style'
import { Avatar, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';



const width=Dimensions.get('window').width;
const Footer = ({activeRoute,setVisible}) => {

    const navigation=useNavigation();

  return (
    <View
      style={{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        elevation:10,
        backgroundColor:colors.color2,
        borderRadius:15,
        width:width-30,
        alignSelf:'center',
        bottom:10,
        height:45,
      }}
    >



    <TouchableOpacity
      onPress={()=>navigation.navigate('Home')}
      activeOpacity={0.5}
    >
        <Avatar.Icon
            size={40}
            icon={activeRoute ==='home' ? 'home' :'home-outline'}
          
            color={activeRoute==='home' ? colors.color2 : colors.color3} 
            style={{
               backgroundColor:activeRoute==='home' ? colors.color1 :colors.color2,
            }}
        />
    </TouchableOpacity>

    <TouchableOpacity
        onPress={()=>setVisible((prev)=>!prev)}
        activeOpacity={0.5}
    >
    
    <Avatar.Icon
        size={40}
        icon='plus'
        color={colors.color3}
        style={{
            backgroundColor:colors.color2,
        }}
     /> 

    </TouchableOpacity>

    <TouchableOpacity
     
     onPress={()=>navigation.navigate('Search')}
     activeOpacity={0.5}
    
    >
    
    <Avatar.Icon
        size={40}
        icon='magnify'
        color={colors.color3}
        style={{
            backgroundColor:colors.color2,
        }}
     /> 
     
    </TouchableOpacity>

    <TouchableOpacity
    
        onPress={()=>navigation.navigate('Profile')}
        activeOpacity={0.5}
    >
    
    <Avatar.Icon
        size={40}
        icon={activeRoute ==='profile' ? 'account' :'account-outline'}
        color={activeRoute==='profile' ? colors.color2 : colors.color3} 
        style={{
           backgroundColor:activeRoute==='profile' ? colors.color1 :colors.color2,
        }}
     /> 
     
    </TouchableOpacity>

    </View>
  )
}

export default Footer