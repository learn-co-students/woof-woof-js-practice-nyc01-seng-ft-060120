document.addEventListener("DOMContentLoaded", () => {

    const url = "http://localhost:3000/pups"
    const dogBar = document.getElementById('dog-bar')
    const dogInfo = document.getElementById('dog-info')

    function fetchDogs() {
        fetch(url)
        .then(resp => resp.json())
        .then(dogs => dogs.forEach(dog => renderDog(dog)))
    }

    function renderDog(dog) {
        const span = document.createElement("span")
        span.className = 'span'
        span.dataset.id = dog.id
        span.innerText = dog.name
        dogBar.append(span);
    }

    function fetchDog(id){
        return fetch(url + `/${id}`)
          .then(resp => resp.json())
          .then(pup => renderOneDog(pup))
      }

    function renderOneDog(pup) {
        const info = document.createElement("class")
        info.className = 'info'
        info.dataset.id = pup.id
        info.innerHTML = `
        <img src=${pup.image}>
        <h1>${pup.name}</h1>
        <h3>Good Dog?: ${pup.isGoodDog}</h3>
        `
        dogInfo.append(info)
    }

    //listners
    document.addEventListener("click", function(e){
        fetchDog(e.target.dataset.id)
            .then(renderOneDog)

    })

    fetchDogs()
})