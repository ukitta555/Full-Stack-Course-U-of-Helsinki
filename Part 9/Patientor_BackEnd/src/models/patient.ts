import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  id: Number,
  name: String,
  passportID: String,
  occupation: String,
  gender: String,
  dateOfBirth: String,
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital'
  },
  diagnose: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Diagnose'
  }
});

const patientModel = mongoose.model('Patient', patientSchema);

export default patientModel;