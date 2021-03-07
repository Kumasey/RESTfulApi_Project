const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
},
{
        timestamps: true
});

const Contact = module.exports = mongoose.model('contact', contactSchema);
module.exports.get = (callback, limit) => {
    Contact.find(callback).limit(limit);
}