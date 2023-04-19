import { ScrollView, View, Dimensions, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { colors, defaultImg, defaultStyle, flexBoxBasic } from "../style/style";
import { Avatar } from "react-native-paper";
import SearchItem from "../Components/SearchItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllSearchedUsers } from "../redux/actions/userAction";

const size = Dimensions.get("screen").width;

const Search = ({ navigation }) => {
  const [keyword, setKeyword] = useState("");
  const [searchBackGroundColor, setSearchBackGroundColor] = useState(
    colors.color5
  );
  const [searchBorderColor, setSearchBorderColor] = useState(colors.color5);
  const [magnifyIconColor, setMagnifyIconColor] = useState(colors.color3);

  const { searchedUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
    // # Debouncing
    if (keyword !== "") {
      const timeOutId = setTimeout(() => {
        dispatch(getAllSearchedUsers(keyword));
      }, 2000);

      return () => {
        clearTimeout(timeOutId);
      };
    }
  }, [dispatch, keyword]);

  return (
    <View
      style={{
        ...defaultStyle,
        flex: 1,
      }}
    >
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

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginVertical: 20,
          }}
        >
          {searchedUsers.map((item, i) => (
            <SearchItem
              name={item.name}
              _id={item._id}
              key={item._id}
              userName={item.userName}
              navigation={navigation}
              avatar={item.avatar.url !== null ? item.avatar.url : defaultImg}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Search;
