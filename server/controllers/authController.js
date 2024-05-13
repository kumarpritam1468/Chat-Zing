const bcrypt = require('bcryptjs');
const User = require('../models/userModel.js');
const generateJwtSetCookie = require('../utils/createToken.js');

const logIn = (req, res) => {
    res.send('Login');
}

const logOut = (req, res) => {
    res.send('Log out');
}

const signUp = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const user = await User.findOne({ userName });

        if (user) {
            return res.status(400).json({ message: 'User Already Exists' });
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
                password: newUser.password,
                profilePic: newUser.profilePic
            })
        } else {
            return res.status(400).json({message: "Invalid User data"})
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = { logIn, logOut, signUp };