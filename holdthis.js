document.addEventListener('DOMContentLoaded', function(){

    //On the page, there is a div with the id of "dog-bar". 
    const dogBarDiv = document.querySelector("#dog-bar")

    //On page load, make a fetch to get all of the pup objects. 
    getAllPups()

    function getAllPups(){
        fetch('http://localhost:3000/pups')
        .then(r => r.json())
        .then(pups => renderPups(pups))
    }
    
    //When you have this information, you'll need to 
    //add a span with the pup's name to the dog bar 
    //(ex: <span>Mr. Bonkers</span>).
    
    function renderPups(pups){
        pups.forEach(pup =>{
            const pupSpan = document.createElement('span')
            pupSpan.id = `${pup.id}`
            pupSpan.textContent = `${pup.name}`
            dogBarDiv.append(pupSpan)
        })
    }

    // When a user clicks on a pup's span in the dog bar, 
    // that pup's info (image, name, and isGoodDog status) 
    // should show up in the div with the id of "dog-info". 
    // When you have the pup's information, the dog info div 
    // should have the following children:
    //
    // an img tag with the pup's image url
    // an h2 with the pup's name
    // a button that says "Good Dog!" or "Bad Dog!" 
    //based on whether isGoodDog is true or false. Ex:
    //
    //  <img src=dog_image_url>
    //  <h2>Mr. Bonkers</h2>
    //  <button>Good Dog!</button>

    const dogInfoDiv = document.querySelector("#dog-info")
    const pupSpan = document.getElementsByClassName('span')
    document.addEventListener('click', function(e){
            // document.addEventListener('click', function(e){
    //             // we need the id
    //             //fetch pups/id
    //             //render pupobject infor in the div
    // });
        if (e.target.id === pupSpan.id)

        dogInfoDiv.innerHTML = `
        <img src=${pup.image} >
        <h2>${pup.name}</h2>
        <button>${pup.isGoodDog}</button>`
        
    })





    // When a user clicks the Good Dog/Bad Dog button, 
    // two things should happen:
    //
    // The button's text should change from Good to Bad or Bad to Good
    // The corresponding pup object in the database should be updated 
    // to reflect the new isGoodDog value
    //
    // *Please note*, you can update a dog by making a PATCH request to /pups/:id

})








// BONUS
// When a user clicks on the Filter Good Dogs button, 
// two things should happen:
//
// The button's text should change from "Filter good dogs: OFF" 
// to "Filter good dogs: ON", or vice versa.
// If the button now says "ON" (meaning the filter is on), 
// then the Dog Bar should only show pups 
// whose isGoodDog attribute is true. 
// If the filter is off, the Dog Bar should show all pups
//  (like normal).