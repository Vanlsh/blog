import React from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { Typography, Grid } from "@mui/material";
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
  console.log(posts);
  return (
    <>
      <Typography variant="h2" component="h3">
        # {tag}
      </Typography>

      {(postsLoading ? [...Array(5)] : posts).map((obj, index) =>
        postsLoading ? (
          <Post key={index} isLoading={true} />
        ) : (
          <Post
            key={index}
            id={obj._id}
            title={obj.title}
            imageUrl={obj.imageUrl}
            user={obj.user}
            createdAt={obj.createdAt}
            viewsCount={obj.viewsCount}
            commentsCount={obj.comments.length}
            tags={obj.tags}
            isEditable={userData?._id === obj.user._id}
          />
        )
      )}
    </>
  );
};
