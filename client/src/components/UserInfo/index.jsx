import React from "react";
import { URL_BACK_END } from "../../config.js";
import { Avatar, CardHeader } from "@mui/material";

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  const date = new Date(additionalText);
  const randomColor = () => {
    const hex = Math.floor(Math.random() * 0xffffff);
    return "#" + hex.toString(16);
  };
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][date.getMonth()];

  const newDate = date.getDay() + " " + month + " " + date.getFullYear();
  return (
    <CardHeader
      avatar={
        <Avatar
          sx={{ bgcolor: randomColor() }}
          src={avatarUrl && `${URL_BACK_END}/api${avatarUrl}`}
        >
          {!avatarUrl && fullName[0]}
        </Avatar>
      }
      title={fullName}
      subheader={newDate}
    />
  );
};
