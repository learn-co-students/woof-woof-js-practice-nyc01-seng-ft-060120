document.addEventListener('DOMContentLoaded', (e) => {
    const dogsUrl = "http://localhost:3000/pups/"
    const dogBar = document.querySelector('#dog-bar')
    const dogInfo = document.querySelector('#dog-info')

    const dogDiv = document.createElement('div')
    dogInfo.append(dogDiv)


    function fetchDogs(){

        fetch(dogsUrl)
        .then(resp => resp.json())
        .then(dogs => renderAllDogs(dogs))
    }

    function renderAllDogs(dogs){
        dogs.forEach( dog => renderDog(dog))
    }
   
    function renderDog(dog){
        // console.log(dog)
        let span = document.createElement('span')
        span.dataset = dog.id
        span.innerText = dog.name

        dogBar.append(span)

        span.addEventListener('click', (e) => clickOnDog(dog))
    }

    function clickOnDog(dog){
       
        dogDiv.innerHTML = `
        <img src=${dog.image}>
        <h2>${dog.name}</h2>
        `
        const button = document.createElement('button')
        button.id = "goodButton"
        button.dataset.dogId = dog.id

        button.innerText = (dog.isGoodDog) ? "Good Dog!" : "Bad Dog!"
        
        dogDiv.append(button)

        button.addEventListener('click', (ev) => changeDogStatus(dog))
        
    }

    function changeDogStatus(dog){
        const status = (dog.isGoodDog === true) ? false : true

        fetch(dogsUrl + dog.id, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept" : "application/json"
            },
            body: JSON.stringify({
                isGoodDog: status
            })
        })
        .then( resp => resp.json())
        .then( data => clickOnDog(data))
    
    }

    fetchDogs();
    
})