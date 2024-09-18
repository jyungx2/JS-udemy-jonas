'use strict';

// 167. Coding Challenge #4

// TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1. Loop over the 'dogs' array and for each dog, calculate the recommended food portion and
// add it to the object as a new property.(recFood)

const calcRecfoodportion = function (dogs) {
  dogs.forEach(dog => {
    return (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28));
  });
};
calcRecfoodportion(dogs);
console.log(dogs);

// 2. Find Sarah's dog and log to the console whether it's eating too much or too little.
const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(sarahDog);

const calcAmountisOK = function (dog) {
  if (dog.curFood > dog.recommendedFood) {
    console.log(`Your dog is eating too much!`);
  } else {
    console.log(`Your dog is eating too little!`);
  }
};
calcAmountisOK(sarahDog); // Your dog is eating too much!

// 3.
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(eatTooLittleDog => eatTooLittleDog.owners);

console.log(ownersEatTooLittle); // ['Alice', 'Bob', 'Michael']

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .map(dog => dog.owners)
  .flat();
console.log(ownersEatTooMuch); //  ['Matilda', 'Sarah', 'John']

// 4. Log a string to the console for each array created in 3.
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too Much!`);

// 5. Log to the console whether there's any dog eating exactly the amount of food that is recommended
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood)); // false

// 6. Log to the console whether there's any dog eating an okay amount of food
console.log(
  dogs.some(
    dog =>
      dog.curFood > dog.recommendedFood * 0.9 &&
      dog.curFood < dog.recommendedFood * 1.1
  )
); // true;

// 7. Create an array containing the dogs that are eating an okay amount of food
const okayFedDogs = dogs.filter(
  dog =>
    dog.curFood > dog.recommendedFood * 0.9 &&
    dog.curFood < dog.recommendedFood * 1.1
);
console.log(okayFedDogs); //  { weight: 8, curFood: 200, owners: ['Matilda']}

// 8. Create a shallow copy of the 'dogs' array and sort it by recommended food portion in an "ascending order"
const shallow = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);

/*
// 1)
const calcRecfoodportion = function (dogs) {
  dogs.forEach(function (dog) {
    dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
    // 🔮 The Math.trunc() static method returns the integer part of a number
    // by removing any fractional digits.

    return dog.recommendedFood;
  });
};
calcRecfoodportion(dogs);
console.log(dogs); // recommendedFood가 각각의 dog object에 추가
// 어레이를 받아들이는 함수를 만들어 굳이 각각의
// 오브젝트들을 다 안써줘도 적용되어 편리하다 -> forEach라는 콜백 함수 사용!
// 오브젝트 안의 프라퍼티(weight)를 사용해야 하기 때문에 dog.weight라는 코드를 써야함
// >> for of loop는 단지 element value만을 사용할 수 있고, 오브젝트 안의
// 프라퍼티같은 상세한 밸류는 사용할 수 없기 때문에 for(const [i, mov] of array) {}
// for of가 아닌, forEach 함수를 불러와, 이 함수의 파라미터를 dog로 설정해
// dog의 상세한 정보(프라퍼티=weight)를 불러올 수 있다.

// 👉 어레이안의 여러 개의 오브젝트 안의 프라퍼티를 다뤄야 할 때, 추가하거나, 계산하거나..
// forEach 함수를 불러와 각각의 오브젝트 안의 프라퍼티를 사용하도록 한다.
// for of 루프는 오브젝트, 어레이 상에서 각각 이용할 수 있지만, forEach와 같은
// 새로운 파라미터를 설정할 수 있는 콜백함수 형태가 아니라, 단순히 index number와
// element만을 이용해 루프를 돌릴 수 있는 방법이기 때문에, dog에 .을 찍을 수 없다.
// dog(element)에 .을 찍어야 하는, object에 프라퍼티를 추가하는(ex. dog.'newpropertyname')
// 이러한 복잡한 작업은 forEach함수를 불러온다!

// 🌟 어떤 object안의 key에 점을 찍어서 밸류를 사용해야 하는 정교한 작업
// => forEach라는 콜백함수가 어레이 안의 element를 파라미터로 불러옴으로써 가장 큰 어레이에 루프를 씌움.
// 🌟 그냥 array / object 안의 element(key/value), index number를 사용하여 단순히 루프를 돌릴 땐,
// =>
// for (const [i, mov] of dogs.entries()) {}
// for (const [key, value] of Object.entries(dog)) {}
// for (const [key, {any1: , any2: }] of Object.entries(dog)) {}

// 2) Find Sarah's dog and log to the console whether it's eating too much
// or too little.
const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(sarahDog);

const calcAmountisOK = function (dog) {
  if (dog.curFood > dog.recommendedFood) {
    console.log('Your dog is eating too much!');
  } else {
    console.log('Your dog is eating too little!');
  }
};

calcAmountisOK(sarahDog); // Your dog is eating too much!

// 3) Create an array containing all owners of dogs who eat too much
// 'ownersEatTooMuch' and an array with all owners of dogs who eat
// too little 'ownersEatTooLittle'.
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .map(dog => dog.owners)
  .flat();
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

// 4) Log a string to the console for each array created in 3,
console.log(`"${ownersEatTooMuch.join(' and ')} eat too much!"`);
console.log(`"${ownersEatTooLittle.join(' and ')} eat too little!"`);

// 5) Log to the console whether there is any dog eating exactly
// the amount of food that is recommended (just true or false)
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

// 6)
const checkEatingOk = dog =>
  dog.curFood <= dog.recommendedFood * 1.1 &&
  dog.curFood >= dog.recommendedFood * 0.9;
console.log(dogs.some(checkEatingOk));

// 7)
const okayFedDogs = dogs.filter(checkEatingOk);
console.log(okayFedDogs);

// 8)
console.log(dogs.slice().sort((a, b) => a.recommendedFood - b.recommendedFood));
*/
