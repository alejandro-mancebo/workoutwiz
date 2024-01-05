
const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds


// Function the return the different days between two dates
export const getDiffenceDays = (fromDate, untilDate) => {

  const firstDate = new Date(fromDate);
  const secondDate = new Date(untilDate);

  return Math.round(Math.abs((firstDate - secondDate) / oneDay));
};

// Function that calcule the date after adding a number of weeks 
export const addingDays = (initialDate, weeks) => {

  const firstDate = new Date(initialDate).getTime();

  return new Date(firstDate + weeks * 7 * 24 * 60 * 60 * 1000);

};

// Function that return exercise duration base on the respetions and sets
export const exerciseDuration = (reps, sets) => {
  const timePerRep = 5 / (60 * 60); // time in hours
  const restBetweenSets = 60 / (60 * 60); // time in hours
  return (reps * sets * timePerRep) + (restBetweenSets * (sets - 1));
}

// Function that return calories burned base on the exercise duration and weight lift
export const caloriesBurned = (exerciseDuration, weight) => {

  const met = 5; // Metabolic Equivalent of Task

  // weight (in kg) exerciseDuration (in hours)
  return met * weight * exerciseDuration;
}


