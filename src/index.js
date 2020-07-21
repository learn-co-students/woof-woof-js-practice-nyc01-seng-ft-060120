document.addEventListener("DOMContentLoaded", function() {

const dogBarDiv = document.getElementById('dog-bar')
const dogInfoDiv = document.getElementById('dog-info')
const filterButton = document.getElementById('good-dog-filter')
const baseUrl = "http://localhost:3000/pups"
let allDogs = []



function fetchPups() {
    fetch(baseUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(json) {
        let dogsArray = json
        dogsArray.forEach(dog => addSpan(dog))
        dogsArray.forEach(dog => allDogs.push(dog))
    })
}

  
function addSpan(dog) {
    const dogSpan = document.createElement('span')
    dogSpan.innerText = dog.name
    dogBarDiv.append(dogSpan)
}

function addDogInfo(dogName) {
    allDogs.forEach(dog => {

    // const id = dog.id

    const img = document.createElement('img')
    img.src = dog.image

    const h2 = document.createElement('h2')
    h2.innerText = dog.name

    const button = document.createElement('button')
    button.dataset.purpose = "toggle"
    button.dataset.id = dog.id
    if (dog.isGoodDog === true) {
        button.innerText = "Good Dog!"
    } else if (dog.isGoodDog === false) { 
        button.innerText = "Bad Dog!"
    }

    if (dogName === dog.name) {
        dogInfoDiv.append(img)
        dogInfoDiv.append(h2)
        dogInfoDiv.append(button)
    }
})
}


    dogBarDiv.addEventListener('click', function(e) {
        dogInfoDiv.innerHTML = ''
        if (e.target.matches('span')) {
            // console.log(e.target.innerText)
            addDogInfo(e.target.innerText)
        }
        
    })  // end of span document event listener

        document.addEventListener('click', function(e) {
            e.preventDefault(e)
            if (e.target.dataset.purpose === "toggle") {
                let toggleButton = e.target 
                if (toggleButton.innerText === "Bad Dog!") {
                    toggleButton.innerText = "Good Dog!"
                } else if (toggleButton.innerText === "Good Dog!") {
                    toggleButton.innerText = "Bad Dog!"
                }
                let id = toggleButton.dataset.id
                let newValue = (toggleButton.innerText === `Good Dog!` ) ? true : false;

                fetch(`${baseUrl}/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify ({
                        'isGoodDog': newValue
                    })
                })

            }
        }) //document event listener end

       
        filterButton.addEventListener("click", function(e) {
            const thisButton = e.target
            if (thisButton.innerText === "Filter good dogs: OFF") {
                thisButton.innerText = "Filter good dogs: ON"
                // console.log(allDogs)
                dogBarDiv.innerHTML = ''
                allDogs.forEach(dog => {
                    
                    if (dog.isGoodDog === true) {
                        addSpan(dog)
                    }
                  
                })
                
            } else if (thisButton.innerText === "Filter good dogs: ON") {
                thisButton.innerText = "Filter good dogs: OFF"
                dogBarDiv.innerHTML = ''
                allDogs.forEach(dog => {
                    addSpan(dog)
                })
             
            }

        }) // filterButton event listener end
   






       
 fetchPups()
}) // DOMContendLoaded end