const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
  title: String,
  description: String,
  ProjectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, 'Required the Project id!!'],
  },
  date: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Task', projectSchema);
