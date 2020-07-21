document.addEventListener("DOMContentLoaded", function() {

    /*
        1. Add pups to the dog bar
            - √ url const
            - √ target "dog-bar" div
            - √ fetch pup objects
            - √ add span with the pup's name to the dog bar ex <span>Mr. Bonkers</span>
        2. Show info about each pup
            -  √ target "dog-info" div
            - img tag with pup image url
            - h2 with pup's name
        2a. Button
    */
    
    
    const pupsUrl = 'http://localhost:3000/pups'
    const dogBar = document.getElementById("dog-bar")
    
    
    
    function fetchPups() {
        fetch(pupsUrl)
            .then(res => res.json())
            .then(results => {
                results.forEach(pup => renderPup(pup))
            })
    }

    function renderPup(pup){
        const pupSpan = document.createElement('span')
        pupSpan.innerText = pup.name
        pupSpan.dataset.id = pup.id
        dogBar.append(pupSpan)
    }

    const clickHandler = () => {
        document.addEventListener("click", function(e) {
            if (e.target.matches('span')){
                fetch(pupsUrl + `/${e.target.dataset.id}`)
                .then(res => res.json())
                .then(results => showInfo(results))
            } else if (e.target.matches('button')){
                let goodDogStatus = null
                if (e.target.innerText === "Bad Dog!"){
                    e.target.innerText = "Good Dog!"
                    goodDogStatus = true
                } else if (e.target.innerText === "Good Dog!"){
                    e.target.innerText = "Bad Dog!"
                    goodDogStatus = false
                }
                toggleGoodDogStatus(e.target.dataset.id, goodDogStatus) 
            }
        })
    }
    function showInfo(pup) {
        const dogInfo =  document.getElementById('dog-info')
        dogInfo.innerHTML = ""
        const img = document.createElement('img')
        const h2 = document.createElement('h2')
        const button = document.createElement('button')
        img.src = pup.image
        h2.innerText = pup.name
        button.innerText = pup.isGoodDog ? "Good Dog!" : "Bad Dog!"
        button.dataset.id = pup.id
        dogInfo.append(img, h2, button)
    }

    function toggleGoodDogStatus(id, goodDogStatus){
        fetch(pupsUrl + `/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify( {
                isGoodDog: goodDogStatus
            })
        })
        .then(res => res.json())
        .then (results => console.log(results))
    }

    


    clickHandler()
    fetchPups()
})


