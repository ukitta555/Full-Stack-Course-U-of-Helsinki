interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}


interface ErrorResult {
  error: string
}

const calculateExercises = (dailyExercises: Array<number>, target: number): Result => {
  let average;
  if (dailyExercises.length) {
    average = dailyExercises.reduce((accumulator, currentHours) => accumulator + currentHours, 0) / dailyExercises.length;
  }
  else {
    throw new Error("Daily exercise array is empty");
  }

  let rating;
  let ratingDescription;
  if (target / average >= 2) {
    rating = 1;
    ratingDescription = 'Bad performance. Half of target wasn\'t reached';
  }
  else if (target / average > 1) {
    rating = 2;
    ratingDescription = 'Average performance. Half of target was reached, but the target wasn\'t';
  }
  else {
    rating = 3;
    ratingDescription = 'Great performance. Target was reached';
  }
  return {
    periodLength: dailyExercises.length,
    trainingDays: dailyExercises.reduce((accumulator, currentValue) => {
      return currentValue ? (accumulator + 1) : (accumulator);
    }, 0),
    success: (average > target),
    rating,
    ratingDescription,
    target,
    average
  };
};


export const parseApiArguments = (args: Record<string, unknown>): Result | ErrorResult => {
  if (args) {
    if (!args.daily_exercises || args.target === undefined) {
      return { error: "parameters missing" };
    }
    else if (
      Array.isArray(args.daily_exercises)
      && args.daily_exercises.length > 0
      && !args.daily_exercises.some((ex: unknown) => (typeof ex !== 'number') || (typeof ex === 'number' && ex < 0))
      && typeof args.target === 'number'
      && args.target > 0
      ) {
        return calculateExercises(args.daily_exercises, args.target);
    }
    else return { error: "malformatted parameters" };
  }
  else return { error: "parameters missing" };
};

const parseArguments = (args: Array<string>): Result | ErrorResult => {
  if (args.length >= 4) {

    if (!args[2]) {
      return { error: "parameters missing" };
    }

    const target = Number(process.argv[2]);

    if (!target) {
      return { error: "malformatted parameters" };
    }

    const dailyExercises = [];
    let i = 2;
    while (args[++i]) {
      if (isNaN(Number(args[i]))) {
        return { error: "malformatted parameters" };
      }
      dailyExercises.push(Number(process.argv[i]));
    }

    if (dailyExercises.length === 0) {
      return { error: "parameters missing" };
    }
    console.log(calculateExercises(dailyExercises, target));
  }
  return { error: "This function should be called in console mode only!" };
};

parseArguments(process.argv);

