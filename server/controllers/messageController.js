const Conversation = require('../models/conversationModel.js');
const Message = require('../models/messageModel.js');

const sendMessage = async (req, res) => {
    try {
        const {id: receiverId} = req.params;
        const {message} = req.body;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: {$all:[senderId, receiverId]}
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(200).json(newMessage);
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
}

module.exports = sendMessage;