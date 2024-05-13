const User = require('../models/userModel.js');

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

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const newUser = new User({
            fullName,
            userName,
            password,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        });

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            userName: newUser.userName,
            profilePic: newUser.profilePic
        })
    } catch (error) {
        console.error(error);
    }
}

module.exports = { logIn, logOut, signUp };