// utils/cloudinaryUploads1.js
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🔹 Upload buffer file(s) to Cloudinary
export const uploadFilesToCloudinary = async (files, folder = "") => {
  const urls = [];

  for (const file of files) {
    if (!file.buffer) continue;

    const result = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream(
          {
            folder,
            resource_type: "raw", 
          },
          (err, res) => {
            if (err) {
              console.error("Cloudinary upload error:", err);
              reject(err);
            } else {
              resolve(res);
            }
          }
        )
        .end(file.buffer);
    });

    // ✅ sirf secure_url hi push kar rahe hain
    urls.push(result.secure_url);
  }

  return urls; // 👉 ["https://res.cloudinary.com/.../raw/upload/v123/careers_cv/filename.pdf"]
};

// 🔹 Delete files from Cloudinary
export const deleteFilesFromCloudinary = async (urls, folder = "") => {
  for (const url of urls) {
    try {
      if (!url) continue;

      // URL example:
      // https://res.cloudinary.com/xxx/raw/upload/v123/careers_cv/filename.pdf
      const afterUpload = url.split("/upload/")[1]; // v123/careers_cv/filename.pdf
      const withoutVersion = afterUpload.split("/").slice(1).join("/"); // careers_cv/filename.pdf
      const publicId = withoutVersion.replace(/\.[^/.]+$/, ""); // careers_cv/filename

      await cloudinary.v2.uploader.destroy(publicId, {
        resource_type: "raw",
      });
    } catch (err) {
      console.error("Cloudinary delete error:", err);
    }
  }
};
