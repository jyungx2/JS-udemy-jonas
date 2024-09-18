'use strict';

// 142. Simple Array Methods

let arr = ['a', 'b', 'c', 'd', 'e'];
// 📍 SLICE (원하는 위치를 짤라서 데이터 획득)
console.log(arr.slice(2)); // ['c', 'd', 'e']
console.log(arr.slice(2, 4)); // ['c', 'd']
console.log(arr.slice(0, 3)); // ['a', 'b', 'c']
console.log(arr.slice(-2)); // ['d', 'e']
console.log(arr.slice(-1)); // ['e']
console.log(arr.slice(1, -2)); // ['b', 'c'];
console.log(arr.slice(0, 3)); // ['a', 'b', 'c']

// In order to create a 💫shallow copy💫,
// Should I use slice method or spread operator?
// 👉 That is actually entirely up to me!
console.log(arr.slice()); // ['a', 'b', 'c', 'd', 'e']⭐️
console.log([...arr]); // ['a', 'b', 'c', 'd', 'e']⭐️
// The only time you really need to use the slice method
// is when you want to chain multiple methods together.
// calling one after the other.

// 📍 SPLICE (데이터 삭제 or 교체 or 추가)
// : slice method와 다르게 해당 밸류를 기존 어레이에서 없애는 방법
// 1️⃣ firts parameter: works the same as in the slice method
// 2️⃣ second parameter: the number of elements that we want to delete.
// Ex)
// splice(1, 2) => 두번째 자리부터 2개의 밸류를 출력하고, 💥이 값들을 기존 어레이에서 없앤다💥
// slice(1, 2) => 두번째 자리만 출력하고, 기존 어레이는 변함이 없다.

// 1. 데이터 삭제
console.log(arr.splice(2)); // ['c', 'd', 'e'] : slice처럼 2부터.
console.log(arr); // ['a', 'b']
// ⭐️ 하지만 slice method랑 다르게 기존 어레이에서 사라지게 된다.⭐️
arr.splice(-1); // console 씌우면 ['e'] 로 출력.
console.log(arr); // ['a', 'b', 'c', 'd']

// 2. slice와 비교! => 기존 어레이의 Mutation 여부의 차이.
console.log(arr.slice(1, 2)); // ['b']
console.log(arr.splice(1, 2)); // ['b', 'c']
// 💥b와 c를 기존 array에서 지운다!💥 (<=> slice는 반대로 출력하기만 하고 기존 어레이는 그대로 냅둔다)
console.log(arr); // ["a", "d", "e"]
console.log(arr.splice(2, 3)); // ['e'] << [a, d, e] 에서 2는 e이고, 그 뒤의 값은 존재하지 않기 때문.
console.log(arr); // ["a", "d"] 💥e를 기존 array에서 지운다!💥

// 4. 데이터 교체가 아닌, 단순 추가 => 두번째 변수를 0으로
console.log(arr.splice(1, 0, 'hello', 'world')); // splice()로 데이터 추가시, 두번째 변수를 0으로 주자!! (교체개수 = 0 : 추가할 거라는 의미)

// 5. 데이터 교체
console.log(arr.splice(1, 2, 'hello', 'world', 'ME')); // 교체개수와 교체대상의 개수가 꼭 맞지 않아도 됨!! (2 =/= 3)

// 📍 REVERSE
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); // ['f', 'g', 'h', 'i', 'j']
console.log(arr2); // ['f', 'g', 'h', 'i', 'j']
// ⭐️ Important thing: 💥orginal is also mutated💥 after it's reversed.

// 📍 CONCAT
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]); // same result
// ⭐️ Both of them 💥don't mutate💥 any of the involved arrays.(original)
// Once again, it's just a matter of personal preference.
// whether you prefer to use the spread opertaor, or the concat method.

// 📍 JOIN
console.log(letters.join(' - ')); // a - b - c - d - e - f - g - h - i - j

// 143. The new At Method
const arr1 = ['a', 23, 11, 64];
console.log(arr1[0]); // a
console.log(arr1.at(0)); // a

// getting last array element
console.log(arr1[arr1.length - 1]); // arr[3] = 64
console.log(arr1.slice(-1)); // [64] 🌟
console.log(arr1.slice(-1)[0]); // 64
console.log(arr1.at(-1)); // 64
console.log(arr1[-1]); // undefined => 마지막 요소 얻고 싶을 땐, at method가 적절함!
// Should I use new At method or should I keep using the
// brackets notation? >> As awlays, it depends.

