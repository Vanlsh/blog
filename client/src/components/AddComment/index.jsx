import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../redux/slices/comment";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { URL_BACK_END } from "../../config.js";
import { getRandomColor } from "../../helper/View";

const randomColor = getRandomColor();

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
    <Grid
      elevation={0}
      container
      spacing={1}
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      sx={{ p: "15px 15px 0 15px" }}
    >
      <Grid item xs={"auto"}>
        <Avatar
          sx={{ bgcolor: randomColor }}
          src={user.avatarUrl && `${URL_BACK_END}/api${user.avatarUrl}`}
        >
          {user.fullName[0]}
        </Avatar>
      </Grid>
      <Grid item xs>
        <TextField
          sx={{ mb: "10px" }}
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
      </Grid>
    </Grid>
  );
};
