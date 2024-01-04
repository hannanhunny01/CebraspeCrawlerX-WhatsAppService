const mongoose = require('mongoose')

const vestUnbSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,

    },

    link_to_site: {
        type: String,
        required:true,

    },
    items_on_site:[{
        date: String,
        name: String,
        link: String
      }],
    items_on_site_number: {
        type: Number,
       default:0

    },
    sendMessageEmail:{
      
      type: Boolean,
      default:false,
  }
  ,
  sendMessagePhone:{
    
      type: Boolean,
      default:false,
  }
  ,
  sendMessageTelegram:{
    
      type: Boolean,
      default:false,
  }
  ,

    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]

  });

  vestUnbSchema.pre('save', function(next) {
    if (this.isNew) {
      this.sendMessageEmail = this.items_on_site.length;
      this.sendMessagePhone = this.items_on_site.length;
      this.sendMessageTelegram = this.items_on_site.length;
      this.items_on_site_number = this.items_on_site.length;

    }
    if(this.users.length == 0){
      this.sendMessageEmail = this.items_on_site.length;
      this.sendMessagePhone = this.items_on_site.length;
      this.sendMessageTelegram = this.items_on_site.length;
      this.items_on_site_number = this.items_on_site.length;


    }
    next();
  });

  const VestUnb = mongoose.model('VestUnb', vestUnbSchema);

module.exports = VestUnb;