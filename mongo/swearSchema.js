const mongoose = require("mongoose");

var swearSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId, 
    userId: { type: String},
    msg: { type: String },
    swearWords: { type: Array },
    swearCount: { type: Number },
    add_date: {type: Date, default: Date.now()}
  }, { strict: false });


module.exports = mongoose.model('swears', swearSchema);