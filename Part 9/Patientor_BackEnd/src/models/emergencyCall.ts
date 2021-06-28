import mongoose from 'mongoose';

const emergencyCallSchema = new mongoose.Schema({
  id: Number,
  urgency: Number,
  date: String,
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient"
  }
});

const emergencyCallModel = mongoose.model('emergencyCall', emergencyCallSchema);

export default emergencyCallModel;