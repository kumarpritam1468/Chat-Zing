const Conversation = require('../models/conversationModel.js');
const Message = require('../models/messageModel.js');
const { getSocketReceiver, io } = require('../socket/socket.js');

const sendMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const { message } = req.body;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        const socketReceiverid = getSocketReceiver(receiverId);

        if(socketReceiverid){
            // Used to send events to specific client
            io.to(socketReceiverid).emit('newMessage', newMessage);
        }

        res.status(200).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getMessage = async (req, res) => {
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants:{$all:[senderId, userToChatId]}
        }).populate("messages"); // Actual message instead of reference

        if(!conversation){
            return res.status(200).json([]);
        }
        res.status(200).json(conversation.messages);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { sendMessage, getMessage };