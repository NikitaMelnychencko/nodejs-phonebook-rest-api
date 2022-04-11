const { Schema, model } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const contactSchema = new Schema( {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
  });
contactSchema.plugin(mongoosePaginate);

const Contact = model('contact', contactSchema)
module.exports = Contact
