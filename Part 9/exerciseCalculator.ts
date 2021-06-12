interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

console.log(process.argv[2])

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
      return currentValue ? (accumulator + 1) : (accumulator)
    }, 0),
    success: (average > target),
    rating,
    ratingDescription,
    target,
    average
  }
}


const target = Number(process.argv[2]);

if (!target) {
  throw new Error("bruh numeric input!");
}

let dailyExercises = [];
let i = 2;
while (process.argv[++i]) {
  if (isNaN(Number(process.argv[i]))) {
    throw new Error ("bruh numeric input!");
  }
  dailyExercises.push(Number(process.argv[i]));
}

console.log(calculateExercises(dailyExercises, target))