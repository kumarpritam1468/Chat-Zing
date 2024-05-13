const jwt = require('jsonwebtoken');

const generateJwtSetCookie = async (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JSWT_SECRET_KEY, {
        expiresIn: '15d'
    });

    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true, // Prevents XSS attacks
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'developement'
    })
}

module.exports = generateJwtSetCookie;