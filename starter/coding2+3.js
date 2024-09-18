'use strict';

// 154. Coding Challenge #2

const ages1 = [5, 2, 4, 1, 15, 8, 3];
const ages2 = [16, 6, 10, 5, 6, 1, 4];

// let averageHumanAge = 0;

const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(dogAge =>
    dogAge <= 2 ? 2 * dogAge : 16 + 4 * dogAge
  );
  console.log(humanAges); // [36, 4, 32, 2, 76, 48, 28]

  const adultAges = humanAges.filter(humanAge => humanAge >= 18);
  console.log(adultAges); // [36, 32, 76, 48, 28]

  //   adultAges.forEach(adultAge => (averageHumanAge += adultAge));
  //   return (averageHumanAge = averageHumanAge / adultAges.length); // 44

  const averageHumanAge =
    adultAges.reduce((acc, cur) => acc + cur, 0) / adultAges.length;

  const average = adultAges.reduce(
    (acc, cur, i, arr) => acc + cur / arr.length,
    0
  );
  return averageHumanAge, average;
};
const avg1 = calcAverageHumanAge(ages1);
const avg2 = calcAverageHumanAge(ages2);
console.log(avg1, avg2); //  44 47.333333333333336

// 156. Coding Challenge #3
// Use arrow function and chaining method!
const calcAverageHumanAge2 = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + 4 * age))
    .filter(humanAge => humanAge >= 18) // [36, 32, 76, 48, 28]
    .reduce((acc, humanAge, i, arr) => acc + humanAge, 0) / arr.length; // 220 / 5 = 44

const avg3 = calcAverageHumanAge2(ages1);
const avg4 = calcAverageHumanAge2(ages2);
console.log(avg3, avg4);

/*
// 💥 You should use an arrow function and chaining.
const avg1 = calcAverageHumanAge1(ages1);
const avg2 = calcAverageHumanAge1(ages2);
console.log(avg1, avg2); //  44 47.333333333333336

const calcAverageHumanAge2 = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
// this is actually really "the only way of calculating" the average now.
// 💥The 'adults' variable doesn't exist anywhere, so we have to use arr parameter.💥
// therefore we need to take the length from arr input(fourth parameter).
// Again, This is the only way in which we can now calculate this average.

const avg3 = calcAverageHumanAge2(ages1);
const avg4 = calcAverageHumanAge2(ages2);
console.log(avg3, avg4);
*/
