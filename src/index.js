document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = "http://localhost:3000/pups/"
    const dogBar = document.querySelector('#dog-bar')
    const dogInfo = document.querySelector('#dog-info')

    
    const getPups = () => {
        fetch(baseUrl)
        .then(response => response.json())
        .then(pups => {
            renderPups(pups)
        })
    }

    const renderPups = pups => {
        pups.forEach(pup => {
            renderPup(pup)
        })
    }

    const renderPup = (pup) => {
        let pupSpan = document.createElement('span')
        pupSpan.innerHTML=""
        pupSpan.dataset = pup.id 
        pupSpan.innerText = pup.name
        dogBar.append(pupSpan)

        pupSpan.addEventListener('click', (e) => {onPupClick(pup)})
    }

    function onPupClick(pup) {
        dogInfo.innerHTML = `
        <img src=${pup.image}>
        <h2>${pup.name}</h2>
        `

        const button = document.createElement('button')
        button.id = "status"
        button.dataset.pupId = pup.id
        button.innerText = (pup.isGoodDog) ? "Good Dog!" : "Bad Dog"

        dogInfo.append(button)

        button.addEventListener('click', (e) => changeStatus(pup))
    }

    function changeStatus(pup) {
        const status = (pup.isGoodDog === true) ? 
        false : true

        fetch(baseUrl + pup.id, {
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
        .then( pup => onPupClick(pup))

    }

    getPups();

})
/*
√get div with the id of `"dog-bar"`
√On page load, make a fetch to get all of the pup objects. 
Then add `span` with the pup's name to the dog bar (ex: `<span>Mr. Bonkers</span>`).

* USER SHOULD BE ABLE TO:
* CLICK ON DOGS IN THE DOG BAR TO SEE MORE INFO ABOUT THE GOOD PUPPER;
* MORE INFO INCLUDES A DOG PIC, 
    * A DOG NAME
    * DOG BUTTON THAT INDICATES: 
     * WHETHER IT IS A GOOD DOG OR A BAD DOG;
    * CLICK ON GOOD DOG/BAD DOG BUTTON IN ORDER TO TOGGLE PUP GOODNESS;
    * CLICK ON "FILTER GOOD DOGS" BUTTON IN ORDER TO JUST SEE GOOD DOGS OR SEE ALL DOGS IN DOG BAR.

*/ 