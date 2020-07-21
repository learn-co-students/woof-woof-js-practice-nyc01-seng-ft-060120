document.addEventListener('DOMContentLoaded', (e) => {
    const dogBarDiv = document.getElementById('dog-bar')
    const dogInfoDiv = document.querySelector('#dog-info')
    const filterButton = document.getElementById('good-dog-filter')
    const baseUrl = "http://localhost:3000/pups"
    let allDogs = []


    function fetchPups(){
        fetch(baseUrl)
        .then(resp => (resp.json())
        .then(function(json){
            let dogsArray = json
            dogsArray.forEach(dog => addSpan(dog))
            dogsArray.forEach(dog => allDogs.push(dog))
        })

        )
        //console.log(allDogs)
    }

    function addSpan(dog){
        const dogSpan = document.createElement('span')
        dogSpan.innerText = dog.name
        dogBarDiv.append(dogSpan)

    }

    function addDogInfo(dogName){
        allDogs.forEach(dog => {
            if(dog.name === dogName){
            const h2 = document.createElement('h2')
            h2.innerText = dog.name
            const image = document.createElement('img')
            image.src = dog.image
            const button = document.createElement('button')
            button.dataset.purpose = "toggle"
            button.dataset.id = dog.id
            if(dog.isGoodDog == true){
                button.innerText = "Good Dog!"
            } else{
                button.innerText = "Bad Dog!"
            }
            dogInfoDiv.append(h2, image, button)

            }
        })
    }

    function dogBarListner(){
    dogBarDiv.addEventListener("click", function(e){
        if (e.target.matches ('span')){
            addDogInfo(e.target.innerText)
            dogButtonListener()
        } 
    })
    }

    function dogButtonListener(){
        document.addEventListener("click", function(e){
            e.preventDefault(e)
            if (e.target.dataset.purpose === "toggle"){
                let toggleButton = e.target
                if (toggleButton.innerText === "Good Dog!"){
                    toggleButton.innerText = "Bad Dog!"
                } else if (toggleButton.innerText === "Bad Dog!"){
                    toggleButton.innerText = "Good Dog!"
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
                // newStatus(dogToUpdate)
                 

                
                // fetch(`${baseUrl}/${pup.id}`)

                
    
            }

        })

    }
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

    })


    fetchPups()
    dogBarListner()

});
