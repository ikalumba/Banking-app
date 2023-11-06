'use strict';

// CHALLENGE #1
/*
const juliasData1 = [3, 5, 2, 12, 7];
const katesData1 = [4, 1, 15, 8, 3];
const checkDogs = function (arr1, arr2) {
  const arr1Correct = arr1.slice(1, -2);
  console.log(arr1Correct);
  const allDogs = [...arr1Correct, ...arr2];
  allDogs.forEach(function (age, i) {
    const ageCheck =
      age < 3
        ? `Dog number ${i + 1} is still a puppy 🐶`
        : `Dog number ${i + 1} is an adult, and is ${age} years old`;
    console.log(ageCheck);
  });
};
checkDogs(juliasData1, katesData1);

/////////////////////////////////
//CHALLENGE #2
const calAverageHumanAge = function (dogAge) {
  const humanYears = dogAge.map((dAge, i) =>
    dAge <= 2 ? dAge * 2 : 16 + dAge * 4
  );
  const dogsAbove18 = humanYears.filter(dogHY => dogHY >= 18);

  // const avgAdultDogs =
  //   dogsAbove18.reduce((acc, dAge) => acc + dAge, 0) / dogsAbove18.length;

  const avgAdultDogs = dogsAbove18.reduce(
    (acc, dAge, i, arr) => acc + dAge / arr.length,
    0
  );

  return avgAdultDogs;
};
console.log(calAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));


//////////////////////////
//CHALLENGE #3

const calAverageHumanAge = dogAge => {
  const avgHumanAge = dogAge
    .map((dAge, i) => (dAge <= 2 ? dAge * 2 : 16 + dAge * 4))
    .filter(dogHY => dogHY >= 18)
    .reduce((acc, dAge, i, arr) => acc + dAge / arr.length, 0);
  return avgHumanAge;
};
console.log(calAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));


/////////////////////////
// CHALLENGE #4

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1.
// for (const dogObj of dogs) {
//   console.log(dogObj);
//   dogObj.recommendedPor = ((dogObj.weight ** 0.75 * 28) / 1000).toFixed(3);
// }

//Better ansewer for 1
dogs.forEach(
  dog => (dog.recommendedPor = Math.trunc(dog.weight ** 0.75 * 28) / 1000)
);

console.log(dogs);
// 2.

const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));

console.log(sarahDog);

if (
  sarahDog.curFood / 1000 > sarahDog.recommendedPor * 0.9 &&
  sarahDog.curFood / 1000 < sarahDog.recommendedPor * 1.1
) {
  console.log(`Sarah's dog is eating enough`);
} else if (sarahDog.curFood / 1000 > sarahDog.recommendedPor * 1.1) {
  console.log(`Sarah's dog is eating too much`);
} else {
  console.log(`Sarah's dog is eating too little`);
}

//3.
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood / 1000 > dog.recommendedPor * 1.1)
  .map(dog => dog.owners)
  .flat();
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood / 1000 < dog.recommendedPor * 0.9)
  .map(dog => dog.owners)
  .flat();
console.log(ownersEatTooLittle);

// 4.
console.log(
  `${ownersEatTooMuch.join(
    ' and '
  )}'s dogs eat too much! and ${ownersEatTooLittle.join(
    ' and '
  )}'s dogs eat too little!`
);

//5.
console.log(dogs.some(dog => dog.recommendedPor === dog.curFood));

//6.
console.log(
  dogs.some(
    dog =>
      dog.curFood / 1000 > dog.recommendedPor * 0.9 &&
      dog.curFood / 1000 < dog.recommendedPor * 1.1
  )
);

//7.
const dogsEatOkay = dogs.filter(
  dog =>
    dog.curFood / 1000 > dog.recommendedPor * 0.9 &&
    dog.curFood / 1000 < dog.recommendedPor * 1.1
);

// console.log(dogs);
console.log(dogsEatOkay);
const sortedDogs = dogs
  .slice()
  .sort((a, b) => b.recommendedPor - a.recommendedPor);

console.log(dogs);
console.log(sortedDogs);

*/