// 👉 If you want to get to the ✨last element✨ of an array, or
// basically start ✨counting from the end of an array✨,
// then you should probably start using the At method.
// Also, if you want to do something called ✨"method chaining"✨,
// then the At Method is also perfect for that.
// >> ✨mutiple methods를 동시에 사용하는 경우✨엔 At method가 더 적절.

// 👉 하지만 반대로, if you just want to quickly get a value from an array,
// so just like the first element, then of course you can keep
// using the brackets notation.

console.log('jonas'.at(0)); // j
console.log('jonas'.at(-1)); // s

// 144. Looping Arrays: forEach(💥) method
// 1. Ep.46 - for-of (Looping string) : condition 필요한 for loop
// ex) for (let i = 0; i < array.length; rep++) {}

// 2. Ep.111 - for-of (Looping arrays): condition 불필요한 for of loop
// ex) for (const element of array) {}
// ex) for (const [i, element] of array.entries()) {}   💥index first💥

// 3. Ep.114 - for-of (Looping object)
// ex) for (const [key, value] of Object.entries(object)) {}

// ❓ for-of loop(💫)와의 다른점이 무엇일까? 🌟🌟🌟    💥elements first💥
// 1. for-of는 array/object 상관없이 쓸 수 있지만, forEach loop는 object상에서 쓸 수 없다. (object =\= iteration)
// 2. The forEach syntax is shorter and easier to read, which is why some developers prefer it.
// 3. for-of loops are generally faster than forEach because they don’t have the overhead of
// calling a function for each element. However, this difference is usually negligible
// unless you’re working with very large arrays.

// -> 결론: 모든 element를 건드리지 않을 때는, 웬만하면 for-of loop 써라.
// Because forEach method will always loop over the entire array
// 1. Only use the for-each loop when you want to loop through 💥all the values💥 in an array or list.
// If you only want to loop through 💫part of an array or list💫 use a for-of loop instead.
// 2. Also use a for-of loop instead of a for-each loop
// if you want to 💫change any of the values💫 in the array or list.
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for-of loop + entries method
// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`); // math function(taking an absolute value)
  }
}

for (const [i, mov] of movements.entries()) {
  if (mov > 0) {
    console.log(`Movements ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movements ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
}

// 📍 forEach method is technically a higher order function which requires a callback function.
// => forEach method who calls this callback function in each iteration.
console.log('--- FOREACH ---');
movements.forEach(function (mov, i, array) {
  // ❗️ forEach method의 파라미터 순서 ❗️
  // - first one is always current element (mov)
  // - second one: current index, (i)
  // - thrid one: entire array (arr)
  // ☝️ for-of loop의 entries method는 index number가 먼저, element가 두번째였다!
  // 순서를 꼭 기억하자 중요⭐️⭐️
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`); // math function(taking an absolute value)
  }
});
// 0: function(200) movements라는 어레이 안에 있는 0번째 값이 익명의 함수의
// 파라마터 자리에 넣어져서 출력된다! 이때 함수는 forEach method쓸 때 써줘야함.
// 1: function(450)
// 2: function(400)
// ...

movements.forEach((mov, i, arr) => {
  if (mov > 0) {
    console.log(`Movements ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movements ${i + 1}: YOu withdrew ${Math.abs(mov)}`);
  }
});

// ❌ 1가지 fundamental difference between two of them is
// 💫you cannot break out of a forEach loop.💫
// >> continue & break statements don't work in a forEach loop at all.
// >> forEach will always loop over the ✨entire array✨
// 따라서 만약 루프 밖에서 break할 필요가 있다면, for-of loop을 사용해야 하지만, ❌
// but other than that, it really comes down to your personal preference.

// 145. forEach With Maps and Sets

// Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
console.log(currencies);
// Map(3) {'USD' => 'United States dollar', 'EUR' => 'Euro', 'GBP' => 'Pound sterling'}

// 📌 forEach method on maps
// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });
// USD: United States dollar / EUR: Euro / GBP: Pound sterling

currencies.forEach((value, key, map) => {
  console.log(`${key} : ${value}`);
});

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique); // {'USD', 'GBP', 'EUR'}

// 📌 forEach method on sets
// currenciesUnique.forEach(function (value, _, map) {
//   console.log(`${value}: ${value}`);
// });

currenciesUnique.foeEach((value, _, set) => {
  console.log(`${value}: ${value}`);
});

// set에는 key가 존재하지 않기 때문에 언더바(_)로 나타내주고, 이 언더바는 JS에서 throwaway variable이라 부른다.
// USD: USD / GBP: GBP / EUR: EUR
