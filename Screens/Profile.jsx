import { View, Text, Dimensions, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useRef,forwardRef, useState, useEffect } from "react";
import Footer from "../Components/Footer";
import { colors, defaultImg, defaultStyle, flexBoxBasic } from "../style/style";
import Loader from "../Components/Loader";
import { Avatar, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../redux/actions/userAction";
import { useMessageAndErrorUser } from "../utils/customHooks";
import Toast from 'react-native-toast-message';

// const user = {
//   userName: "Meganus420",
//   _id:"kdjfkd93847837483",
//   name: "MeganusWesker",
//   bio: "professional & Villian",
//   postsNumber: 40,
//   followersNumber: 60,
//   followingNumber: 50,
//   likesNumber: 40,
//   avatar: {
//     public_id: "deildfkdj34834",
//     url: "https://assets.mycast.io/actor_images/actor-albert-wesker-129687_large.jpg?1601199635",
//   },

//   posts:[
//     {
//         public_id:"dkjfrdkkfjddkjfkd",
//         _id:"kdjfjdjfdjf389483883",
//         url:"https://i.pinimg.com/originals/21/6a/52/216a52c8b9991aa073463baba1138f26.jpg"
//     },

//     {
//         public_id:"dkjfrdkkfjddkjfkd",
//         _id:"kdjfjdjfdjf3894838df83",
//         url:"https://i.pinimg.com/originals/21/6a/52/216a52c8b9991aa073463baba1138f26.jpg"
//     },

//     {
//         public_id:"dkjfrdkkfjddkjfkd",
//         _id:"kdjfjdjfdjf38948388gfg3",
//         url:"https://i.pinimg.com/originals/21/6a/52/216a52c8b9991aa073463baba1138f26.jpg"
//     },

//     {
//         public_id:"dkjfrdkkfjddkjfkdfdd",
//         _id:"kdjfjdjfdjf3894838833hg",
//         url:"https://hard-drive.net/wp-content/uploads/2021/02/wesker.jpg.webp"
//     },

//     {
//         public_id:"dkjfrdkkfjddkjfkdfdd",
//         _id:"kdjfjdjfdj33hg",
//         url:"https://hard-drive.net/wp-content/uploads/2021/02/wesker.jpg.webp"
//     },
//   ],

//   likedPosts:[
//     {
//         public_id:"dkjfrdkkfjddkjfkdfdd",
//         _id:"kdjfjdjfdj33ddffdhg",
//         url:"https://w0.peakpx.com/wallpaper/164/470/HD-wallpaper-lucifer-morningstar-fashion-design-flash-graphy.jpg"
//     },

//     {
//         public_id:"dkjfrdkkfjddkjfkdfd33d",
//         _id:"kdjfjdjfdj33hg",
//         url:"https://i.pinimg.com/originals/64/6c/03/646c03a0be0cdce260625cf1c0a1bc63.jpg"
//     },


//   ],
// };




const size = Dimensions.get("screen").width;

const Profile = ({ navigation }) => {
  
  const horiziontalScrollView=useRef();

 

  const dispatch=useDispatch();

 const {user,loading,error,message,totalLikes} =useSelector(state=>state.user);


 


  const [visible,setVisible] =useState(false);
  const [gridIcon,setGridIcon] =useState('grid');
  const [bookmarkIcon,setBookmarkIcon] =useState('bookmark-outline');

  const [gridLine,setGridLine] =useState(colors.color1);
  const [bookMarkLine,setBookMarkLine] =useState(colors.color2);

 

  const horizontalScrollGetter=(e)=>{

    
    if(e.nativeEvent.contentOffset.x>=size/2){
      setGridLine(colors.color2);
      setBookMarkLine(colors.color1);
      setBookmarkIcon('bookmark');
      setGridIcon('grid-off');
    }

    if(e.nativeEvent.contentOffset.x<=(size/2)-20){
      setGridLine(colors.color1);
      setBookMarkLine(colors.color2);
      setBookmarkIcon('bookmark-outline');
      setGridIcon('grid');
    }
  }


  const moveScrollViewToCollage=()=>{
    horiziontalScrollView.current.scrollTo({x:0});
  }

  const moveScrollViewToFavourite=()=>{
    horiziontalScrollView.current.scrollTo({x:size-50});
  }

  const logoutHandler=async()=>{
    await dispatch(logOutUser());
   await dispatch({type:"cleanState"});
   dispatch({type:"CleanState"});
    navigation.reset({
      index:0,
      routes: [{ name:"Login" }],
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

  return (loading===undefined || loading===true)? (
    <Loader />
  ) : (
    <>

    {
      visible && (
        <View
        style={{
          backgroundColor:colors.color2,
          elevation:5,
          borderRadius:10,
          padding:20,
          height:200,
          width:200,
          zIndex:5,
          position:"absolute",
          top:80,
          right:40,
        }}
    >

      <TouchableOpacity
        onPress={()=>setVisible(false)}
        activeOpacity={0.5}
      >

        <Avatar.Icon
          icon={'close'}
          size={35}
          style={{
            backgroundColor:colors.color2,
            position:'absolute',
            right:-20,
            top:-20,
          }}

          color={colors.color3}
        
        />

      </TouchableOpacity>

      <Button
        mode={"text"}
        textColor={colors.color1}
        icon={'pencil'}
        style={{
          marginVertical:10,
        }}

        onPress={()=>navigation.navigate('ChangePassword')}
      >

        Change Password

      </Button>

      <Button
        mode={"delete"}
        textColor={colors.color3}
        icon={'pencil'}
        style={{
          marginVertical:10,
        }}
      >

       DeleteProfile

      </Button>

      <Button
        mode={"delete"}
        textColor={colors.color3}
        icon={'logout'}
        style={{
          marginVertical:10,
        }}

        onPress={logoutHandler}
      >

       Logout

      </Button>

    </View>
      )
    }

     
    
  
      <View
        style={{
          ...defaultStyle,
        }}
      >
        <ProfileHeader user={user} navigation={navigation} handler={()=>setVisible((prev)=>!prev)} />

    

        <View
          style={{
            alignItems: "center",
            paddingVertical: 15,
          }}
        >
          <Avatar.Image
            size={size / 3}
            source={{ uri: user.avatar.url !==null ? user.avatar.url :defaultImg }}
            style={{
              backgroundColor: colors.color1,
            }}
          />

          <Text
            style={{
              fontWeight: "700",
              paddingVertical: 5,
            }}
          >
            {user.name}
          </Text>

          <Text
            style={{
              fontWeight: "700",
              color: colors.color7,
            }}
          >
            {user.bio}
          </Text>
        </View>

        <View
          style={{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            paddingVertical:8,
          }}
        >

            <View
             
                style={{
                    padding:4,
                    alignItems:'center',
                    
                }}
            >

                <Text
                
                style={{
                    fontWeight: "500",
                    color: colors.color1,
                  }}
                
                >{user.posts.length}</Text>

                <Text
                
                style={{
                    fontWeight: "900",
                    color:colors.color3,
                  }}
                
                >Posts</Text>

           

            </View>

            <View
                  style={{
                    backgroundColor:colors.color7,
                    height:30,
                    width:1.5,
                    
                  }}
                >

                </View>

            
            <View
             
                style={{
                    padding:4,
                    alignItems:'center',

                }}
            >

                <Text
                
                style={{
                    fontWeight: "500",
                    color: colors.color1,
                  }}
                
                >{user.followers.length}</Text>

                <Text
                
                style={{
                    fontWeight: "900",
                    color:colors.color3,
                  }}
                
                
                >Followers</Text>

            </View>

            <View
                  style={{
                    backgroundColor:colors.color7,
                    height:30,
                    width:1.5,
                    
                  }}
                >

                </View>

            
            <View
             
                style={{
                    padding:4,
                    alignItems:'center',

                }}
            >

                <Text
                
                style={{
                    fontWeight: "500",
                    color: colors.color1,
                  }}
                
                >{user.following.length}</Text>

                <Text
                
                style={{
                    fontWeight: "900",
                    color:colors.color3,
                  }}
                
                >Following</Text>

            </View>

            <View
                  style={{
                    backgroundColor:colors.color7,
                    height:30,
                    width:1.5,
                    
                  }}
                >

                </View>


            
            <View
             
                style={{
                    padding:4,
                    alignItems:'center',
                }}
            >

                <Text
                
                style={{
                    fontWeight: "500",
                    color: colors.color1,
                  }}
                
                >{totalLikes}</Text>

                <Text
                
                style={{
                    fontWeight: "900",
                    color:colors.color3,
                  }}
                
                >Likes</Text>

            </View>
        </View>



        <View
        
        style={{
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"space-evenly",
        }}
        
        >

   


              <Button
                icon={'pencil'}
                mode="outlined"
                textColor={colors.color1}
                style={{
                borderColor:colors.color1,
                  borderRadius:12,
                }}

                onPress={()=>navigation.navigate('EditProfile',{user})}
           >

            Edit Profile
              
           </Button>

          
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
        >

       

        <View
        
        style={{
          ...flexBoxBasic,
          justifyContent:"space-evenly",
            paddingVertical:5,
        }}
        
        >

            <View
          
            >

          
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={moveScrollViewToCollage}
            >

                <Avatar.Icon
                
                icon={gridIcon}
                size={45}
                color={colors.color1}
                style={{
                   backgroundColor:colors.color2
                }}
                
                
                />

            </TouchableOpacity>

            <View
            
              style={{
                backgroundColor:gridLine,
                height:1,
                marginTop:-5,
              }}
             
            >

            </View>

            </View>

            <View>

           

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={moveScrollViewToFavourite}
            >

                <Avatar.Icon
                
                icon={bookmarkIcon}
                size={45}
                color={colors.color1}
                style={{
                   backgroundColor:colors.color2
                }}
                
              
                
                />

            </TouchableOpacity>

            <View
              style={{
                backgroundColor:bookMarkLine,
                height:1,
                marginTop:-5,
              }}

            
            >

            </View>


            </View>


        </View>



        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={horiziontalScrollView}
          onScroll={horizontalScrollGetter}
        >

            <View
              style={{
                flexDirection:'row',
                justifyContent:'space-around',
                flexWrap:"wrap",
                width:size-50,
                paddingBottom:50, 
                
                
              }}
            >



                {user.posts && user.posts.map((item)=>(
                    <PhotoCollage
                     
                      id={item._id}
                      key={item._id}
                      image={item.image?.url}
                      navigation={navigation}
                    />
                ))}


            </View>

            <View
              style={{
                flexDirection:'row',
                justifyContent:'space-around',
                flexWrap:"wrap",
                width:size-50,
                paddingBottom:50, 
              }}
            >



                {user.likedPosts?.map((item,i)=>(
                    <PhotoCollage
                     
                      id={item._id}
                      key={item._id}
                      image={item.image.url}
                      
                    />
                ))}


            </View>

        </ScrollView>



        </ScrollView>


       

      </View>



      <Footer activeRoute={"profile"} />
    </>
  );
};

const ProfileHeader = ({ user, navigation,handler }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.5}>
      <Avatar.Icon
        icon={"chevron-left"}
        size={45}
        style={{
          backgroundColor: colors.color2,
        }}
        color={colors.color3}
      />
    </TouchableOpacity>

    <Text
      style={{
        fontWeight: "800",
      }}
    >
      {user.userName}
    </Text>

    <TouchableOpacity activeOpacity={0.5} onPress={handler}>
      <Avatar.Icon
        icon={"dots-horizontal"}
        size={45}
        style={{
          backgroundColor: colors.color2,
        }}
        color={colors.color3}
      />
    </TouchableOpacity>
  </View>
);

const PhotoCollage=({id,image,navigation})=>(

    <TouchableOpacity
      onPress={()=>navigation.navigate('Post',{postId:id})}
      activeOpacity={0.5}

    >

        <View
        
        style={{
            marginVertical:4,
            
        }}
        
        >

     
            <Image
                source={{
                    uri:image
                }}

                style={{
                    resizeMode:'contain',
                    height:100,
                    width:100,
                    borderRadius:5,
                }}
            
            />

       </View>

    </TouchableOpacity>
);

export default Profile;
