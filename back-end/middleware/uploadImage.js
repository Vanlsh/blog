import multer from "multer";

const storage = multer.diskStorage({
  destination: (_, __, cd) => {
    cd(null, "uploads");
  },
  filename: (_, file, cd) => {
    file.originalname = Date.now() + "_" + file.originalname;
    cd(null, file.originalname);
  },
});

export const upload = multer({ storage });
