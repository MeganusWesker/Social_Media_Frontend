import Toast from 'react-native-toast-message';
import { useEffect } from 'react'
import { useSelector } from 'react-redux';


export const useMessageAndErrorUser=(navigation,dispatch,navigationTo)=>{
    const {loading,error,message} =useSelector(state=>state.user);

  

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
      
          navigation.reset({
            index:0,
            routes: [{ name: navigationTo }],
          });
      
          dispatch({
            type:"clearMessage"
          })
        }
      
      },[error,message,dispatch]);

      return loading;
}


export const useMessageAndErrorUserWithoutNavigating=(dispatch)=>{
  const {error,message} =useSelector(state=>state.user);


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

}

export const useMessageAndErrorPostWithoutNavigating=(dispatch)=>{
  const {error,message} =useSelector(state=>state.post);


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

}