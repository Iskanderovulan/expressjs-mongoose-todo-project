import { check } from 'express-validator';

const validateRegistration = [
    check('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 5, max: 20 })
        .withMessage('Name length should be between 5 and 20 characters')
        .matches(/^[a-z]+$/)
        .withMessage('Name should only contain lowercase letters'),
    check('email')
        .isEmail().withMessage('Invalid email')
    ,
    check('password')
        .isLength({ min: 6, max: 15 })
        .withMessage('Password length is between 6 and 15 letters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .withMessage('Password should contain at least one uppercase letter, one lowercase letter, one digit, and one symbol'),
];

export { validateRegistration };