import { View, Text, TouchableOpacity,Dimensions, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, defaultStyle, flexBoxBasic } from '../style/style'
import { Avatar, Button } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux';
import { getAllSearchedUsers } from '../redux/actions/userAction';
import ChatBoxComponent from '../Components/ChatBoxComponent';

const size = Dimensions.get("screen").width;

const NewChat = ({navigation}) => {

    const [keyword,setKeyword] =useState("");
    const [members,setMembers] =useState([]);
    const [searchBackGroundColor, setSearchBackGroundColor] = useState(
      colors.color5
    );
    const [searchBorderColor, setSearchBorderColor] = useState(colors.color5);
    const [magnifyIconColor, setMagnifyIconColor] = useState(colors.color3);
    
    const {searchedUsers} =useSelector(state=>state.user);
    

    const dispatch=useDispatch();
  
    const ToggleColor = () => {
      searchBackGroundColor === colors.color5
        ? setSearchBackGroundColor(colors.color2)
        : setSearchBackGroundColor(colors.color5);
      searchBorderColor === colors.color5
        ? setSearchBorderColor(colors.color1)
        : setSearchBorderColor(colors.color5);
      magnifyIconColor === colors.color3
        ? setMagnifyIconColor(colors.color1)
        : setMagnifyIconColor(colors.color3);
    };

    

    useEffect(() => {
  
        dispatch(getAllSearchedUsers(keyword));
      }, [dispatch,keyword])


  return (
    <View
      style={{
        ...defaultStyle,
        padding: 0,
      }}
    >

      <LikesHeader navigation={navigation} />

           {/* SearchBar Start */}

           <View
        style={{
          ...flexBoxBasic,
          justifyContent: "flex-start",
          padding: 10,
          backgroundColor: searchBackGroundColor,
          borderColor: searchBorderColor,
          borderWidth: 1,
          width: size - 30,
          borderRadius: 10,
          alignSelf: "center",
          height: 45,
        }}
      >
        <Avatar.Icon
          icon={"magnify"}
          size={40}
          color={magnifyIconColor}
          style={{
            backgroundColor: searchBackGroundColor,
          }}
        />

        <TextInput
          value={keyword}
          onChangeText={setKeyword}
          placeholder={"Search"}
          style={{
            fontSize: 18,
            width: "80%",
            marginLeft: 5,
          }}
          onFocus={ToggleColor}
          onBlur={ToggleColor}
        />
      </View>

      {/* SearchBar end */}

      <ScrollView
         showsVerticalScrollIndicator={false}
         contentContainerStyle={{
            marginVertical:20,
         }}
      >

        {
            searchedUsers && searchedUsers.map((item)=>(
                <ChatBoxComponent
                   _id={item._id}
                   key={item._id}
                   name={item.name}
                   userName={item.userName}
                   avatar={item.avatar.url}
                   setMembers={setMembers}
                   members={members}
                />
            ))
        }

      </ScrollView>


      
    </View>
  )
}


const LikesHeader = ({ navigation }) => (
    <View
      style={{
        ...flexBoxBasic,
        justifyContent:'flex-start',
        width:size-20,
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
        New message
      </Text>

      <Button
        mode={"text"}
        textColor={colors.color1}
        icon={'message'}
        style={{
          marginVertical:10,
          position:'absolute',
          right:-10,
        }}
      >
        Chat
      </Button>


    </View>
  );

export default NewChat