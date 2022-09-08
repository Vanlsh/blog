import React from "react";
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
import { EditComment } from "./EditComment";
import { fetchPostComments, fetchComments } from "../redux/slices/comment";
import axios from "../axios";

export const CommentsBlock = ({ children }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { comments, loading } = useSelector((state) => state.comment);
  const userData = useSelector((state) => state.auth.data);
  const isCommentLoading = loading === "loading";
  const [editId, setEditId] = React.useState("");

  React.useEffect(() => {
    if (id) {
      dispatch(fetchPostComments(id));
    } else {
      dispatch(fetchComments());
    }
  }, []);

  const editComments = (commentId) => {
    if (editId === commentId) {
      setEditId("");
    } else {
      setEditId(commentId);
    }
  };

  const deleteComments = (commentId) => {
    axios
      .patch(`/comments/delete/${commentId}`, { postId: String(id) })
      .then((req, res) => {
        dispatch(fetchPostComments(id));
      });
  };

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
                  {obj.user._id === userData?._id && id && (
                    <React.Fragment>
                      <IconButton
                        onClick={() => editComments(obj._id)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => deleteComments(obj._id)}
                        color="secondary"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </ListItem>
            {editId === obj?._id && (
              <EditComment
                commentId={obj?._id}
                prevComment={obj.comment}
                setEditId={setEditId}
              />
            )}
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </SideBlock>
  );
};
