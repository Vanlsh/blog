import React from "react";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import { Card } from "@mui/material";

export const PostSkeleton = () => {
  return (
    <Card elevation={0} sx={{ maxWidth: "100%", mb: 2, pb: 3 }}>
      <Skeleton variant="rectangular" width="100%" height={300} />
      <Stack
        alignItems={"center"}
        sx={{ m: "15px 15px 0 15px" }}
        direction="row"
        spacing={2}
      >
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" width={350} height={60} />
      </Stack>
      <Stack
        sx={{ ml: "15px" }}
        direction="column"
        justifyContent="space-between"
      >
        <Skeleton variant="text" width={406} height={60} />
        <Stack direction="row" spacing={2}>
          <Skeleton variant="text" width={50} height={25} />
          <Skeleton variant="text" width={50} height={25} />
          <Skeleton variant="text" width={50} height={25} />
        </Stack>
      </Stack>
    </Card>
  );
};
