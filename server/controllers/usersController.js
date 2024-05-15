const User = require("../models/userModel");

const getUsers = async (req, res) => {
    try {
        // const loggedInUserId = req.user._id;
        const allUsers = await User.find().select("-password");
        
        res.status(200).json(allUsers);
    } catch (error) {
        req.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = getUsers;