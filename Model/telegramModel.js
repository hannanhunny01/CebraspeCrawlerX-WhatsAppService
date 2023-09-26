const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
  chatId: {
    type: String,  
    required: true,
    unique:true,
  },

  verificationCode: {
    type: String,
    required: true,
    unique:true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, 
  },
});

const TelegramSaver = mongoose.model('TelegramSaver', verificationSchema);

module.exports = TelegramSaver;