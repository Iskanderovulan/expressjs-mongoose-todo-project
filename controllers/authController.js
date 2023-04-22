import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Auth from '../models/Auth.js';

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Auth.findOne({ email });
        if (!user) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }
        const match = await bcrypt.compare(password, user.hash_pass);
        if (!match) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ email: user.email, userId: user._id }, process.env.JWT_SECRET);
        res.status(200).send({ token, message: 'Login success' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Login error' });
    }
};

export { loginUser };