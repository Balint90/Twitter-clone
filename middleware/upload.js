import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        const rnd = Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname).toLowerCase();
        return cb(null, `${file.fieldname}-${Date.now()}-${rnd}${ext}`);
    }
})

export const upload = multer({ storage })