const { Message } = require('../models');

const MessageController = {
 async getAllUserMessages(req, res) {
  try {
   const { userId } = req.params;
   console.log('Fetching messages...');

   const messages = await Message.findAll({
    where: {
     userID: userId,
    },
   });

   console.log('Messages fetched successfully');

   res.status(200).send(messages);
  } catch (error) {
   res.status(500).send({
    error: 'An error occurred while fetching the messages',
   });
  }
 },
};

module.exports = MessageController;
