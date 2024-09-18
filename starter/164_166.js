'use strict';

/*
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

/*
// 164. More ways of creating and filling arrays
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));
// [1, 2, 3, 4, 5, 6, 7]

// 💡 Empty arrays + fill method
const x = new Array(7);
console.log(x); // [empty × 7]
// it creates a new array with 7 empty elements.
// weird behavior of Array function: which does it so that
// whenever we only pass in 💫1 argument, then it creates
// 💥a new empty argument with that length.💥
// => This is not really useful

// Becasue you cannot use map method on it.
// console.log(x.map(() => 5)); => ❌Nothing happened.❌
// except for 1 thing. Because there's one method we can call on this
// empty array and this is the 🌟fill method.🌟

// 1st: 채우고 싶은 숫자, 2nd: 몇번째 칸부터 채울건지, 3rd: 언제까지 채울건지(포함되지 않음)
// slice method와 비슷하다.(final index is not gonna be included in the array.)
x.fill(1, 3, 5);
console.log(x); // [empty × 3, 1, 1, empty × 2]
// just these two (3, 4 position) are filled up.

arr.fill(23, 2, 6);
console.log(arr); // [1, 2, 23, 23, 23, 23, 7]

// 💡 What if we actually wanted to create this arr array programmatically?
// 💟 Array.from : we're not using the 'from' as a method on an array.
// Instead, we're using it on the 'Array()' constructor.
// 여기서 Array는 new Array할 때에 'Array' function과 같다. (array가 아니다!)
// On this function object, we call the from() method.
const y = Array.from({ length: 7 }, () => 1);
console.log(y); // [1, 1, 1, 1, 1, 1, 1]
// >> It looks a lot nicer/cleaner than new Array function & fill method.

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z); // [1, 2, 3, 4, 5, 6, 7]
// callback function are excatly like the one in a 'map() method.'
// 내가 갖고싶은 element들로 구성되어 있는 'array'를 리턴하는..
// ex) const z = array.map(mov => mov > 0)
// = array.map(function(map) {return mov > 0})
// ❗️ _ (underscore) : means a throwaway variable.
// we don't need this current value at all. but we still have to
// define something as the first parameter cause the index that
// 💫we need is only the second parameter.💫
// But to denote that we are not using this current element,
// we simply write an underscore.

// 💡 querySelector returns something called a NodeList, which is
// something like an array. / which contains all the selected elements.
// But it's not a real array.
// It doesn't have most of the array methods like map() or reduce()...
// So 만약 NodeList상에서 array method을 불러오고 싶다면, we first need to convert
// the NodeList to an array. >> Array.from() is perfect way to do that!

// 1) We need to get them first from the user interface and
// do the calculation based on that.

// 2) ()안에는 elements that we want to convert to an array가 들어가야 함.
// 'movements__value' : this is where the value itself is stored.
// (두 개가 있는 이유는 하나는 deposit, 다른 하나는 withdrawl으로 밸류가 나눠져 있기 때문)

// We are selecting all of the elements that have this class. it's the movements of value classes.
// const movementsUI = Array.from(document.querySelectorAll('.movements__value'));
// console.log(movementsUI); // [div.movements__value, div.movements__value]

labelBalance.addEventListener('click', function () {
  // 1️⃣ We used a Array.from() to create an array from the
  // result of the querySelectorAll(), which is a NodeList,
  // which is not really an array, but an array like structure.
  // that array like structure can easily be converted to an array
  // using Array.from().

  // 2️⃣ We included a mapping function, which forms that initial
  // array to an array exactly as we want it.

  // 3️⃣ converting the raw element(el) to its text content and
  // replacing the Euro sign with nothing.
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value', el =>
      Number(el.textContent.replace('€', ''))
    )
  );
  // 📍 밑에 처럼 map method를 이용해 Array.from()방법으로 만들어놓은 real array에
  // element의 텍스트 컨텐트를 바꿀 수도 있지만, 더 좋은 코드는 위에서처럼 Array.from()의
  // 두번째 파라미터를 사용하는 것이다! el => Number(el.textContent.replace('€', ''))

  // console.log(movementsUI.map(el => Number(el.textContent.replace('€', ''))));
  console.log(movementsUI);

  // There's another way of converting querySelectorAll() to an array.
  // we can actually 🔥spread(...)🔥 the results of this querySelectorAll()
  // into an new array as well. (선생님은 위의 방법 더 선호!)
  // const movementsUI2 = [...document.querySelectorAll('.movements__value')];
});

///////////////////////////////////////////
// 166. Array Methods Practice

// 1.
// const bankDepositSum = accounts.map(acc => acc.movements).flat();
const bankDepositSum = accounts
  // 1. Getting all the different movements array out of the accounts array
  // and then putting them in one flat array.
  .flatMap(acc => acc.movements) // Exactly the same as the upper one.
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0); // 25180

console.log(bankDepositSum);

// 2.
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;
console.log(numDeposits1000); // 5 : we get five deposits over 1000.

// ❗️ We can use reduce method to basically simply count something in an array.
const numDeposits10002 = accounts
  .flatMap(acc => acc.movements)
  // .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0)
  .reduce((count, cur) => (cur >= 1000 ? count + 1 : ++count), 0);
console.log(numDeposits10002);

// 💡 Prefixed ++ operator
// ++를 왼쪽에 미리 써주면 오른쪽에 써준 것고 달리 컨솔로 불러왔을 때 바로 적용된다.
// 오른쪽에 써주면 더해진 값이 바로 출력이 안되고 "나중에 a만 따로 불러왔을 때" 적용된 값이 나타난다.
// 그래서 위의 reduce method 코드에서도 ++count라고 써준 것!
// count++ 라고 써주면 count의 초기 값(initial value를 0으로 지정해줬기 때문)인 0이 출력됨.
let a = 10;
console.log(a++); // 10
console.log(++a); // 12
console.log(a); // 12

// 3. Even more advanced case for the reduce method
// 💡 Creating a new object instead of just a number or string
// based on th reduce method.
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // 🖍️ arrow function을 써주면 value는 항상 자동으로 implicitl하게 리턴돼서
      // {}을 가지는 function body를 써주지 않고, 그냥 ()를 써줘도 됐지만, 여기서는
      // {}으로 function body를 써줬기 떄문에, 함수로부터 manually return해야 한다.
      // we have to explicitly 🚨return the accumulator(=sums)🚨 from the function.
      // return sums; 🚨🚨🚨 반드시 accumulator를 리턴해야 오류 발생하지 않음.
      //  >> object만들땐 curly braces가 필요하다는 걸 기억하자.
      // >> That's how the reduce method works.
      // 1) easy example
      cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      // 2) preferred one
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums
    },
    { deposits: 0, withdrawals: 0 } // 🖍️ object를 만들거기 때문에 {} 사용!
    // 근데 이 오브젝트는 사실 sums(=accumulator)라는 배리어블의 object이다.
    // sums obejct(accumulator)의 initial value이기 때문에!
  );
// console.log(sums); // {deposits: 25180, withdrawals: -7340}
console.log(deposits, withdrawals); // 25180 -7340

// 4.
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];
  // This words should not be capitalized. (just an example)
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
  // if the word is included in the exceptions,
  // then we want to simply return that word.
};
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
*/

