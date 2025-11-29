import multer from "multer";

const storage = multer.diskStorage({  // this diskStorage is our own disk
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // temporary local folder in our diskStorage
    // the fisrst null is err obj which we manually set null in here is simply 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

export const upload = multer({ storage });


// diskStorage is a storage to store a file temporarily , and inside we writing rules for files like whats the name , where the file should stay , so storage means creating rules for a file to where to store & how to store thats it.