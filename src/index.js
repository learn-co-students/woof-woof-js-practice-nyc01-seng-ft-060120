document.addEventListener('DOMContentLoaded', (event) => {
   
    const url = "http://localhost:3000/pups"
    const dogBar = document.querySelector("#dog-bar")
    const dogInfo = document.querySelector("#dog-info")
		var button = document.createElement("button")
		var goodDogFilter = document.querySelector("#good-dog-filter")
		console.dir(goodDogFilter)
		const formContainer = document.querySelector(".container")
		const dogNameCard = document.createElement('div')    
		let goodDog = false 
		const submitButton = document.querySelector('#submit')
		console.log(submitButton)

		goodDogFilter.addEventListener("click", (e) => {
			if(e.target.innerText.includes("OFF")){
			goodDogFilter.textContent = "Filter good dogs: ON"
			fetchDogs(goodDogFilter.textContent)
			}else{
			 goodDogFilter.textContent = "Filter good dogs: OFF"
				fetchDogs(goodDogFilter.textContent)
			}

		}) 	

    const fetchDogs = (a) => {

	    if(goodDogFilter.textContent.includes("ON")){
	    	fetch(url)
	    	.then(resp => resp.json())  
	    	.then(dogs => dogs.filter(dog => dog.isGoodDog == true))
	    	.then(dogs => dogs.forEach(dog=> renderDogs(dog)))
	   	}else{
	    	fetch(url)	   		
	   		.then(resp => resp.json())  
	    	.then(dogs => dogs.forEach(dog=> renderDogs(dog)))
	   	}
		}

		document.addEventListener('submit', (e) => {
			e.preventDefault()
			const formName = e.target[0].value
			const formImage = e.target[1].value
			postDog(formName, formImage)
		})

		const postDog = (name, img) => {
			fetch(url, {
				method: 'POST',
				headers: {
				'Content-type': 'application/json',
				'Accept': 'application/json'
				},
				body: JSON.stringify({
					name: name,
					image: img
				})
			})
			.then(resp => resp.json())
			.then(resp => console.log(resp))
		}


		const renderDogs = (dog) => {
			nameCard = document.createElement('div')
			nameCard.innerHTML = `<span> ${dog.name} </span>`
			dogBar.append(nameCard)


			//listening on click
			nameCard.addEventListener('click', (e) => {
				dogNameCard.innerHTML = `
				<img src=${dog.image}>
 				<h2>${dog.name}</h2>
				`
				dogNameCard.dataset.id = `${dog.id}`
				button.innerHTML = "Good Dog"
				button.className = "dog-button"
				dogNameCard.append(button)
				dogInfo.append(dogNameCard)

				button.addEventListener('click', (e) => {
					let newValue;
					if(e.target.innerText.includes("Good")){
						e.target.innerText = "Bad Dog"
						newValue = false
					}
					else{
						e.target.innerText = "Good Dog"
						newValue = true;
					}
					
					const id = dogNameCard.dataset.id
					console.log(id) 
					

					fetch(`${url}/${id}`, {
						method: "PATCH",
						headers: {
							"content-type": "application/json",
							"accept": "application/json"
						},
						body: JSON.stringify({ isGoodDog: newValue })
					})
					.then(resp => resp.json(resp))
					.then(resp => isGoodDog(resp))
				})		
			})

			const isGoodDog = (resp) => {
					if (resp.isGoodDog == true){
						console.log("good")
					}else{
						console.log("bad")
					}
				}
		}


});

