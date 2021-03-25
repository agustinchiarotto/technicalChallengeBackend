const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let AddressSchema = Schema({
  state: String,
  city: String,
  street: String,
  streetNumber: Number,
});

const ContactSchema = Schema({
  name: String,
  company: String,
  profile_image: String,
  email: {
    type: String,
    unique: true,
  },
  birtdate: Date,
  phone_number: String,
  address: AddressSchema,
});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;
