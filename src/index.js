document.addEventListener('DOMContentLoaded', () => {
  const dogBarElement = document.getElementById('dog-bar');
  const dogInfoElement = document.getElementById('dog-info');
  const url = "http://localhost:3000/pups";

  var dogs;

  // Events
  dogBarElement.addEventListener('click', handleBarClick);

  fetchDogs();

  function fetchDogs() {
    // Assign global dog variable and set the dogs.
    fetch(url).then((resp) => {return resp.json()})
    .then(data => {
      dogs = data;
      data.forEach((dog) => {
        setDog(dog)
      });
    })
  }

  function getDogProperties(id) {
    return dogs.find(dog => dog.id == id);
  }

  function setDog(dog) {
    const spanElement = document.createElement('span');

    spanElement.dataset.id = dog.id;
    spanElement.textContent = dog.name;

    dogBarElement.append(spanElement);
  }

  function handleBarClick(event) {
    let targetElement = event.target;
    if (targetElement.nodeName === 'SPAN') {
      targetDog = getDogProperties(targetElement.dataset.id);

      const imgElement = document.createElement('img');
      const nameElement = document.createElement('h2');
      const buttonElement = document.createElement('button');

      imgElement.src = targetDog.image;
      nameElement.textContent = targetDog.name;
      buttonElement.textContent = (targetDog.isGoodDog) ? "Good Dog!" : "Bad Dog!";
      buttonElement.addEventListener('click', changeStatus);

      dogInfoElement.append(imgElement, nameElement, buttonElement);
    }
  }

  function changeStatus(event) {
    let isGoodDog = event.target.textContent;
    event.target.textContent = (isGoodDog === "Good Dog!") ? "Bad Dog!" : "Good Dog!";
  }

})
