'use strict';

const searchInputBox = document.getElementById("searchInput");
const search = (input, button) => {

    const searchInput = document.getElementById(input);
    const searchBtn = document.getElementById(button);

    searchBtn.addEventListener("click", () => {
        document.title = searchInput.value;
        fetchImage();
        fetchImageSearch();
    });
    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            document.title = searchInput.value;
            fetchImage();
            fetchImageSearch()
        }
    });
}
search('searchInput', 'submit');

let counter = 0;

const fetchImage = () => {
    const load_box = document.querySelector(".load-box");
    load_box.classList.add("active");

    const image_box = document.getElementById("image-box");
    image_box.classList.remove("active");

    
  const showLoading =  setInterval( () => {
        counter++
        console.log(counter);
        if(counter === 60) {
            load_box.classList.remove("active");
            image_box.classList.add("active");
        }

        if (counter >= 70) {
            clearInterval(showLoading)
            counter = 0;
        }
    }, 60)
}

const fetchImageSearch = () => {
    const API = "avAPx37qSs0d9M5xuJJYkqH0tCypNOCw6LYEKxzNNgVKnfXVoOY4sSxm ";
    const searchQuery = searchInputBox.value.trim();
    const url = `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=1&page=1`;


    fetch(url, {
        method: "Get",
        headers: new Headers({
            'Authorization': API
        })
    }).then((rspd) => {
        return rspd.json()
    }).then(data => {
        console.log(data);

        const image_box = document.getElementById("image-box");
        image_box.innerHTML = `<img src="${data.photos[0].src.original}" id="image">`;
    }).catch(err => {
        const imageroor = document.getElementById("image")
        imageroor.src = "src/asset/img/error.png";
    })
}





