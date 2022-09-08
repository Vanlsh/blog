import multer from "multer";

const storage = multer.diskStorage({
  destination: (_, __, cd) => {
    cd(null, "uploads");
  },
  filename: (_, file, cd) => {
    cd(null, Date.now() + "_" + file.originalname);
  },
});

export const upload = multer({ storage });
