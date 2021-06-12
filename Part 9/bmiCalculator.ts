const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) ** 2);
  switch (true) {
    case (bmi <= 18.5):
      return 'Not normal (weight lower than usual)';
    case (bmi > 18.5 && bmi < 25):
      return 'Normal (normal weight)';
    case (bmi >= 25):
      return 'Not normal (weight highier than usual)'
  }
  return 'Unexpected error happened. Math has gone crazy.'
}

const height = Number(process.argv[2])
const weight = Number(process.argv[3])
if (isNaN(height) || isNaN(weight)) {
  throw new Error('bruh numeric input')
}
if (height <= 0 || weight <= 0) {
  throw new Error('Incorrect input. height and weight should be positive numbers')
}
console.log(calculateBmi(height, weight))