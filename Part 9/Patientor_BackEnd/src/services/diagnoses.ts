import diagnosesData from '../data/diagnoses.json';
import { DiagnoseEntry } from '../utils/types';


export const getDiagnoses = (): DiagnoseEntry[] => {
  const diagnoses: DiagnoseEntry[] = diagnosesData as DiagnoseEntry[];
  return diagnoses;
};

export const createDiagnose = () => {
  return 123;
};