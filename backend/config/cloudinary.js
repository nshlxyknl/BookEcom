const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();


// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage configuration
// const imgstorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "img_uploads", // Folder in cloudinary
//     resource_type: "image",  // important for PDFs (not images)
//     allowed_formats: ["jpg", "png", "jpeg"]
//     // format: async (req, file) => "pdf", // Force PDF format
//     // public_id: (req, file) => Date.now(), // Unique name
//   },
// });



// const pdfstorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "pdf_uploads", // Folder in cloudinary
//     resource_type: "raw",  // important for PDFs (not images)
//     allowed_formats: ["pdf"]
//     // format: async (req, file) => "pdf", // Force PDF format
//     // public_id: (req, file) => Date.now(), // Unique name
//   },
// });


const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isImage = file.mimetype.startsWith("image/");
    const isPdf = file.mimetype === "application/pdf";

    return {
      folder: isImage ? "img_uploads" : isPdf ? "pdf_uploads" : "others",
      resource_type: isPdf ? "raw" : "image",
      public_id: file.originalname.split(".")[0],
    };
  },
});

const uploadBoth = multer({ storage });


module.exports = { cloudinary , uploadBoth};
