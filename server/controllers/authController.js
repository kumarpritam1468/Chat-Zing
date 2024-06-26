const bcrypt = require('bcryptjs');
const User = require('../models/userModel.js');
const generateJwtSetCookie = require('../utils/createToken.js');

const logIn = async (req, res) => {
    try {
        const {userName, password} = req.body;

        const user = await User.findOne({userName});

        if(!user){
            return res.status(401).json({error: "Invalid Credentials"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password || '');

        if(!isPasswordCorrect){
            return res.status(401).json({error: "Invalid Credentials"});
        }

        generateJwtSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal Server Error"});
    }
}

const signUp = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }
        
        const user = await User.findOne({ userName });
        
        if (user) {
            return res.status(400).json({ error: 'User Already Exists' });
        }
        
        // Password Hashing
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        });
        
        if (newUser) {
            generateJwtSetCookie(newUser._id, res);
            await newUser.save();
            
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic
            })
        } else {
            return res.status(400).json({error: "Invalid User data"})
        }
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
}

const logOut = (req, res) => {
    try {
        res.cookie('jwt', '', {maxAge:0});
        res.status(200).json({message: "Logged Out Successfully"});
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
}

module.exports = { logIn, logOut, signUp };