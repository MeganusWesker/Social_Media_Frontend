import { StyleSheet, Platform, StatusBar } from "react-native";



export const colors = {
    color1: "rgba(151, 28, 255, 0.51)",
    color1_light: "rgba(227,25,99,1)",
    color1_light2: "rgba(199,0,73,0.8)",
    color2: "white",
    color3: "rgb(45,45,45)",
    color4: "transparent",
    color5: "#f2f2f2",
    color6: "#f7f7f7",
    color7:"rgba(217, 199, 208, 0.8)",
    color8:'rgba(39, 39, 39, 0.27)',
    color9: "#c70049",
};

export const defaultStyle = StyleSheet.create({
    padding: 25,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: colors.color2,
});

export const flexBoxBasic=StyleSheet.create({

          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center", 
});


export const textInputStyling=StyleSheet.create({
    fontSize:16,
    borderBottomWidth:1,
    borderBottomColor:colors.color8,
    fontWeight:"500",
    fontSize:14,
    color:colors.color3,

});

export const defaultImg ="https://p.kindpng.com/picc/s/451-4517876_default-profile-hd-png-download.png";