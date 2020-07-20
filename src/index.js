document.addEventListener("DOMContentLoaded", function (e) {
    const dogBar = document.querySelector("#dog-bar");
    const dogInfo = document.querySelector("#dog-info");
    const baseUrl = "http://localhost:3000/pups";
    const button = document.createElement("button");

    const fetchData = () => {
        fetch(baseUrl)
        .then(response => response.json())
        .then(pupsCollections => {
            getData(pupsCollections),
            clickHandler(pupsCollections)
        });
    };
    const getData = (dataArray) => {
        dataArray.forEach(pupObj => {
            setPup(pupObj)
        });
    };

    const setPup = (pup) => {
        const pupSpan = document.createElement("span");
        pupSpan.dataset.id = pup.id;
        pupSpan.innerHTML = `
            ${pup.name}
        `
        dogBar.append(pupSpan);
    }

    const clickHandler = (pupObj) => {
        document.addEventListener("click", (e) => {
            if (e.target.nodeName === "SPAN") {
                const currentPup = e.target.dataset.id;
                const foundPup = pupObj.find(pup => pup.id == currentPup);
                pupInfo(foundPup);
            }
        });
    };

    const pupInfo = (foundPup) => {
        dogInfo.innerHTML = ``
        const pupDiv = document.createElement("div");
        button.textContent = "Good Pup";
        button.id = "good-pup"
        pupDiv.innerHTML = `
            <img src="${foundPup.image}">
            <h3>${foundPup.name}</h3>
        `
        dogInfo.append(pupDiv, button);
        
        dogInfo.addEventListener("click", (e) => {
            if (e.target.matches("#good-pup")){
                const button = e.target;
                button.textContent = "Bad Pup";
                const pupId = foundPup.id;
                console.log(pupId)
                const newStatus = true;
                console.log(newStatus)

                fetch(`${baseUrl}/${pupId}`,{
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({isGoodDog: newStatus})
                });
                button.id = "bad-pup";
            }else if (e.target.matches(("#bad-pup"))) {
                const button = e.target;
                button.textContent = "Good Pup";
                const pupId = foundPup.id;
                const newStatus = false;
                console.log(newStatus)
                fetch(`${baseUrl}/${pupId}`, {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({ isGoodDog: newStatus })
                });
                button.id = "good-pup";
            }
        });
    };

   

    
    fetchData();
  });