import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostComments } from "../../redux/slices/comment";
import { TextField, Grid, Button, Stack } from "@mui/material";
import axios from "../../axios";
import { useParams } from "react-router-dom";

export const EditComment = ({ commentId, prevComment, setEditId }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [comment, setComment] = React.useState(prevComment);

  const editComment = async () => {
    if (comment) {
      await axios.patch(`/comments/${commentId}`, { comment });
      dispatch(fetchPostComments(id));
      setEditId("");
    } else {
      alert("Comment can not be empty");
    }
  };
  return (
    <Grid container mb={1} ml={9} spacing={1}>
      <Grid item xs={9}>
        <TextField
          label="Write comment"
          variant="outlined"
          maxRows={10}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          multiline
          fullWidth
        />
      </Grid>
      <Grid ml={1} item xs={9}>
        <Stack spacing={2} direction="row">
          <Button onClick={editComment} variant="contained">
            Edit
          </Button>
          <Button onClick={() => setEditId("")} variant="text">
            Cancel
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};
