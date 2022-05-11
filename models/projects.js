const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  author: String,
  description: String,
  date: { type: Date, default: Date.now },
  active: {
    type: Boolean,
    default: true,
  },
});
module.exports = mongoose.model('Project', projectSchema);
