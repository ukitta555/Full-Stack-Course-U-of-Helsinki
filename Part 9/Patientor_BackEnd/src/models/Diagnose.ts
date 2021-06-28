import mongoose from 'mongoose';

const diagnoseSchema = new mongoose.Schema({
  id: Number,
  name: String,
  latin: String
});

const diagnoseModel = mongoose.model('Diagnose', diagnoseSchema);

export default diagnoseModel;