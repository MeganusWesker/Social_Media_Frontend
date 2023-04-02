import { View, Dimensions } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { colors } from '../style/style'



const size=Dimensions.get('screen').width;


const Loader = () => {
  return (
    <View
      style={{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
      }}
    >
        <ActivityIndicator animating={true} color={colors.color1} size={size/5} />
      
    </View>
  )
}

export default Loader