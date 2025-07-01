import multer, { diskStorage } from "multer";

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/tmp"); 
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;

    cb(null, fileName);
  },
});

export const upload = multer({ storage });

// storage = diskStorage({ destination , filename })
//destination ==> where you want to upload image