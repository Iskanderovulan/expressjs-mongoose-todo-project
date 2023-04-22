import Auth from '../models/Auth.js';
import jwt from 'jsonwebtoken'


const verifyEmail = async (req, res) => {
    try {
        const token = req.params.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Auth.findOneAndUpdate({ email: decoded.email }, { verified: true });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        // res.status(200).json({ token, message: 'Login success' });
        return res.redirect(`http://localhost:3000/verify-email/${token}`);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error verifying email' });
    }
};


export { verifyEmail };