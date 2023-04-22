import multer from "multer";

const multerError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Multer error
        console.log(err.message)
        res.status(400).send({ error: { message: 'File upload error: ' + err.message } });
    } else if (err instanceof Error) {
        // Other error
        console.log(err.message)
        res.status(400).send({ error: { message: err.message } });
    } else {
        next(err);
    }
};
export { multerError }