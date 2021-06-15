import patientsData from '../data/patients';
import {v1 as uuid} from 'uuid';
import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../utils/types';

export const getPatients = (): NonSensitivePatientEntry[] => {
  const patients = patientsData.map (
    ({id, name, dateOfBirth, gender, occupation}) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    })
  );
  return patients;
};

export const createPatient = (patientData: NewPatientEntry): PatientEntry => {
  const id = uuid();
  const patientEntryWithId: PatientEntry = {
    id,
    ...patientData
  };
  patientsData.push(patientEntryWithId);
  return patientEntryWithId;
};