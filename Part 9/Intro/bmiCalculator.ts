export enum LaunchConfig {
  Console = 0,
  Api = 1
}

export interface BMIResponse {
  weight: number,
  height: number,
  bmi: string
}

export interface BMIErrorResponse {
  error: string
}

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) ** 2);
  switch (true) {
    case (bmi <= 18.5):
      return 'Not normal (weight lower than usual)';
    case (bmi > 18.5 && bmi < 25):
      return 'Normal (normal weight)';
    case (bmi >= 25):
      return 'Not normal (weight highier than usual)';
  }
  return 'Unexpected error happened. Math has gone crazy.';
};


export const parseArguments = (args: Array<string>, launchConfig: LaunchConfig): BMIResponse | BMIErrorResponse => {
  if (launchConfig === LaunchConfig.Console) {
    if (args.length === 4) {
      const height = Number(args[2]);
      const weight = Number(args[3]);
      if (isNaN(height) || isNaN(weight)) {
        return { error: "malformed parameters" };
      }
      if (height <= 0 || weight <= 0) {
        return { error: "malformed parameters" };
      }
      const bmiRes = calculateBmi(height, weight);
      return {
        bmi: bmiRes,
        weight,
        height
      };
    }
    return { error: "Wrong number of arguments."};
  }
  else if (launchConfig === LaunchConfig.Api) {
    if (args.length === 2) {
      const height = Number(args[0]);
      const weight = Number(args[1]);
      if (isNaN(height) || isNaN(weight)) {
        return { error: "malformed parameters" };
      }
      if (height <= 0 || weight <= 0) {
        return { error: "malformed parameters" };
      }
      const bmiRes = calculateBmi(height, weight);
      return {
        bmi: bmiRes,
        weight,
        height
      };
    }


    return { error: "Wrong number of arguments."};
  }
  else return {error: "You can call BMI calculator only in console mode or API mode."};
};

parseArguments(process.argv, LaunchConfig.Console);