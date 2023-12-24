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
      
        type: Boolean,
        default:false,
    }
    ,
    sendMessagePhone:{
      
        type: Boolean,
        default:false,
    }
    ,
    sendMessageEmail:{
      
        type: Boolean,
        default:false,
    }
    ,

    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  });

  const PasUnb = mongoose.model('PasUnb', pasUnbSchema);

module.exports = PasUnb;