/*
// 1) accumulater -> sum
// const bankDepositSum = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 0)
//   .reduce((sum, cur) => sum + cur, 0);
// console.log(bankDepositSum);

const bankDepositSum2 = accounts
  .map(acc => acc.movements)
  .flat()
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);
console.log(bankDepositSum2);

// 2) accumulater -> length of an array
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

// const numDeposits10002 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);

// const numDeposits10003 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;

const numDeposits10002 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);

const numDeposits10003 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

const numDeposits10004 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? count++ : count), 0);

console.log(numDeposits1000);
console.log(numDeposits10002);
console.log(numDeposits10003);
console.log(numDeposits10004);

let a = 10;
console.log(a++); // 10 (바로 적용 X)
console.log(a); // 11
console.log(++a); // 12 (바로 적용 O)
console.log(a); // 12

// // 3) accumulator -> object(deposits, withdrawls)
// const sums = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sums, cur) => {
//       cur > 0 ? (sums.deposits += cur) : (sums.withdrawls += cur)
//       return sums;
//     },
//     { deposits: 0, withdrawls: 0 }
//   );

// const { deposits, withdrawls } = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sums2, cur) => {
//       sums2[cur > 0 ? 'deposits' : 'withdrawls'] += cur;
//       return sums2;
//     },
//     { deposits: 0, withdrawls: 0 }
//   );

const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      cur > 0 ? (sums.deposits += cur) : (sums.withdrawls += cur);
      return sums;
    },
    { deposits: 0, withdrawls: 0 }
  );
console.log(sums);

const { deposits, withdrawls } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums2, cur) => {
      sums2[cur > 0 ? 'deposits' : 'withdrawls'] += cur;
      return sums2;
    },
    { deposits: 0, withdrawls: 0 }
  );
console.log(deposits, withdrawls);

// 4)
// this is a nice title -> This Is a Nice Title
// const convertTitleCase = function (title) {
//   const capitalize = str => str[0].toUpperCase() + str.slice(1);
//   // captalize = function (str) {
//   //  return str[0].toUpperCase() + str.slice(1)
//   // }
//   const exceptions = ['a', 'an', 'and', 'the'];

//   const titleCase = title
//     .toLowerCase()
//     .split(' ')
//     .map(word => (exceptions.includes(word) ? word : capitalize(word)))
//     .join(' ');
//   return capitalize(titleCase);
//   // and here is another title iwht an EXAMPLE
//   // >> and -> exceptions에 포함되더라도, And로 바꾸게 하기 위해.
// };

// console.log(convertTitleCase('this is a nice title'));
// console.log(convertTitleCase('and here is another title with an EXAMPLE'));

const convertTitleCase2 = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};

console.log(convertTitleCase2('this is an apple'));
console.log(convertTitleCase2('and here is another title with an EXAMPLE'));
*/
