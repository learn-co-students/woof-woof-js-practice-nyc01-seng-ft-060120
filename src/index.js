const dogUrl = 'http://localhost:3000/pups/'
let dogs
const fetchDogs = () => {
  fetch(dogUrl)
    .then((resp) => resp.json())
    .then((data) => {
      dogs = data
      renderDogs(dogs)
    })
}

const setFilter = () => {
  const filterBtn = document.querySelector("#good-dog-filter");
  filterBtn.dataset.status = false;
}

const renderDogs = (dogs) => {
  const dogBar = document.querySelector("#dog-bar");
  dogBar.innerHTML = ''
  dogs.forEach(dog => renderDogThumbnail(dog))
}

const renderDogThumbnail = (dog) => {
  const dogBar = document.querySelector('#dog-bar')
  const dogSpan = document.createElement('span')

  dogSpan.dataset.id = dog.id
  dogSpan.innerHTML = dog.name

  dogBar.appendChild(dogSpan)
  dogSpan.addEventListener('click', () => showDogHandler(dog))
}

const showDogHandler = (dog) => {
  const dogSummaryContainer = document.getElementById("dog-summary-container");
  dogSummaryContainer.innerHTML = ''

  let dogContainer = document.createElement("div");
  let dogImg = document.createElement("img");
  let pupName = document.createElement("h2");
  let judgeDogBttn = document.createElement("button");

  dogImg.src = dog.image;
  pupName.innerHTML = dog.name;
  dogContainer.id = 'dog-info'

  dogContainer.append(pupName, judgeDogBttn, dogImg);
  dogSummaryContainer.appendChild(dogContainer);

  judgeDogDisplay(judgeDogBttn, dog)
  goodDogHandler(judgeDogBttn, dog);
}

const judgeDogDisplay = (judgeDogBttn, dog) => {
  !!dog.isGoodDog === true ? judgeDogBttn.innerHTML = "GOOD DOG" :
  judgeDogBttn.innerHTML = "BAD DOG";
}

const goodDogHandler = (judgeDogBttn, dog) => {
  judgeDogBttn.addEventListener('click', () => {
    dog.isGoodDog === false ? dog.isGoodDog = true : dog.isGoodDog = false
    updateDogStatus(dog, judgeDogBttn)
  })
}

const updateDogStatus = (dog, judgeDogBttn) => {
  fetch(dogUrl + `${dog.id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      accepts: "application/json",
    },
    body: JSON.stringify(dog),
  })
  .then((resp) => resp.json())
  .then((dog) => judgeDogDisplay(judgeDogBttn, dog));
}

const createDogsListener = () => {
  let filterBtn = document.querySelector("#good-dog-filter");
  filterBtn.addEventListener('click', () => toggleFilter(filterBtn, dogs))
}

const toggleFilter = (filterBtn, dogs) => {
  if (filterBtn.dataset.status === "true") {
    filterBtn.dataset.status = false
    renderDogs(dogs)
    filterBtn.innerText = "Filter good dogs: OFF";
  } else if (filterBtn.dataset.status === "false") {
    filterBtn.dataset.status = true;;
    dogs = dogs.filter(dog => dog.isGoodDog === true)
    renderDogs(dogs)
    filterBtn.innerText = "Filter good dogs: ON";
  }
}

document.addEventListener('DOMContentLoaded', (e) => {
  fetchDogs(), setFilter(), createDogsListener()
})