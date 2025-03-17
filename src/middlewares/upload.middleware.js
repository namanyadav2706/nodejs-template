import multer from "multer";
import fs from 'fs';

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = '';

        if (file.mimetype.startsWith('image/')) {
            folder = 'images'; // Store images in 'uploads/images'
        } else if (file.mimetype.startsWith('video/')) {
            folder = 'videos'; // Store videos in 'uploads/videos'
        } else if (file.mimetype === 'application/pdf') {
            folder = 'resume'; // Store PDFs in 'uploads/pdfs'
        } else {
            return cb(new Error('Unsupported file type'), false); // Reject unsupported file types
        }

        // Make sure the folder exists or create it
        const dir = './uploads/' + folder
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true }); // Create folder if it doesn't exist
        }
        cb(null, dir)
    },
    filename: (req, file, cb) => {
        const name = new Date().toISOString().replace(/:/g, '_').replace(/\s+/g, '_') + file.originalname.replace(/\s+/g, '_');


        cb(null, name);
    }
});

export const uploadFile = multer({
    storage: storageConfig
});