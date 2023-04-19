import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { colors, defaultStyle, flexBoxBasic } from "../style/style";
import * as ImagePicker from "expo-image-picker";

const CameraComponent = ({ navigation, route }) => {

  
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [base,setBase]=useState(false);
  const [mediaType,setMediaType] =useState("Images");
  
 
  const imagePicker = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      return alert("please grant permission");
    }

    const data = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
      base64:base,
      mediaTypes:mediaType,
    });

    



    if (route.params?.EditProfile)
      return navigation.navigate("EditProfile", {
        image: data.assets[0].uri,
      });

    if (route.params?.register)
      return navigation.navigate("Register", {
        image: data.assets[0].uri,
      });

    if (route.params?.addPost)
      return navigation.navigate("AddPost", {
        image: data.assets[0].uri,
      });

      if (route.params?.addVideoPost)
      return navigation.navigate("AddVideoPost", {
        video: data.assets[0].uri,
      });

      if (route.params?.ChatBox)
      return navigation.navigate("ChatBox", {
        ...route.params,
        image: base ? data.assets[0].base64 : data.assets[0].uri,
        imageUrl:data.assets[0].uri,
      });

  };

  const clickPicture=async()=>{
    const data = await camera.takePictureAsync();

    if (route.params?.EditProfile)
    return navigation.navigate("EditProfile", {
      image: data.uri,
    });

  if (route.params?.register)
    return navigation.navigate("Register", {
      image: data.uri,
    });

  if (route.params?.addPost)
    return navigation.navigate("AddPost", {
      image: data.uri,
    });
  }


  useEffect(()=>{

    if(route.params?.base){
      setBase(true);
    }

  },[route.params?.base])

  useEffect(()=>{

    if(route.params?.addVideoPost){
      setMediaType("Videos");
    }

  },[route.params?.addVideoPost])

  useEffect(() => {
    (async () => {
        const {status} =await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === false)
    return (
      <View style={defaultStyle}>
        <Text>No access to camera</Text>
      </View>
    );

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Camera
        style={{
          flex: 1,
          aspectRatio:1,
        }}

        type={type}
        ratio={"1:1"}
        ref={(e) => setCamera(e)}
      />

      <View
        style={{
          ...flexBoxBasic,
          justifyContent: "space-evenly",
          position: "absolute",
          bottom: 10,
          width: "100%",
        }}
      >
        <MyIcon icon={"image"} handler={imagePicker} />
        <MyIcon icon={"camera"} handler={clickPicture}/>
        <MyIcon
          icon={"camera-flip"}
          handler={() =>
            setType((prevType) =>
              prevType === CameraType.back ? CameraType.front : CameraType.back
            )
          }
        />
      </View>
    </View>
  );
};

const MyIcon = ({ icon, handler }) => (
  <TouchableOpacity onPress={handler}>
    <Avatar.Icon
      style={{
        backgroundColor: colors.color1,
      }}
      icon={icon}
      size={40}
    />
  </TouchableOpacity>
);

export default CameraComponent;
