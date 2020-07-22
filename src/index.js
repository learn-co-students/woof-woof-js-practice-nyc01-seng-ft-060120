document.addEventListener("DOMContentLoaded", function() {
    const dogFilterBTN = document.getElementById('good-dog-filter')
    const dogBar = document.getElementById('dog-bar')
    const dogPane = document.getElementById('dog-info')
    const DOGGY_URL = "http://localhost:3000/pups"

    function callTheDogsIn(){
        fetch(DOGGY_URL)
            .then(resp => resp.json())
            .then(json => allDoggos(json))
    }
    
    function allDoggos(doggos) {
        for (const doggo in doggos) {
            const doggoWhoCameHome = document.createElement('span')
            doggoWhoCameHome.innerHTML = `<p>${doggos[doggo]["name"]}</p>`
            if (doggos[doggo]["isGoodDog"]) {
                doggoWhoCameHome.className = "good-dog"
            }
            doggoWhoCameHome.dataset.id = doggos[doggo]["id"]
            dogBar.append(doggoWhoCameHome)
        }
    }

    function goodDoggosOnly() {
        let doggos = document.querySelectorAll('span')
        for (let i = 0; i < 10; i++) {
            if (doggos[i].className !== 'good-dog') {
                doggos[i].remove()
            }
        }
        dogFilterBTN.innerText = 'Filter good dogs: ON'
        dogFilterBTN.dataset.id = 'ON'
    }

    function filterOff() {
        dogBar.innerHTML = ''
        callTheDogsIn()
        dogFilterBTN.innerText = 'Filter good dogs: OFF'
        dogFilterBTN.dataset.id = 'OFF'
    }

    function pullDogInfo(dogID) {
        fetch(`${DOGGY_URL}/${dogID}`)
            .then(resp => resp.json())
            .then(json => {
                if (json["isGoodDog"] === true){
                    dogPane.innerHTML = `
                        <img src="${json["image"]}" alt="A photo of ${json["name"]}">
                        <h2>${json["name"]}</h2>
                        <button data-id="${json["id"]}">Good Dog!</button>
                    `
                } else {
                    dogPane.innerHTML = `
                        <img src="${json["image"]}" alt="A photo of ${json["name"]}">
                        <h2>${json["name"]}</h2>
                        <button data-id="${json["id"]}">Bad Dog!</button>
                    `
                }
            })
    }

    function updateDog(button) {
        let dogStatus = ''
        if (button.innerText.includes("Good")) {
            dogStatus = false
        } else {
            dogStatus = true
        }
        let formData = {
            isGoodDog: dogStatus
        }
        let configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }, 
            body: JSON.stringify(formData)
        }
        fetch(`${DOGGY_URL}/${button.dataset.id}`, configObj)
            .then(resp => resp.json())
            .then(json => {
                dogPane.innerHTML = ''
                pullDogInfo(button.dataset.id)
            })
    }

    callTheDogsIn()

    dogFilterBTN.addEventListener('click', function() {
        if (dogFilterBTN.dataset.id === 'ON') {
            filterOff()
        } else {
            goodDoggosOnly()
        }
    })

    dogBar.addEventListener('click', function(e) {
        if (e.target.tagName === 'SPAN') {
            pullDogInfo(e.target.dataset.id)
        }
    })

    dogPane.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') {
            updateDog(e.target)
        }
    })
})