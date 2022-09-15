import React from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Post } from "../components/Post";

export const PostTags = () => {
  const { tag } = useParams();
  const [posts, setPosts] = React.useState("");
  const [postsLoading, setPostsLoading] = React.useState(true);
  const userData = useSelector((state) => state.auth.data);

  React.useEffect(() => {
    axios
      .get(`/posts`, { params: { tag } })
      .then((res) => {
        setPosts(res.data);
        setPostsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Ops something wrong ");
      });
  }, []);
  return (
    <>
      <Typography variant="h2" component="h3">
        # {tag}
      </Typography>
      {(postsLoading ? [...Array(5)] : posts).map((post, index) =>
        postsLoading ? (
          <Post key={index} isLoading={true} />
        ) : (
          <Post
            key={index}
            post={post}
            isEditable={userData?._id === post.user._id}
          />
        )
      )}
    </>
  );
};
