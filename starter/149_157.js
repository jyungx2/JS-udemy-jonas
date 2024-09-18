// 149. Data Transformations : map, filter, reduce
'use strict';

// 1. map: operatoin을 적용시킨 모든 original array elements
// 를 포함하는 💫새로운 어레이를 리턴💫한다.

// 2. filter: specified test condition을 통과하는 array elements
// 만을 포함하는 💫새로운 어레이를 리턴💫한다.

// 3. reduce: 모든 어레이 밸류를 어떤 조건으로 하나의 값으로 만든다.
// 이 경우에는 새로운 어레이를 리턴하지 않고 💫하나의 reduced value💫만 출력한다.
// (e.g. adding all elements together)

/*
// 150. The map method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;

const movementsUSD = movements.map(function (mov) {
  return mov * eurToUsd;
  // return 23; // [23, 23, 23, 23, 23, 23, 23, 23]
});
console.log(movementsUSD);

// ⭐️ Arrow function으로 더 간단하게 쓸 수 있다! (same results)
const movementArrow = movements.map(mov => mov * eurToUsd);
console.log(movementArrow);

// 1️⃣ map method를 이용한 방법은 새로운 어레이를 만들기 위해 함수를 사용했다
// 💫In modern JS, this is the way to go.💫
// Using methods together with callback functions is
// the new and modern way of doing stuff.

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);
// 2️⃣ 여기선 그냥 기존 어레이에 for-of 루프를 씌우고, 새로 만든 빈 어레이에 push method를 이용해
// 새로운 어레이를 manually하게 구성했다.

const movementsDescription = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}
    `
);
console.log(movementsDescription);
// 3️⃣ 다음과 같은 map method 방법은 forEach method와 비슷해 보이더라도, 큰 차이가 존재한다.
// 기존의 forEach 방법은 array에 looping over하듯이 🖍️한 줄 한 줄 컨솔로 출력🖍️해야 했다.
// So in each of the iterations, we performed some action that was then visible in the console
// and we can call this a side effect. So the, 💥for each method creates side effects.💥
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`); // math function(taking an absolute value)
  }
});

// ❗️ But now here with this map method, all we did was to return each of the strings from the callback.
// And so basically they got added into a new array.🌟🌟
// And then finally we logged that "entire array" to the console and not the elements one by one.
// 💥따라서 map method를 사용할 경우엔 we didn't create side effects in each of the iteration.
// 우리가 한 건 '단지 new array를 생성'한 것일뿐! (side effect 개념은 강의 후반부로 갈수록 중요해진다)💥

// 151. Computing Usernames

const user = 'Steven Thomas Williams';
const username = user
  .toLowerCase()
  .split(' ') // ['steven', 'thomas', 'williams'] => 💡 array 생성! (<-> join method: 어레이 파괴하고 스트링으로..)
  .map(function (name) {
    // name은 위의 어레이 안에 있는 각각의 요소들! (like a movements array & mov combination)
    return name[0]; // function과 return을 지우고, (name => name[0])만 써도 OK
  })
  .join('');

console.log(username); // stw

// ⭐️ Arrow function
const createUsernames1 = function (user) {
  const username = user
    .toLowerCase()
    .split(' ')
    .map(
      name => name[0] // arrow function
    )
    .join('');
  return username;
};
console.log(createUsernames1('Steven Thomas Williams')); // stw

// 151. Computing Username *
// 1) accs 라는 account 집합소(어레이) 자체를 파라미터로 받아들이는 함수를 준비 > 어레이를 하나씩 쪼갬
// 2) 그 함수 안에는 어레이를 구성하는 각각의 요소를 forEach라는 하이어 함수로 쪼개어 계산할 것이다.
// > 오브젝트 안의 어느 한 프라퍼티를 바꿀 것임
// 3) forEach 함수 안에는 각각의 요소를 구성하고 있는 프라퍼티 중에 내가 바꾸고 싶은 프라퍼티를
// string methods / array methods의 여러 방법들을 이용해 디자인한다.

const createUsernames2 = function (accs) {
  // accs = accounts (array) object인 accounts 모음집 (각각의 오브젝트에 property 하나 추가할 것)
  accs.forEach(function (acc) {
    // Should I use forEach or map method❓
    // We don't want to create the new array in this situation,
    // but just simply modify the elements of objects that already exists in
    // in the 'accounts' array.
    // What we want is to simply loop over the array, and then do something. => forEach method

    // 👉 We simply looped over the accounts array and in each iterations,
    // we manipulated the current account object and edit a username to it.

    // we don't want to create a new array(=> map method☝️❌), simply just modify
    // the array that we get as an input. >> This is a really important distinction to keep in mind!
    // * side effects: mutate the original accounts array. > What we want to do > Lets go for forEach !
    // accounts array에 forEach method(또 다른 함수를 불러오는 higher order function) 적용
    acc.username = acc.owner
      .toLowerCase()
      .split(' ') // ['sarah', 'smith'] >> owner property로부터 array 또 생성
      .map(name => name[0]) // owner array(?)에 map method 적용(arrow function)
      .join(''); // 다시 array -> string으로 바꿈
  });
};
createUsernames2(accounts);
console.log(accounts);

const updateUI = function (acc) {
  // 1️⃣ Display movements
  displayMovements(acc.movements);

  // 2️⃣ Display balance
  calcDisplayBalance(acc);
  // 🖍️ 위에서, 더이상 movements를 함수의 파라미터로 쓰지 않고,
  // acc object으로부터 movements를 빼오는 방식으로 불러오고 있기 때문에
  // currentAccount.movements라고 쓰지 않고 currentAccount라고만 쓴다!
  // >> 단, updateUI라는 배리어블로 따로 함수를 만들었을 때는, 함수 자체가
  // 독립적이기 때문에 이제는 파라미터를 acc로 바꿔도 무방!

  // 3️⃣ Display summary
  calcDisplaySummary(acc);
  // 🖍️ 얘도 마찬가지
};

// 💥각각의 account holder의 username을 compute하고 싶다면??
// ❓ Should we use the map method or forEach method?
// 이 상황에선 새로운 어레이를 만들고 싶은 게 아니라, 오브젝트(account)를 수정하고 싶은 것
// 따라서 accounts 어레이를 simple loop over한 뒤, ⭐️forEach를 사용하면 됨!
// map method를 이용해 new array를 만들 수 있다.
const createUsernames = function (accs) {
  // accs = accounts => 4개의 오브젝트를 담고 있는 'array'니까 forEach method 사용가능!
  accs.forEach(function (acc) {
    // accounts array에 forEach method 적용

    // 각각의 오브젝트에 username이라는 새로운 property 추가! (기억이 안난다,, 복습하자ㅠ)
    acc.username = acc.owner
      .toLowerCase()
      .split(' ') // ['sarah', 'smith'] >> owner property로부터  array 또 생성
      .map(name => name[0]) // owner array(?)에 map method 적용(arrow function)
      .join(''); // 다시 array -> string으로 바꿈
  });
};
console.log(createUsernames(accounts)); // undefined
createUsernames(accounts);
console.log(accounts); // js / jd / stw / ss

// 152. The filter Method
// 📍 Deposit
// 1. filter method
const deposits = movements.filter(function (mov) {
  // (mov, i, arr) 라고 쓸 순 있지만,
  // filter method에서 이렇게 쓰는 경우는 없다고 한다. (선생님이 한번도 이렇게 쓰지 않는다고 함)
  return mov > 0;
});
console.log(movements); // [200, 450, -400, 3000, -650, -130, 70, 1300]
console.log(deposits); // [200, 450, 3000, 70, 1300]

// 2. push method
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);
// => Big advantage of array methods like map/filter/reduce...
// Like, what's the big deal and why not just use the four loop for everything.
// And the reason for that is again the push that exists in JavaScript
// for using more functional code, like this.
// But there's also a more practical implication here.

// And 🌟that's because we can actually chain all of these methods together.🌟
// So, basically use them all one after another to build a big final result.
// So, a bit similar in fact to what we did here in our application, right here.
// But here 🌟we mixed string methods with array methods🌟, but later on we will do,
// like big chains, only with array methods and that would be completely
// impossible using the for loop.
// So, that's another big advantage of using the methods instead of the regular for loop.

// 📍 Withdrawal
// 1. filter method
const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals); // [-400, -650, -130]

// 2. push method
const withdrawalsFor = [];
for (const mov of movements) if (mov < 0) withdrawalsFor.push(mov);
console.log(withdrawalsFor); // [-400, -650, -130]

// 153. The reduce method *
const calcDisplayBalance1 = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  // object(= acc <= currentAccount)에 balance라는 프라퍼티를 하나 추가하는 것
  // 근데 이때 movements를 다 더한 값이 balance라고 정의해놓는 것인데 이때는 Const로 정의할 필요없다!!
  // (그냥 오브젝트에 파라미터 하나 추가하는 것이므로 acc라는 account object에 .으로 추가할 수 있음)
  labelBalance.textContent = `${acc.balance}€`;
  // return acc.balance; 🖍️
};
console.log(calcDisplayBalance1(account1)); // undefined
// >> 위의 밸런스 계산함수는 단지 balance라는 프라퍼티를 reduce 방법으로 다 더해서 만들어놓은 것이지,
// 이 값을 직접적으로 리턴하진 않음!! (🖍️ 따로 return acc.balance라고 써주지 않는이상 컨솔 상에 출력 X)

// 153. The reduce method
// Calculate balance !!
// 💥Let's get a value of 'global balance'. (not array)💥

// 1) accumulator -> SNOWBALL // it will be the current sum of all the previous values.
// we keep adding to this accumulator in each iteration of the loop.
const balance = movements.reduce(function (acc, cur, i, arr) {
  console.log(`Iteration ${i}: ${acc}`);
  return acc + cur; // current one(acc) + new current value(cur)
  // ... initial value(i = 0) + current value in the 🚦previous iteration
  // >> In each iteration, we return the updated accumulator(the current one :acc)
  // plus the new current value(:cur)
}, 0); // 0 : starter as the initial value. (>> index number: 0, simply specify zero here.)

// 🌟 starter가 중요한 게, current value in the 🚦previous iteration에서 previous iteration이라는 말을 make sense하게 해준다.
// starter의 index number가 0이기 때문에 index number가 1로 넘어갈 땐, 원래 0자리였던 200을 더해줘야 한다.
// 즉, i=0을 거쳐 i=1으로 넘어갈 땐, 이보다 previous iteration인 200(원래 i=0)이라는 값을 starter에 더해줘야 한다.
// 그 후엔, 더 이상 starter값(= 0)이 아닌, i=2로 넘어갈 땐, initial value(= 200)에 i=1값이었던, 450을 더해줘야 하기 때문에,
// 현재 Iteration보다 previous iteration의 current value를 더해줘야 한다고 설명한 이유.. 결국 모든게 starter의 존재 때문!
// 원래 첫번째 자리에 위치한 밸류가 i=0여야 하는데, 이 자리를 0 또는 그 어떤 starter value가 steal함으로써
// 원래 value들이 한칸씩 뒤로 물러났기 떄문에 현재 index number보다 그 이전의 iteration을 더한 게 순서에 맞는 accumulator값이다.
console.log(balance); // 3840

// ♐️ Arrow functions
const balance1 = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance1); // 3840

// 2) for of loop를 이용해서 reduce method와 같은 방법 써보기
// 💫we always need an external variable💫 whenever we want to use a for loop.
// if you need only one loop, that's fine. But it starts to become really
// cumbersome and unpractical when we use many loops for doing many iterations.
let balance2 = 0; // initial accumulator value
for (const mov of movements) balance2 += mov;
console.log(balance2); // 3840

// 3) Display balance !!
const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} EUR`;
};
calcDisplayBalance(account1.movements); // labelBalance는
// 클래스 네임이 balance value인 element를 document(html)상에서
// queryselector으로 js script상으로 정의내린 배리어블.

// Maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  // accumulator is greater than movement(=current value),
  // In this case, accumulator이 다음 값보다 크다면 바꾸지 않고 킵하고 싶다.
  else return mov;
  // When the current value is greater than the accumulator,
  // ex) 450(=current value) > 200 (accumulator), >> ✅ current value
  // We return to movement(=450) as the new accumulator in the next iteration.
}, movements[0]); // You can think of this as the first accumulator ❌don't just put 0 here.❌
// It might work with the maximum, but not with a minimum.
// 🔥 Always go with the first value of the array!
console.log(max); // 3000

// 155. The Magic of Chaining Methods *
const calcDisplaySummary = function (acc) {
  // movements > acc로 바꿔줌
  // 💫 interestRate가 account(사용자)마다 다르기 때문에 interest property에 접근하려면
  // whole object인 account로 써줘야 하기 때문!
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;
  // there's no need for the negative sign, so let's take the absolute value.

  const interest = acc.movements
    .filter(mov => mov > 0)

    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // let's say the bank introduces a new rule.
      // now the bank only pays an interest if that interest is at least 1 Euro.
      // Only if one interest is at least 1, only then it will be added to interest total.
      console.log(arr);
      return int >= 1; // interest가 1€가 안되는 것들은 exclude, 1€ 이상인 것만 내보낸다! (=0.84€)
    }) // 그러면 값이 59.4로 바뀌는데, 그 이유는 기존 interest였던 60.24€에서 0.84€만큼 빠졌기 때문!
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};
// calcDisplaySummary(account1.movements); 3️⃣

// 155. The Magic of Chaining Methods
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const eurToUsd = 1.1;

// PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0) // returns a new array
  .map((mov, i, arr) => {
    console.log(arr); // 💡 if we made a mistake, we can check out by using array parameter!
    // we can now take a look at the whole current array that this map method is being called on.
    return mov * eurToUsd;
  })
  // .map(mov => mov * eurToUsd) // so, we could have added something else here.
  .reduce((acc, mov) => acc + mov, 0); // reduce method returns a 'value'.
// >> so we couldn't have chained a map or filter after this.
console.log(totalDepositsUSD);

// So first we should not overuse chaining, so we should try to optimize it
// because 💥chaining tons of methods one after the other can cause a real performance issues💥
// if we have really huge arrays. So if we have a huge chain of methods,
// chained one after the other, we should try to compress all the functionality
// that they do into as little methods as possible.

// Second, it is a bad practice in JavaScript to chain methods that 💥mutate
// the underlying original array.💥 And an example of that is the splice method.
// So again, you should not chain a method like the ⚡️❌splice or the reverse method.❌⚡️

// I mean, you can do that, and for a small application like this one,
// it's not a big deal and it's not going to cause problems, but in a large scale application,
// 🌟it's usually always a good practice to avoid mutating the original arrays.🌟

// 157. The find method (=> 로그인할 때, 유저 찾을 때 사용된다.)
// Find method also needs a callback function that returns a boolean.
// Unlike the filter method, 새로운 어레이를 리턴하지 않고, 조건을 만족하는
// 🔥첫번째 element🔥만 리턴한다.
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal); // -400

const firstWithdrawl = movements.find(function (mov) {
  mov < 0;
});
// filter method와 비슷하긴 하지만, 두가지 fundamental differences가 존재한다.
// 1. Filter returns 🟡all the elements🟡 that match the condition
// while the Find method only returns 🔵the first one🔵.
// 2. the 🟡Filter method returns a new array🟡
// while 🔵Find only returns the element itself🔵 and not an array, okay?

console.log(accounts); // (4) [{…}, {…}, {…}, {…}]
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account); // owner property가 Jessica Davis인 오브젝트만을 뽑아낸다! => 매우 유용.
// {owner: 'Jessica Davis', movements: Array(8), interestRate: 1.5, pin: 2222, username: 'jd'}

// So usually the goal of the Find method is to just find exactly one element,
// and therefore we usually set up a condition where only one element can satisfy that condition.
// And so that's why we used the equal operator here, okay?
*/
