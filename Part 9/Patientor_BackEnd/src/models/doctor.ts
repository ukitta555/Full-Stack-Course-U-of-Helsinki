import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  occupation: {
    type: String
  },
  experience: {
    type: Number
  },
  hospital: {
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital'
    }
  }
});

const DoctorModel = mongoose.model('Doctor', schema);

export default DoctorModel;