import { v2 as cloudinary } from 'cloudinary';
import { UploadedFile } from 'express-fileupload';
import { unlink } from 'fs/promises';
import { existsSync } from 'fs';
import dotenv from 'dotenv';
dotenv.config();

// Validate Cloudinary configuration
const validateCloudinaryConfig = () => {
  // const requiredEnvVars = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
  // const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  // if (missingVars.length > 0) {
  //   throw new Error(`Missing Cloudinary environment variables: ${missingVars.join(', ')}`);
  // }

  console.log('Cloudinary configuration:', {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? '****' : undefined,
    api_key: process.env.CLOUDINARY_API_KEY ? '****' : undefined,
    api_secret: process.env.CLOUDINARY_API_SECRET ? '****' : undefined,
  });
};

// Configure Cloudinary
validateCloudinaryConfig();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (file: UploadedFile): Promise<string> => {
  try {
    // Validate file existence
    if (!existsSync(file.tempFilePath)) {
      throw new Error('Temporary file does not exist');
    }

    // Log file details for debugging
    console.log('Attempting to upload file to Cloudinary:', {
      name: file.name,
      size: file.size,
      mimetype: file.mimetype,
      tempFilePath: file.tempFilePath,
    });

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'pencil_arts',
      resource_type: 'image',
    });

    // Clean up temporary file
    try {
      await unlink(file.tempFilePath);
      console.log('Temporary file deleted:', file.tempFilePath);
    } catch (unlinkError) {
      console.error('Failed to delete temp file:', unlinkError);
    }

    return result.secure_url;
  } catch (error: any) {
    // Log detailed error
    console.error('Cloudinary upload error:', {
      message: error.message,
      name: error.name,
      http_code: error.http_code,
      stack: error.stack,
    });

    // Clean up temporary file even on error
    try {
      await unlink(file.tempFilePath);
      console.log('Temporary file deleted on error:', file.tempFilePath);
    } catch (unlinkError) {
      console.error('Failed to delete temp file:', unlinkError);
    }

    throw new Error(`Failed to upload to Cloudinary: ${error.message || 'Unknown error'}`);
  }
};