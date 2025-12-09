// controllers/careerController.js
import Career from "../models/Career.js";
import {
  uploadFilesToCloudinary,
  deleteFilesFromCloudinary,
} from "../utils/cloudinaryUploads1.js";

// 🔹 Add Career
export const addCareer = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { name, email, phone, position, message } = req.body;
    let cvUrl = "";

    // ✅ Upload file from buffer to Cloudinary
    if (req.file) {
      const fileData = {
        buffer: req.file.buffer,
        filename: req.file.originalname,
        mimetype: req.file.mimetype,
      };

      const [uploadedUrl] = await uploadFilesToCloudinary(
        [fileData],
        "careers_cv"
      );

      console.log("Uploaded CV URL from Cloudinary =>", uploadedUrl);

      if (uploadedUrl) {
        cvUrl = uploadedUrl; // ✅ pure HTTPS Cloudinary URL string
      }
    }

    const career = await Career.create({
      name,
      email,
      phone,
      position,
      message,
      cv: cvUrl,
    });

    res.status(201).json({
      success: true,
      message: "Career form submitted successfully",
      career,
    });
  } catch (error) {
    console.error("❌ Error in addCareer:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 Get All Careers
export const getCareers = async (req, res) => {
  try {
    const careers = await Career.find().sort({ createdAt: -1 });

    const updatedCareers = careers.map((c) => ({
      ...c._doc,
      downloadLink: c.cv
        ? c.cv.replace("/upload/", "/upload/fl_attachment/")
        : "",
    }));

    res.status(200).json({ success: true, careers: updatedCareers });
  } catch (error) {
    console.error("❌ Error in getCareers:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 Get Career by ID
export const getCareerById = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career)
      return res
        .status(404)
        .json({ success: false, message: "Career not found" });

    const updatedCareer = {
      ...career._doc,
      downloadLink: career.cv
        ? career.cv.replace("/upload/", "/upload/fl_attachment/")
        : "",
    };

    res.status(200).json({ success: true, career: updatedCareer });
  } catch (error) {
    console.error("❌ Error in getCareerById:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 Delete Career
export const deleteCareer = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career)
      return res
        .status(404)
        .json({ success: false, message: "Career not found" });

    if (career.cv) {
      await deleteFilesFromCloudinary([career.cv], "careers_cv");
    }

    await Career.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Career deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error in deleteCareer:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
