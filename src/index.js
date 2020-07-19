document.addEventListener('DOMContentLoaded', (e) => {
    const dogBar = document.querySelector('#dog-bar');
    const url = 'http://localhost:3000/pups';
    const dogInfo = document.querySelector('#dog-info');
    const goodDogFilter = document.getElementById('good-dog-filter')
    
    function fetchDogs() {
        fetch(url)
        .then(response => response.json())
        .then(dogsObject => {
            getDog(dogsObject),
            clickHandler(dogsObject)
            //filterGoodDogs(dogsObject)
        });
    }

    function getDog(dogsObject) {
        dogsObject.forEach(dog => {
            renderDog(dog);
        });
    }

    function renderDog(dog) {
        const dogSpan = document.createElement('span');
        //had to define const in here for the values to show up
        const dogId = dog.id
        dogSpan.dataset.id = dogId;
        dogSpan.innerHTML = `
            ${dog.name}
        `
        dogBar.append(dogSpan);
    }

    function clickHandler(dogsObject) {
        dogBar.addEventListener('click', e => {
            if (e.target.nodeName === 'SPAN') {
                let currentDog = e.target.dataset.id;
                let dogNow = dogsObject.find(dog => dog.id == currentDog);
                makeDogDiv(dogNow);
            };
    })}

    function makeDogDiv(dogNow) {
        dogInfo.innerHTML = ``;
        const dogDiv = document.createElement('div');
        let goodDogButton = document.createElement('button')
        goodDogButton.id = 'good-dog'
        dogDiv.id = 'dog-info';
        dogDiv.innerHTML = `
            <img src="${dogNow.image}">
            <h2>${dogNow.name}</h2>
        `;

        goodDogButton.textContent = ( dogNow.isGoodDog ) ? 'Bad Dog!' : 'Good Dog!' 

        goodDogButton.addEventListener('click', e => {
            e.preventDefault()
            e.target.textContent = ( e.target.textContent === 'Good Dog!' ) ? 'Bad Dog!' : 'Good Dog!' 
            newStatus = ( goodDogButton.textContent === `Good Dog!` ) ? false : true;
            fetch(`${url}/${dogNow.id}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    "accept": "applicaiton/json"
                },
                body: JSON.stringify({ isGoodDog: newStatus })
            })
        });
        dogDiv.append(goodDogButton);
        dogInfo.append(dogDiv);
    }

    /*function filterGoodDogs(dogsObject) {
        goodDogFilter.addEventListener('click', e => { 
        goodDogFilter.textContent = ( e.target.textContent === 'Filter good dogs: OFF') ? 'Filter good dogs: ON' : 'Filter good dogs: OFF'
        })
        if (e.target.textContent === 'Filter good dogs: ON') {
            filteredDogs = dogsObject.filter(dog => dog.isGoodDog === true)
            getDog(filteredDogs)
        } else {
            getDog(dogsObject)
            
        }
        
    }*/

    fetchDogs()
    //clickHandler()

    renderDog()
    //getDog()
    //showDogInfo()
    //clickHandler()
})