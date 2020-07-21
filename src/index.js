document.addEventListener("DOMContentLoaded", function(){

    // GLOBAL VARIABLES 
    const url = "http://localhost:3000/pups"
   

    // FUNCTIONS 

    const getDogs = () => {
        fetch(url)
        .then(response => response.json())
        .then(dogData =>  renderDogs(dogData))
    }


    const renderDogs = dogArray => {
        dogArray.forEach(dogObj => {
            renderDog(dogObj)
        })
    }

    
    const renderDog = dog => {
        const dogBar = document.querySelector("#dog-bar")
        const span = document.createElement("span")
        span.textContent = dog.name
        span.dataset.id = dog.id
        dogBar.append(span)
    }


    const renderDogInfo = dog => {

            const dogInfo = document.querySelector("#dog-info")
            const img = document.createElement("img")
            const h2 = document.createElement("h2")
            const button = document.createElement("button")
            button.className = "status"
            button.dataset.behaviorBool = null 

            img.src = `${dog.image}`
            h2.textContent = dog.name
            
            if(dog.isGoodDog === true){
                button.innerHTML = "Good Dog!"
                button.dataset.behaviorBool = `${dog.isGoodDog}`
            }
            else {
                button.innerHTML = "Bad Dog!"
                button.dataset.behaviorBool = `${dog.isGoodDog}`
            }

            dogInfo.innerHTML = " " //easy way to remove an item when another item is clicked 
            
            dogInfo.append(img, h2, button)     
       
    }

    const clickHandler = () => {
        document.addEventListener("click", function(e){
            if(e.target.matches('span')){
                dogNameButton = e.target 
                spanId = dogNameButton.dataset.id
                const behaviorBool = null 
                const getDogsInfo = () => {
                    fetch(url + `/${spanId}`)  //span id will give us the dog id of a dog that is clicked 
                    .then(response => response.json())
                    .then(dogData => 
                        //console.log(dogData)
                        renderDogInfo(dogData)) //renders only one dog info because WE ONLY NEED ONE DOGGO!
                }

                getDogsInfo()
            }

            if(e.target.matches(".status")){
                const behaviorStatusButton = e.target 
                if(behaviorStatusButton.innerHTML === "Good Dog!"){
                    behaviorStatusButton.innerHTML = "Bad Dog!"
                    behaviorStatusButton.dataset.behaviorBool = false 
                     fetch(url + `/${spanId}`, {
                        method: "PATCH",
                        headers: {
                            "content-type": "application/json",
                            "accept": "application/json"
                        },
                        body: JSON.stringify({
                            isGoodDog: behaviorStatusButton.dataset.behaviorBool
                        })
                    })
                    .then(response => response.json())
                    .then(console.log(spanId))

                }
                else{
                    behaviorStatusButton.innerHTML = "Good Dog!"
                    behaviorStatusButton.dataset.behaviorBool = true
                     fetch(url + `/${spanId}`, {
                        method: "PATCH",
                        headers: {
                            "content-type": "application/json",
                            "accept": "application/json"
                        }, 
                        body: JSON.stringify({isGoodDog: behaviorStatusButton.dataset.behaviorBool})
                    })
                    .then(response => response.json())
                    .then(console.log(spanId))
                }
            }
        })
    }





    // CALLS
    clickHandler()
    getDogs() 
    //renderDog()
    // dogInformation()
    
   
    





})

