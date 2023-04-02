import { View, Text, ScrollView,Dimensions, TouchableOpacity,TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar,Button } from 'react-native-paper';
import { colors, defaultImg, defaultStyle, flexBoxBasic, textInputStyling } from '../style/style';
import { toggleColor } from '../utils/toggleFunctions';
import mime from "mime";
import { useDispatch, useSelector } from 'react-redux';
import { addPost, addVideoPost } from '../redux/actions/postAction';
import { useMessageAndErrorPostWithoutNavigating} from '../utils/customHooks';

const size = Dimensions.get("screen").width;

const AddVideoPost = ({navigation,route}) => {

    const [video,setVideo] =useState("");
    const [caption,setCaption] =useState("");
    const [toggleBorderColor,setToggleBorderColor] =useState(colors.color8);
    const [bioIconColor, setBioIconColor] = useState(colors.color8);
    const [videoChanged,setVideoChanged]=useState(false);

    const {addPostLoading} =useSelector(state=>state.post);



    const dispatch=useDispatch();

    const submitHandler=async()=>{
      const myForm = new FormData();
      myForm.append('caption',caption);
      myForm.append('file',{
        uri:video,
        type:mime.getType(video),
        name:video.split('/').pop(),
      });

      await dispatch(addVideoPost(myForm));

      navigation.navigate('Home');
    }

    useMessageAndErrorPostWithoutNavigating(dispatch);


    useEffect(() => {

      if(route.params?.video){
        setVideo(route.params.video);
        setVideoChanged(true);
      }
    }, [route.params]);

  return (
    <View
    style={{
      ...defaultStyle,
      padding: 0,
    }}
  >

    <Header navigation={navigation}/>

    <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingVertical: 50,
            borderRadius: 10,
            backgroundColor: colors.color2,
            width:size-50,
            alignSelf:"center"
          }}
        >
          <Text
            style={{
              fontWeight: "900",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            Add New Post
          </Text>

          <Text
            style={{
              fontWeight: "400",
              fontSize: 14,
              color: colors.color8,
              marginVertical: 14,
            }}
          >
           Share You're Sweet Memories with You're Friends
          </Text>

          <View
           style={{
            
        

           }}
          
          >
            <Avatar.Image
              size={size / 3}
              source={{ uri: video ? video : defaultImg }}
              style={{
                backgroundColor: colors.color1,
                alignSelf: "center",
              }}
            />

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={()=>navigation.navigate('Camera',{addVideoPost:true})}
            >

              <Avatar.Icon
              
                icon={'image-plus'}
                size={35}
                style={{
                  backgroundColor:colors.color2,
                  position:"absolute",
                  bottom:-10,
                  left:size/2.2,
                }}
                color={colors.color3}
              />

            </TouchableOpacity>
          </View>

          <View
              style={{
                ...flexBoxBasic,
                marginVertical: 10,
                ...textInputStyling,
                justifyContent: "flex-start",
                borderBottomColor: toggleBorderColor,
                marginVertical: 10,
              }}
              onFocus={() =>
                toggleColor(
                  toggleBorderColor,
                  setToggleBorderColor,
                  bioIconColor,
                  setBioIconColor
                )
              }
              onBlur={() =>
                toggleColor(
                  toggleBorderColor,
                  setToggleBorderColor,
                  bioIconColor,
                  setBioIconColor
                )
              }
            >
              <Avatar.Icon
                icon={"information"}
                size={35}
                color={bioIconColor}
                style={{
                  backgroundColor: colors.color2,
                }}
              />

              <TextInput
                placeholder="Caption"
                value={caption}
                onChangeText={setCaption}
                numberOfLines={2}
                style={{
                  width:"80%"
                }}
      
              />
            </View>

    
          <Button
            style={{
              borderRadius: 10,
              backgroundColor: colors.color1,
              marginVertical: 10,
            }}

            icon={'video-plus'}
            textColor={colors.color2}
            mode="contained"
            disabled={!videoChanged}
            loading={addPostLoading}
            onPress={submitHandler}
          >
            Add Post
          </Button>

        
        </View>
      </ScrollView>


    </View>
  )
}

const Header = ({ navigation }) => (
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
        New Post
      </Text>
    </View>
  );


export default AddVideoPost