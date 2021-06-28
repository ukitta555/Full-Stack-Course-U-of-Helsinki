import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
import mongoose from 'mongoose';
import hospitalRouter from './routes/hospitals';
import callRouter from './routes/emergencyCall';
import doctorsRouter from './routes/doctors';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb+srv://ukitta555:milkyway12345@cluster0.lweag.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useUnifiedTopology: true })
  .then(() => { console.log('Connected to MongoDB'); })
  .catch((error) => { console.log(`Error while connection to Mongo. Error message: ${error.message}`); });

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/ping', (_request, response) => {
  response.send('pong');
});

app.use('/api/callRouter', callRouter);
app.use('/api/hospitals', hospitalRouter);
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);
app.use('/api/doctors', doctorsRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});