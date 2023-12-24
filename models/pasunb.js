const mongoose = require('mongoose')

const pasUnbSchema = new mongoose.Schema({
    stage_pas: {
        type: String,
        required:true,
    },

    year_pas: {
        type: Number,
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
        default:0,
       
        

    },
    sendMessageEmail:{
      
        type: Number,
        default:0,
    }
    ,
    sendMessagePhone:{
      
        type: Number,
        default:0,
    }
    ,
    sendMessageTelegram:{
      
        type: Number,
        default:0,
    }
    ,

    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  });

  pasUnbSchema.pre('save', function(next) {
    if (this.isNew) {
      this.sendMessageEmail = this.items_on_site.length;
      this.sendMessagePhone = this.items_on_site.length;
      this.sendMessageTelegram = this.items_on_site.length;
    }
    next();
  });

  const PasUnb = mongoose.model('PasUnb', pasUnbSchema);

module.exports = PasUnb;