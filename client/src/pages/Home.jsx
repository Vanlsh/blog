import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchPosts, fetchTags } from "../redux/slices/posts";
import { Box } from "@mui/material";

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);
  const [value, setValue] = React.useState("new");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const isPostsLoading = posts.status === "loading" || posts.status === "error";
  const isTagsLoading = tags.status === "loading" || posts.status === "error";

  React.useEffect(() => {
    dispatch(fetchPosts(value));
    dispatch(fetchTags());
  }, [value]);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={value} onChange={handleChange}>
        <Tab label="New" value={"new"} />
        <Tab label="Popular" value={"popular"} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid elevation={1} xs={12} sm={12} lg={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((post, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={index}
                post={post}
                isEditable={userData?._id === post.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={0} sm={0} lg={4} item>
          <Box sx={{ display: { xs: "none", sm: "none", lg: "block" } }}>
            <TagsBlock items={tags.items} isLoading={isTagsLoading} />
            <CommentsBlock />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
