import React from "react";
import { URL_BACK_END } from "../../config.js";
import { Avatar, CardHeader } from "@mui/material";
import { getRandomColor, getData } from "../../helper/View";

const randomColor = getRandomColor();

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  const newDate = getData(additionalText);

  return (
    <CardHeader
      avatar={
        <Avatar
          sx={{ bgcolor: randomColor }}
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
