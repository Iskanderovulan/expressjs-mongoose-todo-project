import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
import { multerError } from './multerError.js';

dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up Cloudinary storage engine for Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: null,
        // allowed_formats: ['jpg', 'jpeg', 'png'],
        allowed_formats: null,
        // transformation: [{ width: 500, height: 500, crop: 'limit' }],
        transformation: null
    },
    filename: function (req, file, cb) {
        console.log('Uploading file:', file.originalname);
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    try {
        if (file.mimetype.startsWith('image/')) {
            console.log('Image file detected:', file.originalname);
            cb(null, true);
        } else {
            console.log('Non-image file detected:', file.originalname);
            cb(new Error('Only images are allowed'), false);
        }
    } catch (error) {
        cb(error, false);
    }
}

// Set up Multer middleware
export const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter,
    onError: multerError

}).single('todoImage');

