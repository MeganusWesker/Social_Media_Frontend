import { colors } from "../style/style";

export const toggleColor = (toggleBorderColor,setToggleBorderColor,iconColor,setIconColor) => {
    toggleBorderColor === colors.color8
      ? setToggleBorderColor(colors.color1)
      : setToggleBorderColor(colors.color8);
       iconColor === colors.color8
      ? setIconColor(colors.color1)
      : setIconColor(colors.color8);
};

export const dateCalculator = (postDate) => {
  const yearDifference =
    new Date().getFullYear() - new Date(postDate).getFullYear();

  const monthDifference =
    new Date().getMonth() - new Date(postDate).getMonth();

  const dayDifference = new Date().getDate() - new Date(postDate).getDate();

  const hoursDifference =
    Number(new Date().toLocaleTimeString().split(":")[0]) -
    Number(new Date(postDate).toLocaleTimeString().split(":")[0]);

  const mintuesDifference =
    Number(new Date().toLocaleTimeString().split(":")[1]) -
    Number(new Date(postDate).toLocaleTimeString().split(":")[1]);

  if (yearDifference > 0) {
    return `${yearDifference} years ago`;
  }

  if (monthDifference > 0) {
    return `${monthDifference} months ago`;
  }

  if (dayDifference > 0) {
    return `${dayDifference} days ago`;
  }

  if (hoursDifference > 0) {
    return `${hoursDifference} hours ago`;
  }

  if (mintuesDifference >= 0) {
    return `${mintuesDifference} mintues ago`;
  }

  return `just now`;
};