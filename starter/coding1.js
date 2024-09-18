// 148. Coding Challenge #1
'use strict';

const juliaData = [3, 5, 2, 12, 7];
const kateData = [4, 1, 15, 8, 3];

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCopy = dogsJulia.slice(1, 3); // [5, 2]
  const dogs = dogsJuliaCopy.concat(dogsKate); // [5, 2, 4, 1, 15, 8, 3]

  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};

checkDogs(juliaData, kateData);

/*
// 선생님 코드
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice(); // dogJulia를 펼친 것
  dogsJuliaCorrected.splice(0, 1); // 0번째 (첫번째 강아지) 제거
  dogsJuliaCorrected.splice(-2); // 뒤에서부터 첫번째, 두번째 강아지 제거 => [5, 2]
  // dogsJulia.slice(1, 3); // [5, 2] (same result)
  const dogs = dogsJuliaCorrected.concat(dogsKate);
  console.log(dogs);

  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`"Dog number ${i + 1} is an adult, and is ${dog} old"`);
    } else {
      (`"Dog number ${i + 1} is still a puppy 🐶"`);
    }
  });
};
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
*/
