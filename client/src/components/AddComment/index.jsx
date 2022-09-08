import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../redux/slices/comment";
import styles from "./AddComment.module.scss";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

export const AddComment = ({ id }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.data);
  const [comment, setComment] = React.useState("");

  const sendComment = async () => {
    if (comment) {
      const fields = {
        id,
        comment,
      };
      await dispatch(createComment(fields));
      setComment("");
    } else {
      alert("Comment can not be empty");
    }
  };
  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src={user.avatarUrl} />
        <div className={styles.form}>
          <TextField
            label="Write comment"
            variant="outlined"
            maxRows={10}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            multiline
            fullWidth
          />
          <Button onClick={sendComment} variant="contained">
            Send
          </Button>
        </div>
      </div>
    </>
  );
};
