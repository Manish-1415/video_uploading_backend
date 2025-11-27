import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // temporary local folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

export const upload = multer({ storage });


// diskStorage is a storage to store a file temporarily , and inside we writing rules for files like whats the name , where the file should stay , so storage means creating rules for a file to where to store & how to store thats it.