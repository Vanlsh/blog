import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Post } from "../components/Post";
import { AddComment } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { selectIsAuth } from "../redux/slices/auth";
import axios from "../axios";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
  const [post, setPost] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const isAuth = useSelector(selectIsAuth);
  const { id } = useParams();
  React.useEffect(() => {
    axios
      .get(`/post/${id}`)
      .then((res) => {
        setPost(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Ops something wrong ");
      });
  }, [id]);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post post={post} isFullPost>
        <ReactMarkdown children={post.text} />
      </Post>
      <CommentsBlock items={post.comments} isLoading={false}>
        {isAuth ? <AddComment id={post._id} /> : ""}
      </CommentsBlock>
    </>
  );
};
