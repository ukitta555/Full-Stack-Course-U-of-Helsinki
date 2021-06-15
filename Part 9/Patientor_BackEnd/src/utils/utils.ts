import { Gender, NewPatientEntry } from "./types";

export type NewPatientEntryFields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown
};

const isString = (field: unknown): field is string => {
  return typeof field === 'string' || field instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (field: any): field is Gender => {
  return Object.values(Gender).includes(field);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error(`Not a valid name: ${name}`);
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Not a valid date: ${date}`);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Not a valid gender: ${gender}`);
  }
  return gender;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Not a valid ssn: ${ssn}`);
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Not a valid occupation: ${occupation}`);
  }
  return occupation;
};

export const createNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: NewPatientEntryFields): NewPatientEntry => {
  const newPatient: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    ssn: parseSSN(ssn),
    occupation: parseOccupation(occupation)
  };
  return newPatient;
};