document.addEventListener('DOMContentLoaded', (e) => {
    const dogsUrl = "http://localhost:3000/pups"
    const dogInfo = document.querySelector('#dog-info')

    



    function fetchDogs(){
        fetch(dogsUrl)
        .then(resp => resp.json())
        .then(dogs => {renderDogs(dogs), eventHandler(dogs)})
    }
    
    fetchDogs();
    eventHandler();

    function renderDogs (dogs){
        dogs.forEach (dog => {
        let newDogSpan = document.createElement('span')
        const dogBar = document.querySelector('#dog-bar')
        newDogSpan.innerText = dog.name
        newDogSpan.dataset = 'dogID'
        newDogSpan.dataset.id = dog.id;
        dogBar.appendChild(newDogSpan) 
        })
    }

    function eventHandler(dogs){
        document.addEventListener("click", function(e){
            if(e.target.tagName === 'SPAN'){
                let newDogSpan = e.target
                let pup = dogs.find(dog => dog.name === newDogSpan.innerText);
                renderDogInfo(pup)                
            }
            let dogButton = document.querySelectorAll('button')[1]
            if(e.target == dogButton){
            let pupname = document.querySelector('h2').innerText
            let pup = dogs.find(dog => dog.name === pupname);
            updateDogStatus(pup)
            }
        })
    }

    function renderDogInfo(pup){
        if(pup.isGoodDog == true){
        dogInfo.innerHTML = `
                <h2>${pup.name}</h2>
                <img src=${pup.image}>
                <button>Good Dog!</button>
               `
        }else{
        dogInfo.innerHTML = `
                <h2>Name: ${pup.name}</h2>
                <img src=${pup.image}>
                <button>Bad Dog!</button>
               `
        }
    }

    function updateDogStatus(pup){
        if(pup.isGoodDog == true){
            dogInfo.innerHTML = `
            <h2>Name: ${pup.name}</h2>
            <img src=${pup.image}>
            <button>Bad Dog!</button>
           `
        }else if(pup.isBadDog == false){
            dogInfo.innerHTML = `
            <h2>Name: ${pup.name}</h2>
            <img src=${pup.image}>
            <button>Good Dog!</button>
           `
        }
        

    }
});
