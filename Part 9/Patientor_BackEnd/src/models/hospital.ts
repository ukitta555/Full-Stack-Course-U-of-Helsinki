import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema({
  id: Number,
  name: String,
  location: String,
});

const hospitalModel = mongoose.model('Hospital', hospitalSchema);

export default hospitalModel;