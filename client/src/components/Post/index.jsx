import React from "react";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { Link } from "react-router-dom";
import { UserInfo } from "../UserInfo";
import { PostSkeleton } from "./Skeleton";
import { fetchRemovePost } from "../../redux/slices/posts";
import { URL_BACK_END } from "../../config.js";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";

export const Post = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();
  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => {
    if (window.confirm("Are you sure?")) dispatch(fetchRemovePost(id));
  };
  return (
    <Card
      sx={{
        maxWidth: "100%",
        mb: 2,
        "&:hover": {
          background: "dark",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        {isEditable && (
          <Box
            sx={{
              position: "absolute",
              top: 3,
              right: 3,
              backgroundColor: "",
              "&:hover": {
                backgroundColor: "primary",
              },
            }}
          >
            <Link to={`/posts/${id}/edit`}>
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton onClick={onClickRemove} color="secondary">
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
        {imageUrl && (
          <CardMedia
            component="img"
            height="100%"
            image={`${URL_BACK_END}/api${imageUrl}`}
            alt="Paella dish"
          />
        )}
      </Box>
      <UserInfo {...user} additionalText={createdAt} />
      <CardContent sx={{ pt: 0 }}>
        <Typography variant="h4" sx={{ color: "black", fontWeight: 500 }}>
          {isFullPost ? (
            title
          ) : (
            <Link
              style={{ color: "black", textDecoration: "none" }}
              to={`/posts/${id}`}
            >
              {title}
            </Link>
          )}
        </Typography>
        <Stack direction="row" spacing={1}>
          {tags.map((tag) => (
            <Link
              style={{
                color: "black",
                textDecoration: "none",
                color: "gray",
              }}
              to={`/tags/${tag}`}
            >
              {`#${tag}`}
            </Link>
          ))}
        </Stack>
        {children && <Box>{children}</Box>}
        <CardActions sx={{ mt: 1 }}>
          <Stack direction="row" spacing={2}>
            <Stack alignItems={"center"} direction="row" spacing={1}>
              <EyeIcon sx={{ height: "20px", color: "gray" }} />
              <Typography sx={{ fontSize: "15px", color: "gray" }}>
                {viewsCount}
              </Typography>
            </Stack>
            <Stack alignItems={"center"} direction="row" spacing={1}>
              <CommentIcon sx={{ height: "15px", color: "gray" }} />
              <Typography sx={{ fontSize: "15px", color: "gray" }}>
                {commentsCount}
              </Typography>
            </Stack>
          </Stack>
        </CardActions>
      </CardContent>
    </Card>
  );
};
