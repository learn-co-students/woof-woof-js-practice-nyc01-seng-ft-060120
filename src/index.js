const URL = "http://localhost:3000/pups"
const dogBar = document.querySelector('#dog-bar')
const display = document.querySelector('#dog-info')
const filterBttn = document.querySelector('#good-dog-filter')

let fetchPups = () => {
    return fetch(`${URL}`)
    .then(response => response.json())
    .then(pups => renderDogBar(pups))
}

let fetchPupsFiltered = () => {
    return fetch(`${URL}`)
    .then(response => response.json())
    .then(pups => renderDogBar(filterPups(pups)) )
}

let filterPups = (pups) => {
    return (pups.filter(pup => pup.isGoodDog === true))
}

let renderDogBar = (pups) => {
    dogBar.innerHTML = ''
    pups.forEach(pup => {
        renderPup(pup)
    })
}

let renderPup = (pup) => {
    const span = document.createElement('span')
    span.dataset.name = pup.name
    span.textContent = `${pup.name}`
    dogBar.appendChild(span)
    span.addEventListener('click', (e) => {
        display.innerHTML = `
        <img src=${pup.image}>
        <h2>${pup.name}</h2>
        <button id="toggle">${pup.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
        `
        let button = display.querySelector('button')
        button.addEventListener('click', (e) => {
            startTogglePup(pup.id)
        })
    })
}

let startTogglePup = (id) => {
    fetch(`${URL}/${id}`)
    .then(response => response.json())
    .then(pup => patchPup(id, pup.isGoodDog))
}

let patchPup = (id, goodBool) => {
    goodBool = !goodBool
    return fetch(`${URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({isGoodDog: goodBool}),
    }).then(response => response.json())
    .then(pup => swapButton(pup))
}

let swapButton = (pup) => {
    let filterBool = !(filterBttn.innerHTML.split('Filter good dogs: ')[1] === 'OFF')
    let bttn = document.querySelector('#toggle')
    bttn.innerHTML = `${pup.isGoodDog ? "Good Dog!" : "Bad Dog!"}`
    if (filterBool) {
        fetchPupsFiltered()
    } else {
        fetchPups()
    }
}

filterBttn.addEventListener('click', (e) => {
    let filterBool = !(filterBttn.innerHTML.split('Filter good dogs: ')[1] === 'OFF')
    if (filterBool){
        e.target.innerHTML = 'Filter good dogs: OFF'
        fetchPups()
    } else {
        e.target.innerHTML = 'Filter good dogs: ON'
        fetchPupsFiltered()
    }
})

document.addEventListener("DOMContentLoaded", () => {
    fetchPups()
})