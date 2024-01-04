const mongoose = require('mongoose')

const concursoSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,

    },
    vagas: {
        type: String,
        required:false,
    },

    remuneracao: {
        type: String,
        required:false,
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

  concursoSchema.pre('save', function(next) {
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

  const Concurso = mongoose.model('Concurso', concursoSchema);

module.exports = Concurso;