import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SideBlock } from "./SideBlock";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  List,
  Skeleton,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { fetchPostComments, fetchComments } from "../redux/slices/comment";

export const CommentsBlock = ({ children }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { comments, loading } = useSelector((state) => state.comment);
  const userData = useSelector((state) => state.auth.data);
  const isCommentLoading = loading === "loading";
  React.useEffect(() => {
    if (id) {
      dispatch(fetchPostComments(id));
    } else {
      dispatch(fetchComments(id));
    }
  }, []);

  return (
    <SideBlock title="Comments">
      {children}
      <List>
        {(isCommentLoading ? [...Array(5)] : comments).map((obj, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {isCommentLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} />
                )}
              </ListItemAvatar>
              {isCommentLoading ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <React.Fragment>
                  <ListItemText
                    primary={obj.user.fullName}
                    secondary={obj.comment}
                  />
                  {obj.user._id === userData?._id && (
                    <React.Fragment>
                      <Link to={"/"}>
                        <IconButton color="primary">
                          <EditIcon />
                        </IconButton>
                      </Link>
                      <IconButton
                        onClick={() => console.log("")}
                        color="secondary"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </SideBlock>
  );
};
