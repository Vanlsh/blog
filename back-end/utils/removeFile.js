import fs from "fs";

export const removeFile = (imageUrl) => {
  if (imageUrl) {
    const fileName = imageUrl.split("/").slice(-1);
    fs.unlink(`./uploads/${fileName}`, (error) => {
      console.log(error);
      return false;
    });
    return true;
  }
  return false;
};
