const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({message:"Unauthorized Access"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(!decoded){
            return res.status(401).json({message:"Unauthorized Access"});
        }

        const user = await User.findById(decoded.userId).select('-password');

        if(!user){
            return res.status(400).json({message:"User Not Found"});
        }

        req.user = user;

        next();
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
}

module.exports = protectRoute;